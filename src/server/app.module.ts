import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ViewModule } from './view/view.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ViewModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
