import { IsUrl } from 'class-validator';

export class RssParserDto {
  @IsUrl()
  feedUrl: string;
}
