import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InvoiceService } from 'src/core/invoice/invoice.service';
import { BookingService } from 'src/core/booking/booking.service';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);
  constructor(
    private readonly invoiceService: InvoiceService,
    private readonly bookingService: BookingService,
  ) {}

  @Cron(CronExpression.EVERY_5_SECONDS)
  handleCron() {
    this.invoiceService.updateTimeoutInvoice();
    this.bookingService.updateTimeoutBooking();
  }
}
