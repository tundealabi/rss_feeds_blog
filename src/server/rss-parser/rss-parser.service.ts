import {
  BadRequestException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import * as Parser from 'rss-parser';

@Injectable()
export class RssParserService {
  async parse(url: string) {
    try {
      const parser: Parser = new Parser();
      const feed = await parser.parseURL(url);
      return {
        feedUrl: url,
        ...feed,
      };
    } catch (error) {
      if (error.message.includes('timed out')) {
        throw new RequestTimeoutException('took too long to parse the feed');
      }
      throw new BadRequestException(
        'could not parse url. did you provide a valid rss feed url?',
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
        .slice(0, 10)
        .map((item) => ({
          title: item.title,
          description: item.contentSnippet,
          link: item.link || feed.link,
          image: item.itunes?.image || feed.image.url,
          publishedDate: item.pubDate,
          isRead: item.isRead || false,
        }))
        .sort(
          (a, b) => Date.parse(b.publishedDate) - Date.parse(a.publishedDate),
        ),
    };
  }
}
