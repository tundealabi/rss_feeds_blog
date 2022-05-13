import { Controller, Get, Post, Body, Delete, Param } from '@nestjs/common';
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
}
