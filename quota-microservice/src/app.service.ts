import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { InitialQuotaRequest } from './dto/initial-quota-request.dto';
import { UpdateQuotaRequest } from './dto/update-quota-request.dto';
import { UserType } from './types';

@Injectable()
export class AppService {
  constructor(
    @Inject('AUTHENTICATION')
    private readonly authenticationService: ClientProxy,
  ) {}

  private async verifyToken(token: string, types: UserType[]) {
    return await firstValueFrom<boolean>(
      this.authenticationService.send<boolean>(
        { cmd: 'verify' },
        { token, types },
      ),
    );
  }

  async postInitialQuota(data: InitialQuotaRequest) {
    const verified = await this.verifyToken(data.token, [UserType.ADMIN]);

    return data.value;
  }

  async updateInitialQuota(data: UpdateQuotaRequest) {
    const verified = await this.verifyToken(data.token, [
      UserType.ADMIN,
      UserType.STATION,
    ]);

    return data.value;
  }
}
