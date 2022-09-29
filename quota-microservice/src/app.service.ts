import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { InitialQuotaRequest } from './dto/initial-quota-request.dto';
import { UpdateQuotaRequest } from './dto/update-quota-request.dto';
import { UserType } from './types';
import { RedisService } from '@liaoliaots/nestjs-redis';

@Injectable()
export class AppService {
  readonly REDIS_KEY = 'initial_quota';

  constructor(
    @Inject('AUTHENTICATION')
    private readonly authenticationService: ClientProxy,
    private readonly redisService: RedisService,
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
    await this.verifyToken(data.token, [UserType.ADMIN]);

    const client = await this.redisService.getClient();

    await client.set(this.REDIS_KEY, data.value);

    const updatedValue = await client.get(this.REDIS_KEY);

    return updatedValue;
  }

  async updateInitialQuota(data: UpdateQuotaRequest) {
    await this.verifyToken(data.token, [UserType.ADMIN, UserType.STATION]);

    return data.value;
  }
}
