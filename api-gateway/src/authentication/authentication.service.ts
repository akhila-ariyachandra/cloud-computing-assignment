import { Inject, Injectable } from '@nestjs/common';
import { AuthenticationRequest } from './dto/authentication-request.dto';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Injectable()
export class AuthenticationService {
  constructor(
    @Inject('AUTHENTICATION')
    private readonly authenticationClient: ClientProxy,
  ) {}

  authenticate(authenticationRequest: AuthenticationRequest): Observable<any> {
    return this.authenticationClient.send(
      { cmd: 'authenticate' },
      authenticationRequest,
    );
  }
}
