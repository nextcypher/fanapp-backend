import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ValidateDocument = Document<Validate>;

@Schema()
export class Validate {
  @Prop()
  addressLines: string;

  @Prop()
  regionCode: string;
}

export const ValidateSchema = SchemaFactory.createForClass(Validate);