import { Document } from 'mongoose';

export interface Park extends Document {
  readonly name: string;
  readonly address: string;
  readonly bookingPrice: number;
  readonly pricePerMinute: number;
  readonly freeParkingMinutes: number;
}
