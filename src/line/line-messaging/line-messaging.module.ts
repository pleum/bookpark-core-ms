import { Module, HttpModule, OnModuleInit, HttpService } from '@nestjs/common';
import { LineMessagingService } from './line-messaging.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AxiosRequestConfig } from 'axios';

@Module({
  imports: [
    HttpModule.register({ baseURL: 'https://api.line.me' }),
    ConfigModule,
  ],
  providers: [LineMessagingService],
  exports: [LineMessagingService],
})
export class LineMessagingModule implements OnModuleInit {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  onModuleInit() {
    this.httpService.axiosRef.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        config.headers['Authorization'] = `Bearer ${this.configService.get<
          string
        >('LINE_MESSAGING_ACCESS_TOKEN')}`;
        return config;
      },
    );
  }
}
