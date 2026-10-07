import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';

import { VideoController } from './video.controller.js';
import { AppService } from './app.service.js';
import { VideoWorker } from './video.worker.js';

@Module({
  imports: [
    BullModule.forRoot({
      connection: { host: 'localhost', port: 6379 },
      defaultJobOptions: {
        attempts: 3,
        removeOnComplete: 1000,
        removeOnFail: 1000,
        backoff: {
          type: 'exponential',
          delay: 1000,
        },
      },
    }),
    BullModule.registerQueue({ name: 'video' }, { name: 'email' }),
  ],
  controllers: [VideoController],
  providers: [AppService, VideoWorker],
})
export class AppModule {}
