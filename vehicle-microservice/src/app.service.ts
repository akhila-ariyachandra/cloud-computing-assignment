import { Inject, Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { RegisterVehicleRequest } from './dto/register-vehicle-request.dto';
import { ClientProxy } from '@nestjs/microservices';
import { UserType } from './types';

@Injectable()
export class AppService {
  constructor(
    @Inject('AUTHENTICATION')
    private readonly authenticationService: ClientProxy,
    @Inject('QUOTA') private readonly quotaService: ClientProxy,
  ) {}

  private async verifyToken(token: string, types: UserType[]) {
    return await firstValueFrom<boolean>(
      this.authenticationService.send<boolean>(
        { cmd: 'verify' },
        { token, types },
      ),
    );
  }

  async registerVehicle(data: RegisterVehicleRequest) {
    await this.verifyToken(data.token, [UserType.ADMIN]);

    
    return data.regNo;
  }
}
