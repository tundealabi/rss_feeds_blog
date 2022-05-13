import { BadRequestException, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { RssFeed, RssFeedDocument } from './schema';
import { CreateRssFeedDto } from './dto';
import { RssParserService } from '../rss-parser/rss-parser.service';

@Injectable()
export class RssFeedService {
  constructor(
    @InjectModel(RssFeed.name) private rssFeedModel: Model<RssFeedDocument>,
    private readonly rssParserService: RssParserService,
  ) {}
  async create(createRssFeedDto: CreateRssFeedDto): Promise<RssFeed> {
    try {
      const rssFeed = await this.rssParserService.parse(
        createRssFeedDto.feedUrl,
      );
      const formatRssFeeds = this.rssParserService.formatFeed(rssFeed);
      const createdRss = await this.rssFeedModel.create(formatRssFeeds);
      return createdRss;
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException(
          'this rss feed url exsist already. please use a different url.',
        );
      }
      return error.response;
    }
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
