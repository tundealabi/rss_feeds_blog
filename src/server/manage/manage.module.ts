import { Module } from '@nestjs/common';
import { ManageService } from './manage.service';
import { ManageController } from './manage.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Manage, ManageSchema } from './schema';
import { PollingFrequencyUpdatedListener } from './listeners';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Manage.name, schema: ManageSchema }]),
  ],
  providers: [ManageService, PollingFrequencyUpdatedListener],
  controllers: [ManageController],
  exports: [ManageService],
})
export class ManageModule {}
