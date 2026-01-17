import { registerAs } from '@nestjs/config';

export default registerAs('sentry', () => ({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.SENTRY_ENVIRONMENT || process.env.NODE_ENV || 'development',
}));
