import { Injectable, OnModuleInit } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import { ManageService } from '../manage/manage.service';
import { RssFeedService } from '../rss-feed/rss-feed.service';

@Injectable()
export class TasksService implements OnModuleInit {
  constructor(
    private readonly schedulerRegistry: SchedulerRegistry,
    private readonly manageService: ManageService,
    private readonly rssFeedService: RssFeedService,
  ) {}

  async updateJob(pollingFrequency: string) {
    this.schedulerRegistry.deleteCronJob('poll-rss-feed');
    await this.addCronJob(pollingFrequency);
  }
  async addCronJob(pollingFrequency: string) {
    const job = new CronJob(`0 */${pollingFrequency} * * * *`, async () => {
      await this.rssFeedService.pollRssFeeds();
    });
    this.schedulerRegistry.addCronJob('poll-rss-feed', job);
    job.start();
  }

  async onModuleInit() {
    const manage = await this.manageService.getManageData();
    if (manage) {
      await this.addCronJob(manage.pollingFrequency);
    }
  }
}
