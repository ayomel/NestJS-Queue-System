import { Controller, Post } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Controller('video')
export class VideoController {
  constructor(@InjectQueue('video') private readonly videoQueue: Queue) {}

  @Post('process')
  async processVideo() {
    this.videoQueue.add('process', {
      fileName: 'video.mp4',
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    });
    return { message: 'Video is being processed' };
  }
}
