import { Module } from '@nestjs/common';
import { InvoiceModule } from 'src/core/invoice/invoice.module';
import { BookingModule } from 'src/core/booking/booking.module';
import { DriverModule } from 'src/core/driver/driver.module';
import { ParkModule } from 'src/core/park/park.module';
import { ManagerModule } from './manager/manager.module';
import { SlotModule } from './slot/slot.module';
import { ParkingModule } from './parking/parking.module';
import { ActivityModule } from './activity/activity.module';
import { RequestModule } from './request/request.module';

@Module({
  imports: [
    InvoiceModule,
    BookingModule,
    DriverModule,
    ParkModule,
    ManagerModule,
    SlotModule,
    ParkingModule,
    ActivityModule,
    RequestModule,
  ],
  exports: [
    InvoiceModule,
    BookingModule,
    DriverModule,
    ParkModule,
    ManagerModule,
    SlotModule,
    ParkingModule,
    ActivityModule,
  ],
})
export class CoreModule {}
