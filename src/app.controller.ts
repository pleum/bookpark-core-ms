import { Controller, Get } from '@nestjs/common';
import { ActivityService } from './core/activity/activity.service';

@Controller()
export class AppController {
  constructor(private readonly activityService: ActivityService) {}

  @Get('test')
  async test() {
    return this.activityService.createActivity(
      '5e515d86b83105db50e84892',
      '5e4fa5a922d161f767d464da',
      '5e4fe134d9338903a2811501',
    );
  }

  @Get('healthz')
  async healthcheck(): Promise<string> {
    return 'healthy';
  }
}
