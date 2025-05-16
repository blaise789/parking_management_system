    // src/vehicles/dto/create-vehicle.dto.ts
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateVehicleDto {
  @ApiProperty({
    description: 'Vehicle license plate number',
    example: 'ABC1234',
  })
  @IsString()
  @IsNotEmpty()
  licensePlate: string;

  @ApiProperty({
    description: 'Vehicle make (manufacturer)',
    example: 'Toyota',
    required: false,
  })
  @IsString()
  @IsOptional()
  make?: string;

  @ApiProperty({
    description: 'Vehicle model',
    example: 'Corolla',
    required: false,
  })
  @IsString()
  @IsOptional()
  model?: string;

  
}