import { Module, forwardRef } from '@nestjs/common';
import { ActivityService } from './activity.service';
import { ActivitySchema } from './schemas/activity.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { CoreModule } from '../core.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Activity', schema: ActivitySchema }]),
    forwardRef(() => CoreModule),
  ],
  providers: [ActivityService],
  exports: [ActivityService],
})
export class ActivityModule {}
