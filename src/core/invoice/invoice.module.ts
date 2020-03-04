import { Module, forwardRef } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { MongooseModule } from '@nestjs/mongoose';
import { InvoiceSchema } from './schemas/invoice.schema';
import { CoreModule } from '../core.module';
import { LinePayModule } from 'src/line/line-pay/line-pay.module';
import { LineMessagingModule } from 'src/line/line-messaging/line-messaging.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Invoice', schema: InvoiceSchema }]),
    forwardRef(() => CoreModule),
    forwardRef(() => LinePayModule),
    forwardRef(() => LineMessagingModule),
  ],
  providers: [InvoiceService],
  exports: [InvoiceService],
})
export class InvoiceModule {}
