import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { TasksService } from '../../tasks/tasks.service';
import { PollingFrequencyUpdatedEvent } from '../events';

@Injectable()
export class PollingFrequencyUpdatedListener {
  constructor(private readonly taskService: TasksService) {}
  @OnEvent('polling-frequency.updated')
  async handlePollingFrequencyUpdatedEvent(
    event: PollingFrequencyUpdatedEvent,
  ) {
    await this.taskService.updateJob(event.pollingFrequency);
  }
}
