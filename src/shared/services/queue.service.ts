import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';

@Injectable()
export class QueueService {
  constructor(@InjectQueue('default') private defaultQueue: Queue) {}

  async addJob(name: string, data: any, options?: any) {
    return this.defaultQueue.add(name, data, options);
  }

  async getJobCounts() {
    return this.defaultQueue.getJobCounts();
  }

  async getJob(jobId: string) {
    return this.defaultQueue.getJob(jobId);
  }

  async removeJob(jobId: string) {
    const job = await this.getJob(jobId);
    if (job) {
      await job.remove();
    }
  }
}
