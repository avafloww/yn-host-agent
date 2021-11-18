import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {

  private appStartupTime = new Date();

  @Get()
  index() {
    const { appStartupTime } = this;
    return { appStartupTime };
  }
}
