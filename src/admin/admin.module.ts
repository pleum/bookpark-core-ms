import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from 'src/core/core.module';
import { ResourceController } from './resource/resource.controller';

@Module({
  controllers: [AdminController, ResourceController],
  providers: [AdminService],
  imports: [AuthModule, CoreModule],
})
export class AdminModule {}
