import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthenticationRequest } from './dto/authentication-request.dto';
import { JwtService } from '@nestjs/jwt';
import { VerifyRequest } from './dto/verify-request.dto';

@Injectable()
export class AppService {
  constructor(private jwtService: JwtService) {}

  async authenticate(data: AuthenticationRequest) {
    const token = await this.jwtService.signAsync(data);

    return { token };
  }

  async verify(data: VerifyRequest) {
    let decodedToken: AuthenticationRequest;

    try {
      decodedToken = await this.jwtService.verifyAsync<AuthenticationRequest>(
        data.token,
      );
    } catch {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    if (!data.types.includes(decodedToken.type)) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    return true;
  }
}
