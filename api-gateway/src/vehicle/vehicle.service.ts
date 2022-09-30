import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { RegisterVehicleRequest } from './dto/register-vehicle-request.dto';

@Injectable()
export class VehicleService {
  constructor(@Inject('VEHICLE') private readonly vehicleClient: ClientProxy) {}

  getVehicle(regNo: string, token: string) {
    return this.vehicleClient.send(
      { cmd: 'vehicle_details' },
      { regNo, token },
    );
  }

  registerVehicle(
    registerVehicleRequest: RegisterVehicleRequest,
    token: string,
  ) {
    return this.vehicleClient.send(
      { cmd: 'register_vehicle' },
      { ...registerVehicleRequest, token },
    );
  }
}
