import { Document } from 'mongoose';
export interface IAddress extends Document {
  readonly wallet: string;
  readonly signature: string;
  readonly shipAddress: string;
}
