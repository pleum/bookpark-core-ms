import { Document } from 'mongoose';
import { Activity } from 'src/core/activity/interfaces/activity.interface';
import { Driver } from 'src/core/driver/interfaces/driver.interface';
import { Invoice } from 'src/core/invoice/interfaces/invoice.interface';

export interface Booking extends Document {
  readonly status: string;
  readonly driver: Driver;
  readonly invoice: Invoice;
  readonly activity: Activity;
  readonly totalPrice: Number;
}
