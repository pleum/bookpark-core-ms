import { Document } from 'mongoose';

export interface Manager extends Document {
  readonly name: string;
  readonly email: string;
  readonly phoneNumber: string;
  readonly password: string;
  readonly role: string;
}
