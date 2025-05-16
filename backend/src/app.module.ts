import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { FileModule } from './modules/file/file.module';
import { AdminModule } from './modules/admin/admin.module';
import { UserModule } from './modules/user/user.module';


import { PrismaModule } from '../prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MailModule } from './mail/mail.module';
import { TicketsModule } from './modules/tickets/tickets.module';
import { VehiclesModule } from './modules/vehicles/vehicles.module';
import appConfig from './config/app.config';
import { ReservationsModule } from './modules/reservations/reservations.module';
import { ParkingSlotsModule } from './modules/parking-slots/parking-slots.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal:true,
    envFilePath:'.env',
  }),
  JwtModule.register(
{
global:true,
secret:appConfig().jwt.secret,
signOptions:{expiresIn:appConfig().jwt.expiresIn}

}
  )
  ,
  
  AuthModule, FileModule, AdminModule, UserModule , MailModule,PrismaModule, ParkingSlotsModule, ReservationsModule, VehiclesModule, TicketsModule],

  controllers: [],
  providers: [],
})
export class AppModule {}
