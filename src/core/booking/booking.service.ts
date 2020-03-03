import {
  Injectable,
  NotFoundException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Booking } from './interfaces/booking.interface';
import { InvoiceService } from '../invoice/invoice.service';
import { Activity } from '../activity/interfaces/activity.interface';
import { ReactAdminCrud } from 'src/admin/react-admin-crud.service';

@Injectable()
export class BookingService extends ReactAdminCrud<Booking> {
  constructor(
    @InjectModel('Booking') private readonly bookingModel: Model<Booking>,
    @Inject(forwardRef(() => InvoiceService))
    private readonly invoiceService: InvoiceService,
  ) {
    super(bookingModel);
  }

  async bookingWithActivity(activity: Activity): Promise<Booking> {
    const { id, park, slot, driver } = activity;

    const booking = await new this.bookingModel({
      activity: id,
      driver,
      totalPrice: park.bookingPrice,
    }).save();

    const invoice = await this.invoiceService.createInvoiceFromBooking(
      driver.id,
      booking,
    );

    const updatedBooking = await this.bookingModel
      .findOneAndUpdate({ _id: booking.id }, { invoice: invoice.id })
      .exec();

    return updatedBooking;
  }

  async updateTimeoutBooking(): Promise<any> {
    const currentTime = new Date();
    const timeoutBookings = await this.bookingModel
      .find({
        status: 'BOOKED',
        bookingEndedAt: { $lt: currentTime },
      })
      .populate({
        path: 'activity',
        populate: {
          path: 'slot',
        },
      });

    const updatedPromises = timeoutBookings.map(async booking => {
      await booking.updateOne({ status: 'TIMEOUT' });
      await booking.activity.updateOne({ status: 'FINISH' });
      await booking.activity.slot.updateOne({ status: 'AVAILABLE' });
    });

    await Promise.resolve(updatedPromises);
  }

  async getListFromActivitys(activityIds: string[]): Promise<Booking[] | null> {
    return this.model
      .find({ activity: { $in: activityIds } })
      .populate({ path: 'driver', select: 'name' })
      .lean()
      .exec();
  }
}
