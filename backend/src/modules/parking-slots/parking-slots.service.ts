import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateParkingSlotDto } from './dtos/create-parking-slot.dto';
import { ParkingLocation, VehicleSize, VehicleType } from '@prisma/client';

@Injectable()
export class ParkingSlotsService {
  constructor(private prisma: PrismaService) {}

  async createMany(slots: CreateParkingSlotDto[]): Promise<CreateParkingSlotDto[]> {
    try {
      const createdSlots = await this.prisma.parkingSlot.createMany({
        data: slots,
        skipDuplicates: true, // Skip if slotNumber already exists
      });
      
      // Return the created slots
      return this.prisma.parkingSlot.findMany({
        where: {
          slotNumber: {
            in: slots.map(slot => slot.slotNumber)
          }
        }
      });
    } catch (error) {
      throw new Error(`Failed to create parking slots: ${error.message}`);
    }
  }

  async generateSlots(count: number): Promise<CreateParkingSlotDto[]> {
    const generatedSlots: CreateParkingSlotDto[] = [];
    
    // Generate slot data
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