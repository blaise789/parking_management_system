// src/reservations/dto/create-reservation.dto.ts
import { IsDateString, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateReservationDto {
  @ApiProperty({ description: 'ID of the vehicle', example: 1 })
  @IsInt()
  vehicleId: number;

  @ApiProperty({ description: 'ID of the parking lot', example: 1 })
  @IsInt()
  lotId: number;

  @ApiProperty({ 
    description: 'Start time of reservation (ISO string)', 
    example: '2023-12-01T09:00:00Z' 
  })
  @IsDateString()
  startTime: string;

  @ApiProperty({ 
    description: 'End time of reservation (ISO string)', 
    example: '2023-12-01T17:00:00Z' 
  })
  @IsDateString()
  endTime: string;
}