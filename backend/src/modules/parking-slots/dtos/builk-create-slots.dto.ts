import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNumber, ValidateNested } from 'class-validator';
import { CreateParkingSlotDto } from './create-parking-slot.dto';

export class BulkCreateParkingSlotDto {
  @ApiProperty({
    description: 'Array of parking slots to create',
    type: [CreateParkingSlotDto],
    example: [
      {
        slotNumber: 'A-101',
        size: 'MEDIUM',
        vehicleType: 'CAR',
        location: 'NORTH'
      },
      {
        slotNumber: 'A-102',
        size: 'LARGE',
        vehicleType: 'TRUCK',
        location: 'SOUTH'
      }
    ],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateParkingSlotDto)
  slots: CreateParkingSlotDto[];

  @ApiProperty({
    description: 'Number of slots to create (for bulk generation)',
    example: 100,
    minimum: 1,
    maximum: 1000,
  })
  @IsNumber()
  count: number;
}