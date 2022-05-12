import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RssFeed, RssFeedSchema } from './schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: RssFeed.name, schema: RssFeedSchema }]),
  ],
})
export class RssFeedModule {}
