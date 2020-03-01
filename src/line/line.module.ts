import { Module } from '@nestjs/common';
import { LinePayModule } from './line-pay/line-pay.module';
import { LineSocialModule } from './line-social/line-social.module';
import { LineMessagingModule } from './line-messaging/line-messaging.module';

@Module({
  imports: [LinePayModule, LineSocialModule, LineMessagingModule],
  exports: [LinePayModule, LineSocialModule, LineMessagingModule],
})
export class LineModule {}
