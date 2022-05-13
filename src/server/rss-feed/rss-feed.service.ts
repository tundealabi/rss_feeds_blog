import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { RssFeed, RssFeedDocument } from './schema';
import { CreateRssFeedDto } from './dto';

@Injectable()
export class RssFeedService {
  constructor(
    @InjectModel(RssFeed.name) private rssFeedModel: Model<RssFeedDocument>,
  ) {}
  async create(createRssFeedDto: CreateRssFeedDto): Promise<RssFeed> {
    const createdCat = await this.rssFeedModel.create({
      ...createRssFeedDto,
      feeds: [],
    });
    return createdCat;
  }
  async getAll(): Promise<RssFeed[]> {
    const rssFeeds = await this.rssFeedModel.find().exec();
    return rssFeeds;
  }
  async deleteById(id: string): Promise<{ id: string; success: boolean }> {
    const deletedRssFeed = await this.rssFeedModel.findByIdAndRemove(id);
    return {
      id: deletedRssFeed.id,
      success: !!deletedRssFeed,
    };
  }
}
