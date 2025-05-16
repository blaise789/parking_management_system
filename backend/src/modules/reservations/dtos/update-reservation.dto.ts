// src/reservations/dto/update-reservation-status.dto.ts
import { IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ReservationStatus } from '@prisma/client';

export class UpdateReservationStatusDto {
  @ApiProperty({
    enum: ReservationStatus,
    description: 'New status for the reservation'
  })
  @IsEnum(ReservationStatus)
  status: ReservationStatus;
}