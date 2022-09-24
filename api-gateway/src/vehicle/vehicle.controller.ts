import { Body, Controller, Get, Post } from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { RegisterVehicleRequest } from './dto/register-vehicle-request.dto';

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
  ): string {
    return this.vehicleService.registerVehicle(registerVehicleRequest);
  }
}
