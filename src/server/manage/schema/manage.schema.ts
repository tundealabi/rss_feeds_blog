import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ManageDocument = Manage & Document;

@Schema({ timestamps: true })
export class Manage {
  @Prop({ default: '5' })
  pollingFrequency: string;

  @Prop({ default: '1' })
  previewLength: string;
}

export const ManageSchema = SchemaFactory.createForClass(Manage);
