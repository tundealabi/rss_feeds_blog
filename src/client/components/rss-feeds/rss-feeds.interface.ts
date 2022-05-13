import { IRssFeedItem } from '../rss-feed-item/rss-feed-item.interface';

export interface IRssFeeds {
  _id: string;
  createdAt: string;
  feedUrl: string;
  image: string;
  items: IRssFeedItem[];
  link: string;
  title: string;
}
