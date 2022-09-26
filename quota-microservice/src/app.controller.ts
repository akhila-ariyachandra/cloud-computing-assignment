import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';
import { InitialQuotaRequest } from './dto/initial-quota-request.dto';
import { UpdateQuotaRequest } from './dto/update-quota-request.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: 'initial_quota' })
  postInitialQuota(data: InitialQuotaRequest) {
    return this.appService.postInitialQuota(data);
  }

  @MessagePattern({ cmd: 'update_quota' })
  updateQuota(data: UpdateQuotaRequest) {
    return this.appService.updateInitialQuota(data);
  }
}
