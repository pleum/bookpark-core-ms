import { Module } from '@nestjs/common';
import { ManagerService } from './manager.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ManagerSchema } from './schemas/manager.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Manager', schema: ManagerSchema }]),
  ],
  providers: [ManagerService],
  exports: [ManagerService],
})
export class ManagerModule {}
