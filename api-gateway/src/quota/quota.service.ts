import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InitialQuotaRequest } from './dto/initial-quota-request.dto';
import { UpdateQuotaRequest } from './dto/update-quota-request.dto';

@Injectable()
export class QuotaService {
  constructor(@Inject('QUOTA') private readonly quotaService: ClientProxy) {}

  postInitialQuota(initialQuotaRequest: InitialQuotaRequest, token: string) {
    return this.quotaService.send(
      { cmd: 'initial_quota' },
      { ...initialQuotaRequest, token },
    );
  }

  updateQuota(updateQuotaRequest: UpdateQuotaRequest, token: string) {
    return this.quotaService.send(
      { cmd: 'update_quota' },
      { ...updateQuotaRequest, token },
    );
  }
}
