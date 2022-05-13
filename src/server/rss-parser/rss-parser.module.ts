import { Module } from '@nestjs/common';
import { RssParserService } from './rss-parser.service';
import { RssParserController } from './rss-parser.controller';

@Module({
  providers: [RssParserService],
  controllers: [RssParserController],
  exports: [RssParserService],
})
export class RssParserModule {}
