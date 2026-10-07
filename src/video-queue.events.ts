import {
  QueueEventsListener,
  QueueEventsHost,
  OnQueueEvent,
} from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { Job } from 'bullmq';

@QueueEventsListener('video')
export class VideoQueueEvents extends QueueEventsHost {
  logger = new Logger('Queue');

  @OnQueueEvent('added')
  async onAddedEvent(job: Job) {
    this.logger.log(`Video ${job.id} added`);
  }
}
