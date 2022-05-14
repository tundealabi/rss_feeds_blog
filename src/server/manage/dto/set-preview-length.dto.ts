import { IsIn, IsNumberString } from 'class-validator';

export class SetPreviewLengthDto {
  @IsNumberString()
  @IsIn(['1', '2', '3', '4', '5', '6'])
  previewLength: string;
}
