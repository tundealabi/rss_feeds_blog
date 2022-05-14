import { Body, Controller, Get, Patch } from '@nestjs/common';
import { SetPollingFrequencyDto, SetPreviewLengthDto } from './dto';
import { ManageService } from './manage.service';

@Controller('manage')
export class ManageController {
  constructor(private readonly manageService: ManageService) {}
  @Patch('/set-polling-frequency')
  async setPollingFrequency(@Body() dto: SetPollingFrequencyDto): Promise<any> {
    return this.manageService.setPollingFrequency(dto);
  }
  @Patch('/set-preview-length')
  async setPreviewLength(@Body() dto: SetPreviewLengthDto): Promise<any> {
    return this.manageService.setPreviewLength(dto);
  }
  @Get('/')
  async getManageData(): Promise<any> {
    return this.manageService.getManageData();
  }
}
