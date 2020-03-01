import { Document } from 'mongoose';
import { Park } from 'src/core/park/interfaces/park.interface';

export interface Slot extends Document {
  readonly hardwardId: string;
  readonly park: Park;
  readonly name: string;
  readonly status: string;
  readonly gate: string;
  readonly isDetected: boolean;
}
