import { BullModule } from '@nestjs/bull';
import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ScheduleModule } from '@nestjs/schedule';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { LoggerModule } from 'nestjs-pino';

import appConfig from './config/app.config';
import awsConfig from './config/aws.config';
import cacheConfig from './config/cache.config';
import databaseConfig from './config/database.config';
import jwtConfig from './config/jwt.config';
import queueConfig from './config/queue.config';
import sentryConfig from './config/sentry.config';
import throttleConfig from './config/throttle.config';

import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';

import { AuthModule } from './modules/auth/auth.module';
import { HealthModule } from './modules/health/health.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { UsersModule } from './modules/users/users.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [
    // Config
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        appConfig,
        databaseConfig,
        jwtConfig,
        cacheConfig,
        queueConfig,
        awsConfig,
        sentryConfig,
        throttleConfig,
      ],
    }),

    // Logger
    LoggerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        pinoHttp: {
          level: configService.get('app.nodeEnv') === 'production' ? 'info' : 'debug',
          transport:
            configService.get('app.nodeEnv') !== 'production'
              ? {
                  target: 'pino-pretty',
                  options: {
                    colorize: true,
                    levelFirst: true,
                    translateTime: 'UTC:yyyy-mm-dd HH:MM:ss.l',
                  },
                }
              : undefined,
        },
      }),
    }),

    // Cache
    CacheModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        store: require('cache-manager-ioredis'),
        host: configService.get('cache.host'),
        port: configService.get('cache.port'),
        password: configService.get('cache.password'),
        db: configService.get('cache.db'),
        ttl: configService.get('cache.ttl'),
      }),
    }),

    // Throttler (Rate Limiting)
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => [
        {
          ttl: configService.get('throttle.ttl'),
          limit: configService.get('throttle.limit'),
        },
      ],
    }),

    // Bull Queue
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        redis: {
          host: configService.get('queue.host'),
          port: configService.get('queue.port'),
          password: configService.get('queue.password'),
          db: configService.get('queue.db'),
        },
      }),
    }),

    // Schedule
    ScheduleModule.forRoot(),

    // Feature Modules
    PrismaModule,
    SharedModule,
    AuthModule,
    UsersModule,
    HealthModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
