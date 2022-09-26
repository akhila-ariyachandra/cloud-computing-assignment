import { Body, Controller, Headers, Post, Put } from '@nestjs/common';
import { HeadersType } from 'src/types/headers';
import { InitialQuotaRequest } from './dto/initial-quota-request.dto';
import { UpdateQuotaRequest } from './dto/update-quota-request.dto';
import { QuotaService } from './quota.service';

@Controller('quota')
export class QuotaController {
  constructor(private readonly quotaService: QuotaService) {}

  @Post()
  postInitialQuota(
    @Body() initialQuotaRequest: InitialQuotaRequest,
    @Headers() headers: HeadersType,
  ) {
    return this.quotaService.postInitialQuota(
      initialQuotaRequest,
      headers.token,
    );
  }

  @Put()
  updateQuota(
    @Body() updateQuotaRequest: UpdateQuotaRequest,
    @Headers() headers: HeadersType,
  ) {
    return this.quotaService.updateQuota(updateQuotaRequest, headers.token);
  }
}
