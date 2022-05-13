import { BadRequestException, Injectable } from '@nestjs/common';
import * as Parser from 'rss-parser';

@Injectable()
export class RssParserService {
  async parse(url: string): Promise<any> {
    try {
      const parser = new Parser();
      return await parser.parseURL(url);
    } catch (error) {
      throw new BadRequestException(
        'could not read url. did you provide a valid rss feed url?',
      );
    }
  }
}
