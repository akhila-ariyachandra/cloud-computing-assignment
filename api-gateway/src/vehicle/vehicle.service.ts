import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { RegisterVehicleRequest } from './dto/register-vehicle-request.dto';

@Injectable()
export class VehicleService {
  constructor(@Inject('VEHICLE') private readonly vehicleClient: ClientProxy) {}

  getVehicle(): string {
    return 'Vehicle!!!';
  }

  registerVehicle(
    registerVehicleRequest: RegisterVehicleRequest,
    token: string,
  ) {
    this.vehicleClient.send(
      { cmd: 'register_vehicle' },
      { ...registerVehicleRequest, token },
    );
    return registerVehicleRequest.regNo;
  }
}
