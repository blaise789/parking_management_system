// parking-lots/dto/create-parking-lot.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { ParkingLocation, VehicleSize, VehicleType } from '@prisma/client';

export class CreateParkingSlotDto {
  @ApiProperty({
    description: 'Unique identifier for the parking slot',
    example: 'A-101',
    required: true,
  })
  slotNumber: string;

  @ApiProperty({
    description: 'Size category of the parking slot',
    enum: VehicleSize,
    example: VehicleSize.MEDIUM,
    required: true,
  })
  size: VehicleSize;

  @ApiProperty({
    description: 'Type of vehicle this slot accommodates',
    enum: VehicleType,
    example: VehicleType.CAR,
    required: true,
  })
  vehicleType: VehicleType;

  @ApiProperty({
    description: 'Physical location of the parking slot within the facility',
    enum: ParkingLocation,
    example: ParkingLocation.NORTH,
    required: true,
  })
  location: ParkingLocation;
}