import { Injectable, BadGatewayException } from '@nestjs/common';
import { InvoiceService } from 'src/core/invoice/invoice.service';
import { LinePayService } from 'src/line/line-pay/line-pay.service';

@Injectable()
export class PaymentService {
  constructor(
    private readonly invoiceService: InvoiceService,
    private readonly linePayService: LinePayService,
  ) {}

  async confirm(transactionId: number, invoiceId: string): Promise<any> {
    const invoice = await this.invoiceService.getOneById(invoiceId);

    const linePayConfirmRes = await this.linePayService.confirm(transactionId, {
      amount: invoice.totalPrice,
      currency: 'THB',
    });

    if (linePayConfirmRes.data.returnCode !== '0000') {
      throw new BadGatewayException("can't confirm rabbit line pay");
    }

    await this.invoiceService.confirm(invoiceId);
  }
}
