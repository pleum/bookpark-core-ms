import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LiffService } from './liff.service';
import { LiffController } from './liff.controller';
import { LineModule } from 'src/line/line.module';
import { CoreModule } from 'src/core/core.module';

@Module({
  imports: [ConfigModule, LineModule, CoreModule],
  providers: [LiffService],
  controllers: [LiffController],
})
export class LiffModule {}
