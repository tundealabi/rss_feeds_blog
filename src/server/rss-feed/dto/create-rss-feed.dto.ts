import { IsUrl } from 'class-validator';

export class CreateRssFeedDto {
  @IsUrl()
  feedUrl: string;
}
