import { Inject, Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { RegisterVehicleRequest } from './dto/register-vehicle-request.dto';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { UserType } from './types';
import { HttpService } from '@nestjs/axios';
import { PrismaService } from './prisma.service';
import { GetVehicleRequest } from './dto/get-vehicle-request.dto';

type Vehicle = {
  regNo: string;
  regDate: string;
  chassisNo: string;
};

@Injectable()
export class AppService {
  constructor(
    @Inject('AUTHENTICATION')
    private readonly authenticationService: ClientProxy,
    @Inject('QUOTA') private readonly quotaService: ClientProxy,
    private readonly httpService: HttpService,
    private readonly prisma: PrismaService,
  ) {}

  readonly quotaValue = 20;

  private async verifyToken(token: string, types: UserType[]) {
    return await firstValueFrom<boolean>(
      this.authenticationService.send<boolean>(
        { cmd: 'verify' },
        { token, types },
      ),
    );
  }

  async getVehicle(data: GetVehicleRequest) {
    await this.verifyToken(data.token, [UserType.ADMIN, UserType.USER]);

    const vehicle = await this.prisma.vehicle.findUnique({
      where: {
        regNo: data.regNo,
      },
    });

    return vehicle;
  }

  async registerVehicle(data: RegisterVehicleRequest) {
    await this.verifyToken(data.token, [UserType.ADMIN]);

    let vehicle: Vehicle;

    try {
      const res = await firstValueFrom(
        this.httpService.get<Vehicle>(
          `https://cloud-computing-assignment-wxlw.vercel.app/api/vehicle/${data.regNo}`,
        ),
      );

      vehicle = res.data;
    } catch {
      throw new RpcException('Vehicle not found');
    }

    const availableQuota = await firstValueFrom(
      this.quotaService.send<number>(
        { cmd: 'check_quota' },
        { token: data.token, value: this.quotaValue },
      ),
    );

    if (availableQuota < this.quotaValue) {
      throw new RpcException('Not enough quota');
    }

    await firstValueFrom(
      this.quotaService.send<number>(
        { cmd: 'update_quota' },
        { token: data.token, value: this.quotaValue },
      ),
    );

    try {
      const savedVehicle = await this.prisma.vehicle.create({
        data: {
          ...vehicle,
          regDate: new Date(vehicle.regDate),
        },
      });

      return savedVehicle;
    } catch {
      throw new RpcException('Error registering vehicle');
    }
  }
}
