import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { RegisterVehicleRequest } from './dto/register-vehicle-request.dto';
import { RegisterVehicleEvent } from './event/register-vehicle-event';

@Injectable()
export class VehicleService {
  constructor(@Inject('VEHICLE') private readonly vehicleClient: ClientProxy) {}

  getVehicle(): string {
    return 'Vehicle!!!';
  }

  registerVehicle(registerVehicleRequest: RegisterVehicleRequest) {
    /* this.vehicleClient.emit(
      'register_vehicle',
      new RegisterVehicleEvent(registerVehicleRequest.regNo),
    ); */
    this.vehicleClient.send(
      { cmd: 'register_vehicle' },
      registerVehicleRequest,
    );
    return registerVehicleRequest.regNo;
  }
}
