import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateVehicleDto } from './dtos/create-vehicle.dto';
import { paginator } from 'src/pagination/paginator';

@Injectable()
export class VehiclesService {
  constructor(private prisma: PrismaService) {}
  async createVehicle(userId: string, createVehicleDto: CreateVehicleDto) {
    // check if the vehicle exist
    try {
      const vehicleExists = await this.prisma.vehicle.findUnique({
        where: {
          plateNumber: createVehicleDto.plateNumber,
        },
      });
      if (!vehicleExists) {
        throw new BadRequestException('vehicle already exists');
      }
      const vehicle = await this.prisma.vehicle.create({
        data: {
          ...createVehicleDto,
          user: {
            connect: {
              id: userId,
            },
          },
        },
      });
      return vehicle;
    } catch (error) {
      throw new HttpException('internal server error', 500);
    }
  }
  async searchVehicle(page: number, limit: number, plateNumber: string) {
    const [vehicles, total] = await this.prisma.$transaction([
      this.prisma.vehicle.findMany({
        where: {
          plateNumber: {
            contains: plateNumber,
            mode: 'insensitive',
          },
        },
        take: limit,
        skip: page * limit,
      }),
      this.prisma.vehicle.count({
        where: {
          plateNumber,
        },
      }),
    ]);
    return {
      vehicles,
      meta: paginator({
        page: Number(page),
        limit: Number(limit),
        total: Number(total),
      }),
    };
  }
}
