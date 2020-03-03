import { Controller, Get } from '@nestjs/common';
import { ActivityService } from './core/activity/activity.service';

@Controller()
export class AppController {
  constructor(private readonly activityService: ActivityService) {}

  @Get('healthz')
  async healthcheck(): Promise<string> {
    return 'healthy';
  }
}
