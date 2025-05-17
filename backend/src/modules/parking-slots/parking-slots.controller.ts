import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  BadRequestException,
  Get,
  UseGuards,
  Query,
  Param,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ParkingSlotsService } from './parking-slots.service';
import { BulkCreateParkingSlotDto } from './dtos/builk-create-slots.dto';
import { CreateParkingSlotDto } from './dtos/create-parking-slot.dto';
import ServerResponse from 'src/utils/ServerResponse';
import { AdminGuard } from 'src/guards/admin.guard';

@ApiTags('Parking Slots')
@Controller('parking-slots')
@ApiBearerAuth()
export class ParkingSlotsController {
  constructor(private readonly parkingSlotsService: ParkingSlotsService) {}

  @Post('bulk')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Bulk create parking slots' })
  @ApiBody({
    description:
      'Bulk create parking slots - either provide exact slots or a count to generate',
    examples: {
      exactSlots: {
        summary: 'Create specific slots',
        value: {
          slots: [
            {
              slotNumber: 'A-101',
              size: 'MEDIUM',
              vehicleType: 'CAR',
              location: 'NORTH',
            },
          ],
          count: 0,
        },
      },
      generateSlots: {
        summary: 'Generate slots by count',
        value: {
          slots: [],
          count: 100,
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Parking slots created successfully',
    type: [CreateParkingSlotDto],
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input data',
  })
  async bulkCreate(
    @Body() bulkCreateDto: BulkCreateParkingSlotDto,
  ): Promise<CreateParkingSlotDto[]> {
    console.log(bulkCreateDto);
    // Validate that either slots or count is provided
    if (
      (!bulkCreateDto.slots || bulkCreateDto.slots.length === 0) &&
      (!bulkCreateDto.count || bulkCreateDto.count <= 0)
    ) {
      throw new BadRequestException(
        'Either provide slots array or a positive count value',
      );
    }

    // If count is provided but no slots, generate slots
    if (
      bulkCreateDto.count > 0 &&
      (!bulkCreateDto.slots || bulkCreateDto.slots.length === 0)
    ) {
      return this.parkingSlotsService.generateSlots(bulkCreateDto.count);
    }

    // If specific slots are provided, create them
    if (bulkCreateDto.slots && bulkCreateDto.slots.length > 0) {
      return this.parkingSlotsService.createMany(bulkCreateDto.slots);
    }

    throw new BadRequestException('Invalid input combination');
  }
  // get slots with pagination   @Get('all')
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  @UseGuards(AdminGuard)
  @Get()
  async findAll(
    @Query('page') page: number = 0,
    @Query('limit') limit: number = 10,
    @Query("searchKey") searchKey:string,
  ) {
    const users = await this.parkingSlotsService.findAll(page, limit,searchKey);
    return ServerResponse.success('parking slots  fetched successfully', { ...users });
  }
}
