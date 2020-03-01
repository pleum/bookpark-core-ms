import { createParamDecorator } from '@nestjs/common';

export interface LineUserProfile {
  readonly userId: string;
  readonly displayName: string;
  readonly pictureUrl: string;
  readonly statusMessage: string;
}

export const CurrentUser = createParamDecorator((data, req) => {
  return req.user;
});
