import { Document } from 'mongoose';
export interface IValidate extends Document {
  readonly addressLines: string;
  readonly regionCode: string;
}
