import { Body, Controller, Get, Post, Headers } from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { RegisterVehicleRequest } from './dto/register-vehicle-request.dto';
import { HeadersType } from 'src/types/headers';

@Controller('vehicle')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  @Get()
  getVehicle(): string {
    return this.vehicleService.getVehicle();
  }

  @Post('register')
  registerVehicle(
    @Body() registerVehicleRequest: RegisterVehicleRequest,
    @Headers() headers: HeadersType,
  ): string {
    return this.vehicleService.registerVehicle(
      registerVehicleRequest,
      headers.token,
    );
  }
}
