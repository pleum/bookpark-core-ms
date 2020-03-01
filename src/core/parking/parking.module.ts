import { Module } from '@nestjs/common';
import { ParkingService } from './parking.service';
import { ParkingSchema } from './schemas/parking.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Parking', schema: ParkingSchema }]),
  ],
  providers: [ParkingService],
  exports: [ParkingService],
})
export class ParkingModule {}
