import { Controller, Get, Res, Req, Redirect } from '@nestjs/common';
import { Request, Response } from 'express';
import { ViewService } from './view.service';

@Controller('/')
export class ViewController {
  constructor(private viewService: ViewService) {}

  @Redirect()
  @Get()
  public async index() {
    return {
      url: '/following',
    };
  }
  @Get('following')
  public async showFollowing(@Req() req: Request, @Res() res: Response) {
    await this.viewService.handler(req, res);
  }
  @Get('following/manage')
  public async showManage(@Req() req: Request, @Res() res: Response) {
    await this.viewService.handler(req, res);
  }

  @Get('_next*')
  public async assets(@Req() req: Request, @Res() res: Response) {
    await this.viewService.handler(req, res);
  }

  @Get('favicon.ico')
  public async favicon(@Req() req: Request, @Res() res: Response) {
    await this.viewService.handler(req, res);
  }
}
