import { VersioningType } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import admin from 'firebase-admin'

import { AppModule } from './app.module'
import { Config } from './config/configuration'
import { HttpExceptionFilter } from './filters/http-exception.filter'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.enableCors({
    origin: '*',
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  })

  const configService = app.get(ConfigService<Config>)

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  })
  app.useGlobalFilters(new HttpExceptionFilter())
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
  })
  await app.listen(configService.get('APP_PORT', 3000))
}
bootstrap()
