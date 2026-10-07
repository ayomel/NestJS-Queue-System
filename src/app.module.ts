import { Module } from '@nestjs/common';
import { VideoController } from './video.controller.js';
import { AppService } from './app.service.js';
import { BullModule } from '@nestjs/bullmq';

@Module({
  imports: [
    BullModule.forRoot({
      connection: { host: 'localhost', port: 6379 },
      defaultJobOptions: { attempts: 3 },
    }),
    BullModule.registerQueue({ name: 'video' }, { name: 'email' }),
  ],
  controllers: [VideoController],
  providers: [AppService],
})
export class AppModule {}
