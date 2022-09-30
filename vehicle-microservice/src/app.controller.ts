import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';
import { GetVehicleRequest } from './dto/get-vehicle-request.dto';
import { RegisterVehicleRequest } from './dto/register-vehicle-request.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: 'vehicle_details' })
  async getVehicle(data: GetVehicleRequest) {
    return await this.appService.getVehicle(data);
  }

  @MessagePattern({ cmd: 'register_vehicle' })
  async registerVehicle(data: RegisterVehicleRequest) {
    return await this.appService.registerVehicle(data);
  }
}
