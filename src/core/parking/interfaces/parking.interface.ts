import { Document } from 'mongoose';

import { Invoice } from 'src/core/invoice/interfaces/invoice.interface';
import { Activity } from 'src/core/activity/interfaces/activity.interface';

export interface Parking extends Document {
  readonly activity: Activity;
  readonly status: string;
  readonly parkingAt: Date;
  readonly freeParkingEndAt: Date;
  readonly calculatedPrice: Number;
  readonly calculatedPriceAt: Date;
  readonly parkingTimeoutAt: Date;
  readonly invoice: Invoice;
}
