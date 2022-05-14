import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SetPollingFrequencyDto, SetPreviewLengthDto } from './dto';
import { PollingFrequencyUpdatedEvent } from './events';
import { Manage, ManageDocument } from './schema';

@Injectable()
export class ManageService {
  constructor(
    @InjectModel(Manage.name) private manageModel: Model<ManageDocument>,
    private readonly eventEmitter: EventEmitter2,
  ) {}
  async setPollingFrequency(
    dto: SetPollingFrequencyDto,
  ): Promise<ManageDocument> {
    const manage = await this.manageModel.findOneAndUpdate(
      {},
      {
        pollingFrequency: dto.frequency,
      },
      {
        new: true,
        upsert: true,
      },
    );
    this.eventEmitter.emit(
      'polling-frequency.updated',
      new PollingFrequencyUpdatedEvent(manage.pollingFrequency),
    );
    return manage;
  }
  async setPreviewLength(dto: SetPreviewLengthDto): Promise<ManageDocument> {
    const manage = await this.manageModel.findOneAndUpdate(
      {},
      {
        previewLength: dto.previewLength,
      },
      {
        new: true,
        upsert: true,
      },
    );
    return manage;
  }
  async getManageData(): Promise<ManageDocument> {
    const manage = await this.manageModel.findOne({});
    return manage;
  }
}
