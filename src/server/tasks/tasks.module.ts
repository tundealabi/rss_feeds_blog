import { Module } from '@nestjs/common';
import { RssFeedModule } from '../rss-feed/rss-feed.module';
import { TasksService } from './tasks.service';

@Module({
  imports: [RssFeedModule],
  providers: [TasksService],
})
export class TasksModule {}
