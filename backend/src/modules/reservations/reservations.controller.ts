// src/reservations/reservations.controller.ts
import {
    Body,
    Controller,
    Param,
    Patch,
    Post,
    ParseIntPipe,
    Req,
    UseGuards,
  } from '@nestjs/common';
  import { ReservationsService } from './reservations.service';
  import { CreateReservationDto } from './dtos/create-reservation.dto';
  import { UpdateReservationStatusDto } from './dtos/update-reservation.dto';
  import {
    ApiOperation,
    ApiResponse,
    ApiTags,
    ApiBody,
    ApiParam,
    ApiBearerAuth,
  } from '@nestjs/swagger';
import { AuthRequest } from 'src/types';
import { DriverGuard } from 'src/guards/driver.guard';
  
  @ApiTags('Reservations')
  @ApiBearerAuth()
  @Controller('reservations')
  export class ReservationsController {
    constructor(private readonly reservationsService: ReservationsService) {}
  
    @Post()
    @ApiOperation({ summary: 'Create a new reservation' })
    @ApiResponse({ 
      status: 201, 
      description: 'Reservation created successfully' 
    })
    @ApiBody({ type: CreateReservationDto })
    @UseGuards(DriverGuard)
    create(@Req() req:AuthRequest, @Body() createReservationDto: CreateReservationDto) {
      console.log(req.user.id)
      return this.reservationsService.create(req.user.id,createReservationDto);
    }
  
  //   @Patch(':id/confirm')
  //   @ApiOperation({ summary: 'Confirm a reservation' })
  //   @ApiParam({ name: 'id', description: 'Reservation ID', type: Number })
  //   @ApiResponse({ 
  //     status: 200, 
  //     description: 'Reservation confirmed successfully' 
  //   })
  //   confirm(@Param('id', ParseIntPipe) id: number) {
  //     return this.reservationsService.confirm(id);
  //   }
  
  //   @Patch(':id/cancel')
  //   @ApiOperation({ summary: 'Cancel a reservation' })
  //   @ApiParam({ name: 'id', description: 'Reservation ID', type: Number })
  //   @ApiResponse({ 
  //     status: 200, 
  //     description: 'Reservation cancelled successfully' 
  //   })
  //   cancel(@Param('id', ParseIntPipe) id: number) {
  //     return this.reservationsService.cancel(id);
  //   }
  
  //   @Patch(':id/status')
  //   @ApiOperation({ summary: 'Update reservation status' })
  //   @ApiParam({ name: 'id', description: 'Reservation ID', type: Number })
  //   @ApiResponse({ 
  //     status: 200, 
  //     description: 'Reservation status updated successfully' 
  //   })
  //   @ApiBody({ type: UpdateReservationStatusDto })
  //   updateStatus(
  //     @Param('id', ParseIntPipe) id: number,
  //     @Body() updateDto: UpdateReservationStatusDto
  //   ) {
  //     if (updateDto.status === 'CONFIRMED') {
  //       return this.reservationsService.confirm(id);
  //     } else if (updateDto.status === 'CANCELLED') {
  //       return this.reservationsService.cancel(id);
  //     }
  //     // Handle other statuses if needed
  //   }
  }