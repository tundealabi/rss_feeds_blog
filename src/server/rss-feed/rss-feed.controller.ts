import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Param,
  Patch,
} from '@nestjs/common';
import { CreateRssFeedDto } from './dto';
import { RssFeedService } from './rss-feed.service';
import { RssFeed } from './schema';

@Controller('rss-feeds')
export class RssFeedController {
  constructor(private readonly rssFeedService: RssFeedService) {}
  @Post()
  create(@Body() dto: CreateRssFeedDto): Promise<RssFeed> {
    return this.rssFeedService.create(dto);
  }
  @Get()
  getAll(): Promise<RssFeed[]> {
    return this.rssFeedService.getAll();
  }
  @Delete(':id')
  delete(@Param('id') id: string): Promise<{ id: string; success: boolean }> {
    return this.rssFeedService.deleteById(id);
  }
  @Patch(':id/:itemId')
  patchFeedItem(
    @Param('id') id: string,
    @Param('itemId') itemId: string,
  ): Promise<{ id: string; success: boolean }> {
    return this.rssFeedService.patchFeedItem(id, itemId);
  }
}
