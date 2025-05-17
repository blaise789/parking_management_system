import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateParkingSlotDto } from './dtos/create-parking-slot.dto';
import {
  ParkingLocation,
  Prisma,
  SlotStatus,
  VehicleSize,
  VehicleType,
} from '@prisma/client';
import { paginator } from 'src/pagination/paginator';
import { UpdateParkingSlotDto } from './dtos/update-parking-lot.dto';

@Injectable()
export class ParkingSlotsService {
  constructor(private prisma: PrismaService) {}

  async findAll(page: number, limit: number, searchKey?: string) {
    // Convert searchKey to uppercase for enum comparison
    const searchUpper = searchKey?.toUpperCase();

    const whereCondition = searchKey
      ? ({
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
            ...(Object.values(ParkingLocation).includes(
              searchUpper as ParkingLocation,
            )
              ? [{ location: { equals: searchUpper as ParkingLocation } }]
              : []),
          ],
        } as Prisma.ParkingSlotWhereInput)
      : undefined;

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
          where: whereCondition,
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

  async createMany(
    slots: CreateParkingSlotDto[],
  ): Promise<CreateParkingSlotDto[]> {
    try {
      const createdSlots = await this.prisma.parkingSlot.createMany({
        data: slots,
        skipDuplicates: true,
      });

      return this.prisma.parkingSlot.findMany({
        where: {
          slotNumber: {
            in: slots.map((slot) => slot.slotNumber),
          },
        },
      });
    } catch (error) {
      console.error('Create error:', error);
      throw new HttpException(
        `Failed to create parking slots: ${error.message}`,
        500,
      );
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
        status:this.getRandomEnumValue(SlotStatus)
      });
    }

    return this.createMany(generatedSlots);
  }
// generating random slots
  private getRandomEnumValue<T>(enumObj: T): T[keyof T] {
    const enumValues = Object.values(enumObj);
    const randomIndex = Math.floor(Math.random() * enumValues.length);
    return enumValues[randomIndex] as T[keyof T];
  }
  // updating slots
  async updateSlot(id: string, updateDto: UpdateParkingSlotDto) {
    try {
      const existingSlot = await this.prisma.parkingSlot.findUnique({
        where: { id },
      });

      if (!existingSlot) {
        throw new HttpException('Parking slot not found', 404);
      }

      const updatedSlot = await this.prisma.parkingSlot.update({
        where: { id },
        data: updateDto,
      });

      return updatedSlot;
    } catch (error) {
      console.error('Update error:', error);
      throw new HttpException(
        `Failed to update parking slot: ${error.message}`,
        500,
      );
    }
  }

  // Implemented deleteSlot method
  async deleteSlot(id: string) {
    try {
      const existingSlot = await this.prisma.parkingSlot.findUnique({
        where: { id },
      });

      if (!existingSlot) {
        throw new HttpException('Parking slot not found', 404);
      }

      const deletedSlot = await this.prisma.parkingSlot.delete({
        where: { id },
      });

      return deletedSlot;
    } catch (error) {
      console.error('Delete error:', error);
      throw new HttpException(
        `Failed to delete parking slot: ${error.message}`,
        500,
      );
    }
  }

  // Implemented createParkingSlot method
  async createParkingSlot(dto: CreateParkingSlotDto) {
    try {
      console.log(dto)
      // Check if slot number already exists
      const existingSlot = await this.prisma.parkingSlot.findFirst({
        where: { slotNumber: dto.slotNumber },
      });

      if (existingSlot) {
        throw new HttpException('Slot number already exists', 400);
      }

      const createdSlot = await this.prisma.parkingSlot.create({
        data: dto,
      });

      return createdSlot;
    } catch (error) {
      console.error('Create error:', error);
      throw new HttpException(
        `Failed to create parking slot: ${error.message}`,
        500,
      );
    }
  }

  // Implemented findById method
  async findById(id: string) {
    try {
      const slot = await this.prisma.parkingSlot.findUnique({
        where: { id },
      });

      if (!slot) {
        throw new HttpException('Parking slot not found', 404);
      }

      return slot;
    } catch (error) {
      console.error('Find by ID error:', error);
      throw new HttpException(
        `Failed to find parking slot: ${error.message}`,
        500,
      );
    }
  }
}
