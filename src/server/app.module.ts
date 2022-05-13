import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ViewModule } from './view/view.module';
import { RssFeedModule } from './rss-feed/rss-feed.module';
import { RssParserModule } from './rss-parser/rss-parser.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          uri: configService.get('DATABASE_URI'),
        };
      },
    }),
    ViewModule,
    RssFeedModule,
    RssParserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
