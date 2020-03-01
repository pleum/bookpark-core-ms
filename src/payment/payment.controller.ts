import {
  Controller,
  Get,
  Query,
  BadRequestException,
  HttpCode,
} from '@nestjs/common';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Get('confirm')
  @HttpCode(200)
  async confirm(
    @Query('transactionId') transactionId: number,
    @Query('orderId') invoiceId: string,
  ): Promise<any> {
    if (!transactionId || !invoiceId) {
      throw new BadRequestException();
    }
    console.log(transactionId, invoiceId);

    await this.paymentService.confirm(transactionId, invoiceId);
  }

  // @Get('cancel')
  // async cancel(
  //   @Query('transactionId') transactionId: number,
  //   @Query('orderId') invoiceId: string,
  // ): Promise<any> {
  //   console.log('Cancel', transactionId, invoiceId);
  //   return 'done';
  // }
}
