import { Injectable, ConflictException, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateParkingLotDto } from "./dtos/create-parking-lot.dto" ;
import { UpdateParkingLotDto } from './dtos/update-parking-lot.dto';
import { SlotType } from '@prisma/client';

@Injectable()
export class ParkingLotsService {
 
  constructor(private readonly prisma: PrismaService) {}
async   checkAvailability(id: number) {
    const availableSlots= await this.prisma.parkingSlot.count({
      where:{
        lotId:id
      }
    })
    if (availableSlots<=0){
     return  "plot is full"
    }
    return true
   
  }

  /**
   * Create a new parking lot with optional slots
   */
  async create(createParkingLotDto: CreateParkingLotDto) {
    const { name, capacity, operatingHours, isActive = true, slotNumbers = [], slotTypes = [] } = createParkingLotDto;

    // Check for existing parking lot with same name
    await this.validateParkingLotName(name);

    // Validate slots configuration
    this.validateSlotConfiguration(slotNumbers, slotTypes);

    return this.prisma.parkingLot.create({
      data: {
        name,
        capacity,
        openingTime: operatingHours.open,
        closingTime: operatingHours.close,
        isActive,
       // Ensure facilityId is provided
        slots: {
          createMany: {
            data: this.generateSlotData(slotNumbers, slotTypes),
          },
        },
      },
      include: {
        slots: true,
      },
    });
  }

  /**
   * Get all parking lots
   */
  async findAll() {
    return this.prisma.parkingLot.findMany({
      include: {
        slots: true,
        _count: {
          select: {
            reservations: true,
          },
        },
      },
      orderBy: {
        name: 'asc',
      },
    });
  }

  /**
   * Get a specific parking lot by ID
   */
  async findOne(id: number) {
    const parkingLot = await this.prisma.parkingLot.findUnique({
      where: { id },
      include: {
        slots: true,
        clerks: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });

    if (!parkingLot) {
      throw new NotFoundException(`Parking lot with ID ${id} not found`);
    }

    return parkingLot;
  }

  /**
   * Update a parking lot
   */
  async update(id: number, updateParkingLotDto: UpdateParkingLotDto) {
    const { name, ...updateData } = updateParkingLotDto;

    if (name) {
      await this.validateParkingLotName(name, id);
    }

    return this.prisma.parkingLot.update({
      where: { id },
      data: updateData,
    });
  }

  /**
   * Delete a parking lot
   */
  async remove(id: number) {
    try {
      return await this.prisma.parkingLot.delete({
        where: { id },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Parking lot with ID ${id} not found`);
      }
      throw error;
    }
  }

  /**
   * Assign a clerk to a parking lot
   */
  async assignClerk(lotId: number, clerkId: string) {
    // Verify both parking lot and user exist
    await this.findOne(lotId);
    await this.validateUserExistsAndIsClerk(clerkId);

    return this.prisma.parkingLot.update({
      where: { id: lotId },
      data: {
        clerks: {
          connect: { id: clerkId },
        },
      },
      include: {
        clerks: true,
      },
    });
  }
  async updateCapacity(id: number, capacity: number) {
    return this.prisma.parkingLot.update({
      where: { id },
      data: { capacity }
    });
  }

  /**
   * Remove a clerk from a parking lot
   */
  async removeClerk(lotId: number, clerkId: string) {
    return this.prisma.parkingLot.update({
      where: { id: lotId },
      data: {
        clerks: {
          disconnect: { id: clerkId },
        },
      },
    });
  }

  // Helper Methods

  private async validateParkingLotName(name: string, excludeId?: number) {
    const existingLot = await this.prisma.parkingLot.findFirst({
      where: {
        name,
        ...(excludeId && { id: { not: excludeId } }),
      },
    });

    if (existingLot) {
      throw new ConflictException('Parking lot with this name already exists');
    }
  }

  private validateSlotConfiguration(slotNumbers: string[], slotTypes: SlotType[]) {
    if (slotNumbers.length !== slotTypes.length) {
      throw new ConflictException('slotNumbers and slotTypes must have the same length');
    }

    const duplicateSlots = slotNumbers.filter((num, index) => slotNumbers.indexOf(num) !== index);
    if (duplicateSlots.length > 0) {
      throw new ConflictException(`Duplicate slot numbers found: ${duplicateSlots.join(', ')}`);
    }
  }

  private generateSlotData(slotNumbers: string[], slotTypes: SlotType[]) {
    return slotNumbers.map((slotNumber, index) => ({
      slotNumber,
      type: slotTypes[index] || 'STANDARD',
    }));
  }

  private async validateUserExistsAndIsClerk(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    if (user.role !== 'CLERK') {
      throw new ConflictException(`User with ID ${userId} is not a clerk`);
    }
  }
}