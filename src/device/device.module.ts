import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LineModule } from 'src/line/line.module';
import { CoreModule } from 'src/core/core.module';
import { DeviceController } from './device.controller';
import { DeviceService } from './device.service';

@Module({
  imports: [ConfigModule, LineModule, CoreModule],
  controllers: [DeviceController],
  providers: [DeviceService],
})
export class DeviceModule {}
