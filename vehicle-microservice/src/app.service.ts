import { Injectable } from '@nestjs/common';
import { RegisterVehicleEvent } from './event/register-vehicle-event';
import { RegisterVehicleRequest } from './dto/register-vehicle-request.dto';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  handleRegisterVehicle(data: RegisterVehicleEvent) {
    console.log('> VEHICLE handleRegisterVehicle: ', data);
  }

  registerVehicle(data: RegisterVehicleRequest) {
    return data.regNo;
  }
}
