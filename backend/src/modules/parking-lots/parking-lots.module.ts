import { Module } from '@nestjs/common';
import { ParkingLotsService } from './parking-lots.service';
import { ParkingLotsController } from './parking-lots.controller';

@Module({
  providers: [ParkingLotsService],
  controllers: [ParkingLotsController]
})
export class ParkingLotsModule {}
