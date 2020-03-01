import { Injectable, HttpService } from '@nestjs/common';
import { Message } from '@line/bot-sdk';
import { AxiosResponse } from 'axios';

@Injectable()
export class LineMessagingService {
  constructor(private readonly httpService: HttpService) {}

  async sendPushMessage(
    lineUserId: string,
    messages: Message[],
  ): Promise<AxiosResponse<any>> {
    return this.httpService
      .post('/v2/bot/message/push', {
        to: lineUserId,
        messages,
      })
      .toPromise();
  }
}
