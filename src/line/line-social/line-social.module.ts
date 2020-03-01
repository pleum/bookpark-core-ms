import { Module, HttpModule } from '@nestjs/common';
import { LineSocialService } from './line-social.service';

@Module({
  imports: [
    HttpModule.register({
      baseURL: 'https://api.line.me',
    }),
  ],
  providers: [LineSocialService],
  exports: [LineSocialService],
})
export class LineSocialModule {}
