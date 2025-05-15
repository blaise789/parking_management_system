import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ParkingLotsService } from './parking-lots.service';
import { CreateParkingLotDto } from './dtos/create-parking-lot.dto';
import { UpdateParkingLotDto } from './dtos/update-parking-lot.dto';
import {
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
  ApiTags
} from '@nestjs/swagger';

@ApiTags('Parking Lots')
@Controller('parking-lots')
export class ParkingLotsController {
  constructor(private readonly parkingLotService: ParkingLotsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new parking lot with optional slots' })
  @ApiResponse({ 
    status: 201, 
    description: 'Parking lot created successfully with slots' 
  })
  @ApiResponse({ 
    status: 409, 
    description: 'Parking lot name already exists or invalid slot configuration' 
  })
  @ApiBody({ type: CreateParkingLotDto })
  create(@Body() createParkingLotDto: CreateParkingLotDto) {
    return this.parkingLotService.create(createParkingLotDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all parking lots with their slots' })
  @ApiResponse({ 
    status: 200, 
    description: 'List of all parking lots retrieved successfully' 
  })
  findAll() {
    return this.parkingLotService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific parking lot by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Parking lot ID' })
  @ApiResponse({ 
    status: 200, 
    description: 'Parking lot details retrieved successfully' 
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Parking lot not found' 
  })
  findOne(@Param('id') id: string) {
    return this.parkingLotService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update parking lot details' })
  @ApiParam({ name: 'id', type: Number, description: 'Parking lot ID' })
  @ApiResponse({ 
    status: 200, 
    description: 'Parking lot updated successfully' 
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Parking lot not found' 
  })
  @ApiResponse({ 
    status: 409, 
    description: 'Parking lot name already exists' 
  })
  @ApiBody({ type: UpdateParkingLotDto })
  update(@Param('id') id: string, @Body() updateParkingLotDto: UpdateParkingLotDto) {
    return this.parkingLotService.update(+id, updateParkingLotDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a parking lot' })
  @ApiParam({ name: 'id', type: Number, description: 'Parking lot ID' })
  @ApiResponse({ 
    status: 200, 
    description: 'Parking lot deleted successfully' 
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Parking lot not found' 
  })
  remove(@Param('id') id: string) {
    return this.parkingLotService.remove(+id);
  }

  @Patch(':id/assign-clerk/:clerkId')
  @ApiOperation({ summary: 'Assign a clerk to manage a parking lot' })
  @ApiParam({ name: 'id', type: Number, description: 'Parking lot ID' })
  @ApiParam({ name: 'clerkId', type: String, description: 'User ID of the clerk' })
  @ApiResponse({ 
    status: 200, 
    description: 'Clerk assigned successfully' 
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Parking lot or user not found' 
  })
  @ApiResponse({ 
    status: 409, 
    description: 'User is not a clerk' 
  })
  assignClerk(@Param('id') id: string, @Param('clerkId') clerkId: string) {
    return this.parkingLotService.assignClerk(+id, clerkId);
  }

  @Patch(':id/remove-clerk/:clerkId')
  @ApiOperation({ summary: 'Remove a clerk from managing a parking lot' })
  @ApiParam({ name: 'id', type: Number, description: 'Parking lot ID' })
  @ApiParam({ name: 'clerkId', type: String, description: 'User ID of the clerk' })
  @ApiResponse({ 
    status: 200, 
    description: 'Clerk removed successfully' 
  })
  removeClerk(@Param('id') id: string, @Param('clerkId') clerkId: string) {
    return this.parkingLotService.removeClerk(+id, clerkId);
  }

  @Patch(':id/capacity')
  @ApiOperation({ summary: 'Update parking lot capacity' })
  @ApiParam({ name: 'id', type: Number, description: 'Parking lot ID' })
  @ApiResponse({ 
    status: 200, 
    description: 'Capacity updated successfully' 
  })
  @ApiBody({
    description: 'New capacity value',
    schema: {
      type: 'object',
      properties: {
        capacity: { type: 'number', example: 150 }
      }
    }
  })
  updateCapacity(@Param('id') id: string, @Body() { capacity }: { capacity: number }) {
    return this.parkingLotService.updateCapacity(+id, capacity);
  }
}