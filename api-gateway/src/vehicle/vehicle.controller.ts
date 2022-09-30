import { Body, Controller, Get, Post, Headers, Param } from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { RegisterVehicleRequest } from './dto/register-vehicle-request.dto';
import { HeadersType } from 'src/types/headers';

@Controller('vehicle')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  @Get('details/:regNo')
  getVehicle(@Param('regNo') regNo: string, @Headers() headers: HeadersType) {
    return this.vehicleService.getVehicle(regNo, headers.token);
  }

  @Post('register')
  registerVehicle(
    @Body() registerVehicleRequest: RegisterVehicleRequest,
    @Headers() headers: HeadersType,
  ) {
    return this.vehicleService.registerVehicle(
      registerVehicleRequest,
      headers.token,
    );
  }
}
