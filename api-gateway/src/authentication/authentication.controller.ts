import { Body, Controller, Post } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationRequest } from './dto/authentication-request.dto';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('authenticate')
  authenticate(@Body() authenticationRequest: AuthenticationRequest) {
    return this.authenticationService.authenticate(authenticationRequest);
  }
}
