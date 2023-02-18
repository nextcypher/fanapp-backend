import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AddressDocument = Document<Address>;

@Schema()
export class Address {
  @Prop()
  wallet: string;

  @Prop()
  signature: string;

  @Prop()
  shipAddress: string;
}

export const AddressSchema = SchemaFactory.createForClass(Address);
