import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VehicleController } from './vehicle/vehicle.controller';
import { VehicleService } from './vehicle/vehicle.service';
import { AuthenticationController } from './authentication/authentication.controller';
import { AuthenticationService } from './authentication/authentication.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AUTHENTICATION',
        transport: Transport.TCP,
        options: {
          port: 3001,
        },
      },
    ]),
    ClientsModule.register([
      {
        name: 'QUOTA',
        transport: Transport.TCP,
        options: {
          port: 3002,
        },
      },
    ]),
    ClientsModule.register([
      {
        name: 'VEHICLE',
        transport: Transport.TCP,
        options: {
          port: 3003,
        },
      },
    ]),
  ],
  controllers: [AppController, VehicleController, AuthenticationController],
  providers: [AppService, VehicleService, AuthenticationService],
})
export class AppModule {}
