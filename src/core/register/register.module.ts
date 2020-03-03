import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RegisterService } from './register.service';
import { RegisterSchema } from './schemas/register.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Register', schema: RegisterSchema }]),
  ],
  providers: [RegisterService],
  exports: [RegisterService],
})
export class RegisterModule {}
