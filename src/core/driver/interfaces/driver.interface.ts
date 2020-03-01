import { Document } from 'mongoose';

export interface Driver extends Document {
  readonly lineUserId: string;
}
