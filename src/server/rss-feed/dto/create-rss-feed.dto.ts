import { IsUrl } from 'class-validator';

export class CreateRssFeedDto {
  @IsUrl(
    {},
    {
      message: 'The url is not valid',
    },
  )
  feedUrl: string;
}
