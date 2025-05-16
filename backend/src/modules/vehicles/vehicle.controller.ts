import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AdminGuard } from 'src/guards/admin.guard';
import { DriverGuard } from 'src/guards/driver.guard';
import { AuthRequest } from 'src/types';
import { CreateVehicleDto } from './dtos/create-vehicle.dto';
import { VehiclesService } from './vehicles.service';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('/vehicles')
@ApiBearerAuth()
// @UseGuards(AdminGuard)
export class VehicleController {
  constructor(private vehicleService: VehiclesService) {}

  // register vehicle
  @UseGuards(DriverGuard)
  @Post()
  registerVehicle(
    @Req() req: AuthRequest,
    @Body() createVehicleDto: CreateVehicleDto,
  ) {
    console.log(req.user.id);
    return this.vehicleService.createVehicle(req.user.id, createVehicleDto);
  }
}
