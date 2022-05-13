import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateRssFeedDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsUrl()
  link: string;
}
