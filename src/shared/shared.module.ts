import { BullModule } from '@nestjs/bull';
import { Global, Module } from '@nestjs/common';

import { EmailService } from './services/email.service';
import { QueueService } from './services/queue.service';
import { S3Service } from './services/s3.service';

@Global()
@Module({
  imports: [
    BullModule.registerQueue({
      name: 'default',
    }),
  ],
  providers: [S3Service, EmailService, QueueService],
  exports: [S3Service, EmailService, QueueService],
})
export class SharedModule {}
