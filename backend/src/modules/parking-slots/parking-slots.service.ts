import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateParkingSlotDto } from './dtos/create-parking-slot.dto';
import { ParkingLocation, Prisma, VehicleSize, VehicleType } from '@prisma/client';
import { paginator } from 'src/pagination/paginator';

@Injectable()
export class ParkingSlotsService {
  constructor(private prisma: PrismaService) {}

  async findAll(
    page: number,
    limit: number,
    searchKey?: string
  ) {
    // Convert searchKey to uppercase for enum comparison
    const searchUpper = searchKey?.toUpperCase();
    
    const whereCondition = searchKey ? {
      OR: [
        // String field search (case insensitive)
        { slotNumber: { contains: searchKey, mode: 'insensitive' } },
        
        // Enum field searches (exact match only)
        ...(Object.values(VehicleType).includes(searchUpper as VehicleType) 
          ? [{ vehicleType: { equals: searchUpper as VehicleType } }] 
          : []),
        ...(Object.values(VehicleSize).includes(searchUpper as VehicleSize) 
          ? [{ size: { equals: searchUpper as VehicleSize } }] 
          : []),
        ...(Object.values(ParkingLocation).includes(searchUpper as ParkingLocation) 
          ? [{ location: { equals: searchUpper as ParkingLocation } }] 
          : [])
      ]
    } as Prisma.ParkingSlotWhereInput : undefined;

    try {
      const [parkingSlots, total] = await this.prisma.$transaction([
        this.prisma.parkingSlot.findMany({
          where: whereCondition, // Apply the same condition here
          take: Number(limit),
          skip: (page - 1) * limit,
          orderBy: {
            createdAt: 'desc',
          },
        }),
        this.prisma.parkingSlot.count({
          where: whereCondition
        }),
      ]);

      return {
        parkingSlots,
        meta: paginator({
          page: Number(page),
          limit: Number(limit),
          total: Number(total),
        }),
      };
    } catch (error) {
      console.error('Database error:', error);
      throw new HttpException('Failed to fetch parking slots', 500);
    }
  }

  async createMany(slots: CreateParkingSlotDto[]): Promise<CreateParkingSlotDto[]> {
    try {
      const createdSlots = await this.prisma.parkingSlot.createMany({
        data: slots,
        skipDuplicates: true,
      });

      return this.prisma.parkingSlot.findMany({
        where: {
          slotNumber: {
            in: slots.map(slot => slot.slotNumber),
          },
        },
      });
    } catch (error) {
      console.error('Create error:', error);
      throw new HttpException(`Failed to create parking slots: ${error.message}`, 500);
    }
  }

  async generateSlots(count: number): Promise<CreateParkingSlotDto[]> {
    const generatedSlots: CreateParkingSlotDto[] = [];

    for (let i = 1; i <= count; i++) {
      generatedSlots.push({
        slotNumber: `GEN-${i.toString().padStart(4, '0')}`,
        size: this.getRandomEnumValue(VehicleSize),
        vehicleType: this.getRandomEnumValue(VehicleType),
        location: this.getRandomEnumValue(ParkingLocation),
      });
    }

    return this.createMany(generatedSlots);
  }

  private getRandomEnumValue<T>(enumObj: T): T[keyof T] {
    const enumValues = Object.values(enumObj);
    const randomIndex = Math.floor(Math.random() * enumValues.length);
    return enumValues[randomIndex] as T[keyof T];
  }
}