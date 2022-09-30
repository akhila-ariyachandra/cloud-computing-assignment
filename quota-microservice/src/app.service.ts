import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { InitialQuotaRequest } from './dto/initial-quota-request.dto';
import { UpdateQuotaRequest } from './dto/update-quota-request.dto';
import { UserType } from './types';
import { RedisService } from '@liaoliaots/nestjs-redis';
import { CheckQuotaRequest } from './dto/check-quota-request.dto';

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

  async checkQuota(data: CheckQuotaRequest) {
    await this.verifyToken(data.token, [UserType.ADMIN, UserType.STATION]);

    const client = await this.redisService.getClient();
    const currentQuota = await client.get(this.REDIS_KEY);

    return currentQuota ? parseInt(currentQuota) : 0;
  }

  async updateInitialQuota(data: UpdateQuotaRequest) {
    await this.verifyToken(data.token, [UserType.ADMIN, UserType.STATION]);

    const client = await this.redisService.getClient();
    const currentValue = await client.get(this.REDIS_KEY);

    const currentQuota = parseInt(currentValue);
    const newValue = currentQuota - data.value;

    await client.set(this.REDIS_KEY, newValue < 0 ? newValue : 0);

    return newValue;
  }
}
