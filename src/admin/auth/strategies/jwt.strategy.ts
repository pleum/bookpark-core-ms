import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

export interface UserPayload {
  readonly userId: string;
  readonly email: string;
  readonly role: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'pleum',
    });
  }

  async validate(payload: any): Promise<UserPayload> {
    return { userId: payload.sub, email: payload.email, role: payload.role };
  }
}
