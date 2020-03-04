import { Document } from 'mongoose';

import { Booking } from 'src/core/booking/interfaces/booking.interface';
import { Parking } from 'src/core/parking/interfaces/parking.interface';
import { Driver } from 'src/core/driver/interfaces/driver.interface';
import { Activity } from 'src/core/activity/interfaces/activity.interface';

interface PaymentUrl {
  readonly web: string;
  readonly app: string;
}

export interface Invoice extends Document {
  readonly driver: Driver;
  readonly status: string;
  readonly totalPrice: number;
  readonly type: string;
  readonly paymentUrl: PaymentUrl;
  readonly createdAt: Date;
  readonly booking: Booking;
  readonly parking: Parking;
  readonly activity: Activity;
}
