import { BadRequestException, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { RssFeed, RssFeedDocument } from './schema';
import { CreateRssFeedDto } from './dto';
import { RssParserService } from '../rss-parser/rss-parser.service';
import { ManageService } from '../manage/manage.service';

@Injectable()
export class RssFeedService {
  constructor(
    @InjectModel(RssFeed.name) private rssFeedModel: Model<RssFeedDocument>,
    private readonly manageService: ManageService,
    private readonly rssParserService: RssParserService,
  ) {}
  async create(createRssFeedDto: CreateRssFeedDto): Promise<RssFeed> {
    try {
      // parse the xml
      const rssFeed = await this.rssParserService.parse(
        createRssFeedDto.feedUrl,
      );
      // filter needed properties
      const formatRssFeeds = this.rssParserService.formatFeed(rssFeed);
      // create the rss feed - save to the DB
      const createdRss = await this.rssFeedModel.create(formatRssFeeds);
      return createdRss;
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException(
          'this rss feed url exsist already. please use a different url.',
        );
      }
      throw error;
    }
  }
  async getAll(): Promise<RssFeed[]> {
    // get all rss feeds stored in the DB
    const rssFeeds = await this.rssFeedModel.find().exec();
    // get the manage data - polling frequency and preview length
    const manage = await this.manageService.getManageData();
    // use the preview length to limit the number of items to be displayed
    return rssFeeds.map((rssFeed) => {
      rssFeed.items = rssFeed.items.slice(0, Number(manage.previewLength));
      return rssFeed;
    });
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
    // mark a feed item as read
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
    // get all rss feeds stored in the DB
    const rssLinks = await this.rssFeedModel
      .find({})
      .select(['feedUrl', 'items']);
    rssLinks.forEach(async (rssLink) => {
      try {
        // parse the xml to get updated feed items
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
        // filter needed properties
        const formatRssFeeds = this.rssParserService.formatFeed(rssFeed);
        // update the rss feed with the new items if any
        await this.rssFeedModel.findByIdAndUpdate(rssLink.id, formatRssFeeds);
        // eslint-disable-next-line no-console
        console.log(
          'successfully polled and updated rss feed ' + rssLink.feedUrl,
        );
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log('error', error.message);
      }
    });
  }
}
