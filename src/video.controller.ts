import { Controller, Post, Get } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Controller('video')
export class VideoController {
  constructor(@InjectQueue('video') private readonly videoQueue: Queue) {}

  @Post('process')
  async processVideo() {
    await this.videoQueue.add('process', {
      fileName: 'video.mp4',
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    });
    return { message: 'Video is being processed' };
  }

  @Get('progress')
  async getProgress() {
    const job = await this.videoQueue.getJob('process');
    return job?.progress;
  }

  @Post('pause')
  async pause() {
    await this.videoQueue.pause();
    return { message: 'Video is paused' };
  }

  @Post('resume')
  async resume() {
    await this.videoQueue.resume();
    return { message: 'Video is resumed' };
  }

  @Post('compress')
  async compressVideo() {
    await this.videoQueue.add('compress', {
      fileName: 'video.mp4',
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    });
    return { message: 'Video is being compressed' };
  }
}
