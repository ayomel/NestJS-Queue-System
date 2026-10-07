import { OnWorkerEvent, Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';

// Processors are used to process jobs in the queue
// They are responsible for processing the jobs and returning the results
@Processor('video', { concurrency: 1 })
export class VideoWorker extends WorkerHost {
  async process(job: Job) {
    console.log(`Processing video ${job.id} from ${job.data.url}`);
    job.updateProgress(50);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    // throw new Error('Video failed');
    job.updateProgress(100);
    return { message: 'Video processed' };
  }

  // Events are used to handle the events of the jobs
  @OnWorkerEvent('progress')
  async onWorkerProgress(job: Job) {
    console.log(`Video ${job.id} progress: ${job.progress}`);
  }

  @OnWorkerEvent('completed')
  async onWorkerCompleted(job: Job) {
    console.log(`Video ${job.id} completed`);
  }

  @OnWorkerEvent('active')
  async onWorkerActive(job: Job) {
    console.log(`Video ${job.id} active`);
  }

  @OnWorkerEvent('failed')
  async onWorkerFailed(job: Job) {
    console.log(`Video ${job.id} failed`);
    console.log(`Attempts: ${job.attemptsMade}`);
  }
}
