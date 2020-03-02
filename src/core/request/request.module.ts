import { Module } from '@nestjs/common';
import { RequestSchema } from './schemas/request.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { RequestService } from './request.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Request', schema: RequestSchema }]),
  ],
  providers: [RequestService],
  exports: [RequestService],
})
export class RequestModule {}
