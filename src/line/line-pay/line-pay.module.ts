import { Module, HttpModule, OnModuleInit, HttpService } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AxiosRequestConfig } from 'axios';
import * as uuid from 'uuid/v4';
import { createHmac } from 'crypto';
import { LinePayService } from './line-pay.service';

@Module({
  imports: [
    HttpModule.register({ baseURL: 'https://sandbox-api-pay.line.me' }),
    ConfigModule,
  ],
  providers: [LinePayService],
  exports: [LinePayService],
})
export class LinePayModule implements OnModuleInit {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  onModuleInit() {
    this.httpService.axiosRef.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        const clientId = this.configService.get<string>(
          'RABBIT_LINE_PAY_CLIENT_ID',
        );
        const secretKey = this.configService.get<string>(
          'RABBIT_LINE_PAY_SECRET_KEY',
        );
        const nonce = uuid();

        let signature;
        if (config.method === 'post') {
          signature = createHmac('sha256', secretKey)
            .update(
              secretKey + config.url + JSON.stringify(config.data) + nonce,
            )
            .digest('base64');
        }

        config.headers['X-LINE-ChannelId'] = clientId;
        config.headers['X-LINE-Authorization-Nonce'] = nonce;
        config.headers['X-LINE-Authorization'] = signature;

        return config;
      },
    );
  }
}
