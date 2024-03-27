import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import * as OpenApiValidator from 'express-openapi-validator'
import { join } from 'path'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import configuration from './config/configuration'
import { LoggingModule } from './logging/logging.module'
import { LoggingService } from './logging/logging.service'
import { LoggingMiddleware } from './middleware/logging.middleware'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      ignoreEnvFile: true,
    }),
    LoggingModule,
  ],
  controllers: [AppController],
  providers: [AppService, LoggingService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        LoggingMiddleware,
        ...OpenApiValidator.middleware({
          apiSpec: join(__dirname, 'schema/hulink.yml'),
          validateFormats: 'full',
        }),
      )
      .forRoutes('*')
  }
}