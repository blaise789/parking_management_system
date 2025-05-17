  import {
    Controller,
    Post,
    Body,
    BadRequestException,
    Get,
    Query,
    UseGuards,
    Delete,
    Param,
    Put,
  } from '@nestjs/common';
  import {
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiBody,
    ApiQuery,
    ApiParam,
    ApiBearerAuth,
  } from '@nestjs/swagger';
  import { ParkingSlotsService } from './parking-slots.service';
  import { CreateParkingSlotDto } from './dtos/create-parking-slot.dto';
  import { BulkCreateParkingSlotDto } from './dtos/builk-create-slots.dto';
  import { UpdateParkingSlotDto } from './dtos/update-parking-lot.dto';
  import { AdminGuard } from 'src/guards/admin.guard';
  import  ServerResponse from 'src/utils/ServerResponse'

  @ApiTags('Parking Slots')
  @ApiBearerAuth()
  @Controller('parking-slots')
  export class ParkingSlotsController {
    constructor(private readonly parkingSlotsService: ParkingSlotsService) {}

    @ApiOperation({ summary: 'Bulk create parking slots' })
    @ApiResponse({
      status: 201,
      description: 'Parking slots created successfully',
    })
    @ApiResponse({ status: 400, description: 'Invalid input' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 403, description: 'Forbidden' })
    @ApiResponse({ status: 500, description: 'Internal server error' })
    @ApiBody({ type: BulkCreateParkingSlotDto })
    @UseGuards(AdminGuard)
    @Post('bulk-create')
    async bulkCreate(@Body() bulkCreateDto: BulkCreateParkingSlotDto) {
      if (
        (!bulkCreateDto.slots || bulkCreateDto.slots.length === 0) &&
        (!bulkCreateDto.count || bulkCreateDto.count <= 0)
      ) {
        throw new BadRequestException(
          'Either provide slots array or a positive count value',
        );
      }

      if (
        bulkCreateDto.count > 0 &&
        (!bulkCreateDto.slots || bulkCreateDto.slots.length === 0)
      ) {
        return this.parkingSlotsService.generateSlots(bulkCreateDto.count);
      }

      if (bulkCreateDto.slots && bulkCreateDto.slots.length > 0) {
        return this.parkingSlotsService.createMany(bulkCreateDto.slots);
      }

      throw new BadRequestException('Invalid input combination');
    }

    @ApiOperation({ summary: 'Get all parking slots with pagination' })
    @ApiQuery({ name: 'page', required: false, example: 1 })
    @ApiQuery({ name: 'limit', required: false, example: 10 })
    @ApiQuery({ name: 'searchKey', required: false })
    @ApiResponse({
      status: 200,
      description: 'Parking slots fetched successfully',
    })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 403, description: 'Forbidden' })
    @ApiResponse({ status: 500, description: 'Internal server error' })
    @UseGuards(AdminGuard)
    @Get()
    async findAll(
      @Query('page') page: number = 0,
      @Query('limit') limit: number = 10,
      @Query('searchKey') searchKey: string,
    ) {
      const users = await this.parkingSlotsService.findAll(page, limit, searchKey);
      return ServerResponse.success('Parking slots fetched successfully', {
        ...users,
      });
    }

    @ApiOperation({ summary: 'Create a new parking slot' })
    @ApiResponse({
      status: 201,
      description: 'Parking slot created successfully',
    })
    @ApiResponse({ status: 400, description: 'Invalid input' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 403, description: 'Forbidden' })
    @ApiResponse({ status: 500, description: 'Internal server error' })
    @ApiBody({ type: CreateParkingSlotDto })
    @UseGuards(AdminGuard)
    @Post("/create")
    async createSlot(@Body() dto: CreateParkingSlotDto) {
      const slot = await this.parkingSlotsService.createParkingSlot(dto);
      return ServerResponse.success('Parking slot created successfully', slot);
    }

    @ApiOperation({ summary: 'Delete a parking slot' })
    @ApiParam({ name: 'id', description: 'Parking slot ID' })
    @ApiResponse({
      status: 200,
      description: 'Parking slot deleted successfully',
    })
    @ApiResponse({ status: 404, description: 'Parking slot not found' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 403, description: 'Forbidden' })
    @ApiResponse({ status: 500, description: 'Internal server error' })
    @UseGuards(AdminGuard)
    @Delete(':id')
    async deleteSlot(@Param('id') id: string) {
      await this.parkingSlotsService.deleteSlot(id);
      return ServerResponse.success('Parking slot deleted successfully');
    }

    @ApiOperation({ summary: 'Update a parking slot' })
    @ApiParam({ name: 'id', description: 'Parking slot ID' })
    @ApiResponse({
      status: 200,
      description: 'Parking slot updated successfully',
    })
    @ApiResponse({ status: 404, description: 'Parking slot not found' })
    @ApiResponse({ status: 400, description: 'Invalid input' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 403, description: 'Forbidden' })
    @ApiResponse({ status: 500, description: 'Internal server error' })
    @ApiBody({ type: UpdateParkingSlotDto })
    @UseGuards(AdminGuard)
    @Put('/update/:id')
    async updateSlot(
      @Param('id') id: string,
      @Body() updateDto: UpdateParkingSlotDto,
    ) {
      const slot = await this.parkingSlotsService.updateSlot(id, updateDto);
      return ServerResponse.success('Parking slot updated successfully', slot);
    }
  }