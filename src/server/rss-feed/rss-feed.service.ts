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
  async patchFeedItem(
    id: string,
    itemId: string,
  ): Promise<{ id: string; success: boolean }> {
    await this.rssFeedModel.findOneAndUpdate(
      { _id: id, 'items._id': itemId },
      {
        $set: {
          'items.$.isRead': true,
        },
      },
    );
    return {
      id,
      success: true,
    };
  }
  async pollRssFeeds(): Promise<void> {
    const rssLinks = await this.rssFeedModel
      .find({})
      .select(['feedUrl', 'items']);
    rssLinks.forEach(async (rssLink) => {
      try {
        const rssFeed = await this.rssParserService.parse(rssLink.feedUrl);
        rssFeed.items.map((item) => {
          const findRssItem = rssLink.items.find(
            (rssItem) =>
              rssItem.title === item.title &&
              rssItem.publishedDate === item.pubDate &&
              rssItem.isRead,
          );
          if (findRssItem) {
            item.isRead = true;
          }
          return item;
        });
        const formatRssFeeds = this.rssParserService.formatFeed(rssFeed);
        await this.rssFeedModel.findByIdAndUpdate(rssLink.id, formatRssFeeds);
        // eslint-disable-next-line no-console
        console.log('successfully polled and updated rss feed');
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log('error', error.message);
      }
    });
  }
}
