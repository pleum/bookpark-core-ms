import {
  Controller,
  Post,
  HttpCode,
  Body,
  HttpService,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { WebhookRequestBody } from '@line/bot-sdk';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { createHmac } from 'crypto';

@Controller('chat-bot')
export class ChatBotController {
  private dialogflowUrl: string;
  private lineProviderSecret: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.dialogflowUrl = this.configService.get<string>('DIALOGFLOW_URL');
    this.lineProviderSecret = this.configService.get<string>(
      'LINE_MESSAGING_SECRET',
    );
  }

  @Post('line')
  @HttpCode(200)
  async callback(
    @Req() request: Request,
    @Body() webhookRequestBody: WebhookRequestBody,
  ): Promise<any> {
    const signature = createHmac('SHA256', this.lineProviderSecret)
      .update(JSON.stringify(webhookRequestBody))
      .digest('base64')
      .toString();

    if (signature !== request.headers['x-line-signature']) {
      throw new UnauthorizedException();
    }

    const response = await this.httpService
      .post(this.dialogflowUrl, webhookRequestBody)
      .toPromise();

    if (response.status == 200) {
      return { message: 'success' };
    }

    return { message: 'success' };
  }
}
