import { Body, Controller, Post } from '@nestjs/common';
import { InitialQuotaRequest } from './dto/initial-quota-request.dto';
import { QuotaService } from './quota.service';

@Controller('quota')
export class QuotaController {
  constructor(private readonly quotaService: QuotaService) {}

  @Post()
  postInitialQuota(@Body() initialQuotaRequest: InitialQuotaRequest) {
    return this.quotaService.postInitialQuota(initialQuotaRequest);
  }
}
