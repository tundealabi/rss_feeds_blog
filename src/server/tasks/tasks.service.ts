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
    // stop the current job and add a new one whenever the polling frequency is updated
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
    // get the polling frequency from the database on initilization to add the cron job
    const manage = await this.manageService.getManageData();
    if (manage) {
      await this.addCronJob(manage.pollingFrequency);
    }
  }
}
