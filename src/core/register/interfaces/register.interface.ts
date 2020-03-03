import { Document } from 'mongoose';

export interface Register extends Document {
  readonly name: string;
  readonly email: string;
  readonly password: string;
  readonly phoneNumber: string;
  readonly parkName: string;
  readonly parkAddress: string;
}
