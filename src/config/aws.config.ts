import { registerAs } from '@nestjs/config';

export default registerAs('aws', () => ({
  region: process.env.AWS_REGION || 'us-east-1',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  s3: {
    bucket: process.env.AWS_S3_BUCKET,
    url: process.env.AWS_S3_URL,
  },
  ses: {
    fromEmail: process.env.AWS_SES_FROM_EMAIL || 'noreply@foundly.com',
    fromName: process.env.AWS_SES_FROM_NAME || 'Foundly',
  },
}));
