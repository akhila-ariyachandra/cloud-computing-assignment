import { Controller, Get } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';
import { RegisterVehicleEvent } from './event/register-vehicle-event';
import { RegisterVehicleRequest } from './dto/register-vehicle-request.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  /* @EventPattern('register_vehicle')
  handleRegisterVehicle(data: RegisterVehicleEvent) {
    this.appService.handleRegisterVehicle(data);
  } */

  @MessagePattern({ cmd: 'register_vehicle' })
  registerVehicle(data: RegisterVehicleRequest) {
    return this.appService.registerVehicle(data);
  }
}
