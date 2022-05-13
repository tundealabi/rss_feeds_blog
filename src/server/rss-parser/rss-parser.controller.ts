import { Controller, Post, Body } from '@nestjs/common';
import { RssParserDto } from './dto';
import { RssParserService } from './rss-parser.service';

@Controller('rss-parser')
export class RssParserController {
  constructor(private readonly rssParserService: RssParserService) {}
  @Post()
  async parse(@Body() dto: RssParserDto): Promise<any> {
    return this.rssParserService.parse(dto.feedUrl);
  }
}
