import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RssFeedDocument = RssFeed & Document;

@Schema()
class FeedItem {
  @Prop({ required: true })
  title: string;
  @Prop({ required: true })
  description: string;
  @Prop({ default: '' })
  publishedDate: string;
  @Prop({ default: false })
  isRead: boolean;
  @Prop({ required: true, trim: true })
  link: string;
  @Prop({ required: true, trim: true })
  image: string;
}

@Schema({ timestamps: true })
export class RssFeed {
  @Prop({ lowercase: true, required: true, trim: true })
  title: string;

  @Prop({ required: true, trim: true, unique: true })
  link: string;

  @Prop({ required: true, trim: true })
  image: string;

  @Prop([FeedItem])
  items: FeedItem[];
}

export const RssFeedSchema = SchemaFactory.createForClass(RssFeed);
// export const RssFeedItemSchema = SchemaFactory.createForClass(Feed);
