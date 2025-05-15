// parking-lots/dto/create-parking-lot.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { 
  IsArray, 
  IsBoolean, 
  IsNotEmpty, 
  IsNumber, 
  IsObject, 
  IsOptional, 
  IsString, 
  ValidateNested 
} from 'class-validator';
import { Type } from 'class-transformer';

export class OperatingHoursDto {
  @ApiProperty({ example: '08:00', description: 'Opening time in HH:mm format' })
  @IsString()
  @IsNotEmpty()
  open: string;

  @ApiProperty({ example: '20:00', description: 'Closing time in HH:mm format' })
  @IsString()
  @IsNotEmpty()
  close: string;
}

export class CreateParkingLotDto {
  @ApiProperty({ example: 'Downtown Parking', description: 'Name of the parking lot' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 100, description: 'Total capacity of the parking lot' })
  @IsNumber()
  @IsNotEmpty()
  capacity: number;

  @ApiProperty({
    example: { open: '08:00', close: '20:00' },
    description: 'Operating hours object',
    type: OperatingHoursDto
  })
  @IsObject()
  @ValidateNested()
  @Type(() => OperatingHoursDto)
  operatingHours: OperatingHoursDto;

  @ApiProperty({ 
    example: true, 
    description: 'Whether the parking lot is active',
    required: false 
  })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @ApiProperty({
    example: ['A1', 'A2', 'B1'],
    description: 'Array of slot numbers to create',
    required: false,
    type: [String]
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  slotNumbers?: string[];

  @ApiProperty({
    example: ['STANDARD', 'COMPACT', 'HANDICAPPED'],
    description: 'Array of slot types corresponding to slotNumbers',
    required: false,
    type: [String]
  })
  @IsArray()
  @IsOptional()
  slotTypes?: [];
}