import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BookingService } from './booking.service';
import { BookingSchema } from './schemas/booking.schema';
import { LinePayModule } from 'src/line/line-pay/line-pay.module';
import { CoreModule } from '../core.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Booking', schema: BookingSchema }]),
    forwardRef(() => CoreModule),
    forwardRef(() => LinePayModule),
  ],
  providers: [BookingService],
  exports: [BookingService],
})
export class BookingModule {}
