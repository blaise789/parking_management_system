import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateVehicleDto } from './dtos/create-vehicle.dto';

@Injectable()
export class VehiclesService {
    constructor(private prisma:PrismaService){}
    async createVehicle(userId:string,createVehicleDto:CreateVehicleDto){
     const vehicle=await this.prisma.vehicle.create({
        data:{
            ...createVehicleDto,
            user:{
                connect:{
                    id:userId
                }
            }
        }
     })
     return vehicle
        
    }
}
