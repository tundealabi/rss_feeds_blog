import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppService } from './app.service';
import { ViewModule } from './view/view.module';
import { RssFeedModule } from './rss-feed/rss-feed.module';
import { RssParserModule } from './rss-parser/rss-parser.module';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksModule } from './tasks/tasks.module';
import { ManageModule } from './manage/manage.module';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    EventEmitterModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          uri: configService.get('DATABASE_URI'),
        };
      },
    }),
    ScheduleModule.forRoot(),
    ViewModule,
    RssFeedModule,
    RssParserModule,
    TasksModule,
    ManageModule,
  ],
  providers: [AppService],
})
export class AppModule {}
