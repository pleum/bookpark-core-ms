import { Injectable, HttpService } from '@nestjs/common';
import { UserProfileResponseDto } from './dto/user-profile-response.dto';
import { AxiosResponse } from 'axios';
import { VerifyAccessTokenResponseDto } from './dto/verify-access-token-response.dto';

@Injectable()
export class LineSocialService {
  constructor(private readonly httpService: HttpService) {}

  /**
   * Gets a user's display name, profile image, and status message.
   * @param accessToken line user access token.
   */
  async getUserProfile(
    accessToken: string,
  ): Promise<AxiosResponse<UserProfileResponseDto>> {
    return this.httpService
      .get<UserProfileResponseDto>('/v2/profile', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .toPromise();
  }

  async verifyAccessToken(
    accessToken: string,
  ): Promise<AxiosResponse<VerifyAccessTokenResponseDto>> {
    return this.httpService
      .get('/oauth2/v2.1/verify', {
        params: {
          access_token: accessToken,
        },
      })
      .toPromise();
  }
}
