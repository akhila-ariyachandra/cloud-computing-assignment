import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RedisModule } from '@liaoliaots/nestjs-redis';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AUTHENTICATION',
        transport: Transport.TCP,
        options: {
          port: 3001,
        },
      },
    ]),
    RedisModule.forRoot({
      config: {
        url: 'redis://:48b91336fb4549b09a40b700afdb568a@us1-correct-crayfish-38558.upstash.io:38558',
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
