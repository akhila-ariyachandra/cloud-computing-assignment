import { Injectable } from '@nestjs/common';
import { AuthenticationRequest } from './dto/authentication-request.dto';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  authenticate(data: AuthenticationRequest) {
    return data;
  }
}
