import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ParkService } from './park.service';
import { ParkSchema } from './schemas/park.schemas';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Park', schema: ParkSchema }])],
  providers: [ParkService],
  exports: [ParkService],
})
export class ParkModule {}
