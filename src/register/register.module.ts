import { Module } from '@nestjs/common';
import { RegisterController } from './register.controller';
import { CoreModule } from 'src/core/core.module';

@Module({
  imports: [CoreModule],
  controllers: [RegisterController],
})
export class RegisterModule {}
