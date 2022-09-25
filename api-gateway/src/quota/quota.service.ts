import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InitialQuotaRequest } from './dto/initial-quota-request.dto';

@Injectable()
export class QuotaService {
  constructor(@Inject('QUOTA') private readonly quotaService: ClientProxy) {}

  postInitialQuota(initialQuotaRequest: InitialQuotaRequest) {
    return this.quotaService.send(
      { cmd: 'initial_quota' },
      initialQuotaRequest,
    );
  }
}
