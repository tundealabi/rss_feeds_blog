import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RssFeed, RssFeedSchema } from './schema';
import { RssFeedService } from './rss-feed.service';
import { RssFeedController } from './rss-feed.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: RssFeed.name, schema: RssFeedSchema }]),
  ],
  providers: [RssFeedService],
  controllers: [RssFeedController],
})
export class RssFeedModule {}
