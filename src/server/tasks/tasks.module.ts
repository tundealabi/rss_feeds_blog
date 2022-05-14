import { Global, Module } from '@nestjs/common';
import { ManageModule } from '../manage/manage.module';
import { RssFeedModule } from '../rss-feed/rss-feed.module';
import { TasksService } from './tasks.service';

@Global()
@Module({
  imports: [RssFeedModule, ManageModule],
  providers: [TasksService],
  exports: [TasksService],
})
export class TasksModule {}
