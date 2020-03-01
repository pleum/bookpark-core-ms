import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
} from '@nestjs/common';
import { LiffService } from '../liff.service';
import { Request } from 'express';

@Injectable()
export class LiffGuard implements CanActivate {
  constructor(
    @Inject('LiffService')
    private readonly liffService: LiffService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    request['user'] = {
      userId: 'Ued83a1840d2194f3d722af0b130ee153',
      displayName: 'Brown',
      pictureUrl: 'https://example.com/abcdefghijklmn',
      statusMessage: 'Hello, LINE!',
    };

    return true;

    if (!('authorization' in request.headers)) {
      return false;
    }

    const authorizationHeader = request.headers['authorization'];
    if (!authorizationHeader.startsWith('Bearer')) {
      return false;
    }

    const accessToken = authorizationHeader.split(' ')[1];
    try {
      const user = await this.liffService.verifyLiffUser(accessToken);
      if (user == null) {
        return false;
      }
      request['user'] = user;
    } catch (e) {
      return false;
    }

    return true;
  }
}
