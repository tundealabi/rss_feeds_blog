import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RssFeed, RssFeedSchema } from './schema';
import { RssFeedService } from './rss-feed.service';
import { RssFeedController } from './rss-feed.controller';
import { RssParserModule } from '../rss-parser/rss-parser.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: RssFeed.name, schema: RssFeedSchema }]),
    RssParserModule,
  ],
  providers: [RssFeedService],
  controllers: [RssFeedController],
})
export class RssFeedModule {}
