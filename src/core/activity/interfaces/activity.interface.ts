import { Document } from 'mongoose';
import { Park } from 'src/core/park/interfaces/park.interface';
import { Slot } from 'src/core/slot/interfaces/slot.interface';
import { Driver } from 'src/core/driver/interfaces/driver.interface';
import { Booking } from 'src/core/booking/interfaces/booking.interface';
import { Parking } from 'src/core/parking/interfaces/parking.interface';

export interface Activity extends Document {
  readonly status: string;
  readonly park: Park;
  readonly slot: Slot;
  readonly driver: Driver;
  readonly currentBooking: Booking;
  readonly currentParking: Parking;
}
