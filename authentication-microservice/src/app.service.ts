import { Injectable } from '@nestjs/common';
import { AuthenticationRequest } from './dto/authentication-request.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AppService {
  constructor(private jwtService: JwtService) {}

  async authenticate(data: AuthenticationRequest) {
    const token = await this.jwtService.signAsync(data);

    return { token };
  }
}
