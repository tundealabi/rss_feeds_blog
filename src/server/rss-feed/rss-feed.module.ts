import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RssFeed, RssFeedSchema } from './schema';
import { RssFeedService } from './rss-feed.service';
import { RssFeedController } from './rss-feed.controller';
import { RssParserModule } from '../rss-parser/rss-parser.module';
import { ManageModule } from '../manage/manage.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: RssFeed.name, schema: RssFeedSchema }]),
    RssParserModule,
    ManageModule,
  ],
  providers: [RssFeedService],
  controllers: [RssFeedController],
  exports: [RssFeedService],
})
export class RssFeedModule {}
