import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CoreModule } from 'src/core/core.module';

@Module({
  imports: [CoreModule],
  providers: [TasksService],
})
export class TasksModule {}
