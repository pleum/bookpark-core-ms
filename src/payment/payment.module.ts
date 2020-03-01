import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { CoreModule } from 'src/core/core.module';
import { LinePayModule } from 'src/line/line-pay/line-pay.module';
import { LineMessagingModule } from 'src/line/line-messaging/line-messaging.module';
import { PaymentService } from './payment.service';

@Module({
  imports: [CoreModule, LinePayModule, LineMessagingModule],
  providers: [PaymentService],
  controllers: [PaymentController],
})
export class PaymentModule {}
