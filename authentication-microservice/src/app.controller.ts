import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';
import { AuthenticationRequest } from './dto/authentication-request.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: 'authenticate' })
  async authenticate(data: AuthenticationRequest) {
    return await this.appService.authenticate(data);
  }
}
