import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsObject, IsOptional, IsString } from 'class-validator';
import { OperatingHoursDto } from './create-parking-lot.dto';

export class UpdateParkingLotDto {
  @ApiProperty({ example: 'Updated Parking Name', required: false })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ example: 150, required: false })
  @IsNumber()
  @IsOptional()
  capacity?: number;

  @ApiProperty({ type: OperatingHoursDto, required: false })
  @IsObject()
  @IsOptional()
  operatingHours?: OperatingHoursDto;

  @ApiProperty({ example: false, required: false })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}