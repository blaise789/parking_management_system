import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { ReservationStatus } from '@prisma/client';
import { CreateReservationDto } from './dtos/create-reservation.dto';

@Injectable()
export class ReservationsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, createReservationDto: CreateReservationDto) {
    // check if vehicle exists
    const { vehicleId, slotId, startTime, endTime } = createReservationDto;
    

    const vehicle = await this.prisma.vehicle.findUnique({
      where: {
        id: vehicleId,
        userId,
        
      },
    });
    if (!vehicle)
      throw new ForbiddenException(
        'your are not allowed to register this vehicle ',
      );
   
    return this.prisma.reservation.create({
      data: {

        status: 'PENDING',
        user: {
          connect: {
            id: userId,
          },
        },
        vehicle: {
          connect: {
            id: vehicleId,
          },
        },
      },
    });
  }
  async findAvailableSlots(lotId: number, startDate: Date, endDate: Date) {
    console.log(lotId);
    return await this.prisma.parkingSlot.findMany({
      where: {
        
      },
    });
  }

  // async confirm(id: number) {
  //   return this.prisma.reservation.update({
  //     where: { id },
  //     data: { status: 'CONFIRMED' }
  //   });
  // }

  // async cancel(id: number) {
  //   return this.prisma.reservation.update({
  //     where: { id },
  //     data: { status: 'CANCELLED' }
  //   });
  // }
}
