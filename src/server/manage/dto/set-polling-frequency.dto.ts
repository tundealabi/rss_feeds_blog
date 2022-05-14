import { IsIn, IsNumberString } from 'class-validator';

export class SetPollingFrequencyDto {
  @IsNumberString()
  @IsIn(['5', '10', '15', '20', '25', '30'])
  frequency: string;
}
