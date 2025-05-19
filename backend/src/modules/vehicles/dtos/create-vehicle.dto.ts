// src/vehicles/dto/create-vehicle.dto.ts
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  ValidateNested,
  IsObject,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { VehicleType, VehicleSize } from '@prisma/client';
import { VehicleAttributes } from 'src/types';
import { Type } from 'class-transformer';

// src/vehicles/dto/create-vehicle.dto.ts
export class CreateVehicleDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  plateNumber: string;

  @ApiProperty({ enum: VehicleType })
  @IsEnum(VehicleType)
  vehicleType: VehicleType;

  @ApiProperty({ enum: VehicleSize })
  @IsEnum(VehicleSize)
  size: VehicleSize;

  @ApiPropertyOptional({ type: Object })
  @IsOptional()
  @IsObject()
  attributes?: {
    brand?: string;
    model?: string;
    color?: string;
    year?: number;
  };
}
