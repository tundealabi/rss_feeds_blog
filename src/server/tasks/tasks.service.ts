import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { RssFeedService } from '../rss-feed/rss-feed.service';

@Injectable()
export class TasksService {
  constructor(private readonly rssFeedService: RssFeedService) {}
  @Cron(CronExpression.EVERY_5_MINUTES)
  async pollRssFeedsCron() {
    await this.rssFeedService.pollRssFeeds();
  }
}
