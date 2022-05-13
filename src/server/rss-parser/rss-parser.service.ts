import { BadRequestException, Injectable } from '@nestjs/common';
import * as Parser from 'rss-parser';

@Injectable()
export class RssParserService {
  async parse(url: string) {
    // type CustomFeed = { foo: string };
    // type CustomItem = { bar: number };
    try {
      const parser: Parser = new Parser();
      const feed = await parser.parseURL(url);
      return {
        feedUrl: url,
        ...feed,
      };
    } catch (error) {
      throw new BadRequestException(
        'could not read url. did you provide a valid rss feed url?',
      );
    }
  }
  formatFeed(feed: Parser.Output<{ [key: string]: any }>) {
    return {
      feedUrl: feed.feedUrl || feed.paginationLinks.self,
      title: feed.title,
      link: feed.link,
      image: feed.image.url,
      items: feed.items
        .map((item) => ({
          title: item.title,
          description: item.content,
          link: item.link || feed.link,
          image: item.enclosure?.url || '',
          publishedDate: item.pubDate,
          isRead: item.isRead || false,
        }))
        .sort(
          (a, b) => Date.parse(b.publishedDate) - Date.parse(a.publishedDate),
        ),
    };
  }
}
