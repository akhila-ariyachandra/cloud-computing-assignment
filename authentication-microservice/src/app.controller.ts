import { Controller, Get } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';
import { AuthenticationRequest } from './dto/authentication-request.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @MessagePattern({ cmd: 'authenticate' })
  authenticate(data: AuthenticationRequest) {
    return this.appService.authenticate(data);
  }
}
