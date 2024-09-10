import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import * as OpenApiValidator from 'express-openapi-validator'
import { join } from 'path'

import { LinkUserModule } from './api/link-user/link-user.module'
import { UserModule } from './api/user/user.module'
import { HealthModule } from './api/health/health.module'
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
    LinkUserModule,
    UserModule,
    HealthModule,
  ],
  providers: [LoggingService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        LoggingMiddleware,
        ...OpenApiValidator.middleware({
          apiSpec: join(__dirname, 'schema/HuLink.yml'),
          ajvFormats: {
            mode: 'full',
          },
        }),
      )
      .forRoutes('*')
  }
}
