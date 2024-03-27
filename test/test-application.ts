import {
  INestApplication,
  MiddlewareConsumer,
  VersioningType,
} from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import * as OpenApiValidator from 'express-openapi-validator'
import { join } from 'path'

import { AppModule } from '../src/app.module'
import { HttpExceptionFilter } from '../src/filters/http-exception.filter'
import { LoggingMiddleware } from '../src/middleware/logging.middleware'
import { PrismaService } from '../src/prisma.service'

export async function createTestingApplication(): Promise<INestApplication> {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const prisma: PrismaClient = jestPrisma.client

  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  })
    .overrideProvider(PrismaService)
    .useValue(prisma)
    .compile()

  const app = moduleFixture.createNestApplication()

  const appModule = app.get(AppModule)
  appModule.configure = function (consumer: MiddlewareConsumer) {
    consumer
      .apply(
        LoggingMiddleware,
        ...OpenApiValidator.middleware({
          apiSpec: join(__dirname, '../schema/HuLink.yml'),
          ajvFormats: {
            mode: 'full',
          },
        }),
      )
      .forRoutes('*')
  }

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  })
  app.useGlobalFilters(new HttpExceptionFilter())

  return app
}
