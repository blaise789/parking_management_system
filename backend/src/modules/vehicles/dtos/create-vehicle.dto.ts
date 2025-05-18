// src/vehicles/dto/create-vehicle.dto.ts
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  ValidateNested,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { VehicleType, VehicleSize } from '@prisma/client';
import { VehicleAttributes } from 'src/types';
import { Type } from 'class-transformer';

export class CreateVehicleDto {
  @ApiProperty({
    description: 'Vehicle license plate number (must be unique)',
    example: 'ABC1234',
  })
  @IsString()
  @IsNotEmpty()
  plateNumber: string;

  @ApiProperty({
    description: 'Type of vehicle',
    enum: VehicleType,
    example: VehicleType.CAR,
  })
  @IsEnum(VehicleType)
  vehicleType: VehicleType;

  @ApiProperty({
    description: 'Size category of the vehicle',
    enum: VehicleSize,
    example: VehicleSize.MEDIUM,
  })
  @IsEnum(VehicleSize)
  size: VehicleSize;

  @IsOptional()
  @ValidateNested()
  @Type(() => Object)
  attributes?: VehicleAttributes;
}
