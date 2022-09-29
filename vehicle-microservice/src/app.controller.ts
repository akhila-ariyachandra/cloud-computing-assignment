import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';
import { RegisterVehicleRequest } from './dto/register-vehicle-request.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: 'register_vehicle' })
  async registerVehicle(data: RegisterVehicleRequest) {
    return await this.appService.registerVehicle(data);
  }
}
