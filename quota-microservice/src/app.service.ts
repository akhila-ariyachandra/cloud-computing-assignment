import { Injectable } from '@nestjs/common';
import { InitialQuotaRequest } from './dto/initial-quota-request.dto';

@Injectable()
export class AppService {
  postInitialQuota(data: InitialQuotaRequest) {
    return data.value;
  }
}
