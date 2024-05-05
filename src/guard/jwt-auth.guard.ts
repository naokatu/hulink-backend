import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import admin from 'firebase-admin'

import { Config } from '../config/configuration'
import { UnauthorizedException } from '../errors/errors'

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly configService: ConfigService<Config>) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const doAuth = this.configService.get('AUTH_ENABLED', true)

    // 開発用認証スキップ
    if (doAuth === 'false') {
      const firebaseUid = request.headers['x-firebase-uid']
      const email = request.headers['x-email']
      request.claim = {
        uid: firebaseUid || 'firebaseUid_john',
        email: email || 'john@example.com',
      }

      return true
    } else {
      const authHeader = request.headers['authorization']
      const [type, jwt] = authHeader.split(' ')

      // authorization ヘッダーの中身が "Bearer JWT" の形式であるか確認
      if (type !== 'Bearer') {
        throw new UnauthorizedException(
          'INVALID_AUTH_TOKEN',
          'bearer not found',
        )
      }

      // JWT を Decode して request に格納する
      await admin
        .auth()
        .verifyIdToken(jwt)
        .then((decodeToken) => {
          const uid = decodeToken.uid
          const email = decodeToken.email
          request.claim = {
            uid: uid,
            email: email,
          }
        })
        .catch((error) => {
          throw new UnauthorizedException('INVALID_AUTH_TOKEN', error.message)
        })

      return true
    }
  }
}
