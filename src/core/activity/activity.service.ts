import {
  Injectable,
  Inject,
  forwardRef,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Activity } from './interfaces/activity.interface';
import { BookingService } from '../booking/booking.service';
import { DriverService } from '../driver/driver.service';
import { ParkingService } from '../parking/parking.service';

@Injectable()
export class ActivityService {
  constructor(
    @InjectModel('Activity') private readonly activityModel: Model<Activity>,
    @Inject(forwardRef(() => BookingService))
    private readonly bookingService: BookingService,
    @Inject(forwardRef(() => ParkingService))
    private readonly parkingService: ParkingService,
    @Inject(forwardRef(() => DriverService))
    private readonly driverService: DriverService,
  ) {}

  async createActivity(
    driverId: string,
    parkId: string,
    slotId: string,
  ): Promise<any> {
    const createdActivity = await new this.activityModel({
      driver: driverId,
      park: parkId,
      slot: slotId,
    }).save();

    const activity = await createdActivity
      .populate('driver')
      .populate('park')
      .populate('slot')
      .execPopulate();

    const booking = await this.bookingService.bookingWithActivity(activity);

    const updatedActivity = await this.activityModel
      .findOneAndUpdate(
        { _id: activity.id },
        { currentBooking: booking },
        { new: true },
      )
      .populate({
        path: 'currentBooking',
        select: 'status',
        populate: { path: 'invoice', select: 'paymentUrl status totalPrice' },
      })
      .populate({
        path: 'park',
      })
      .populate({
        path: 'slot',
      })
      .exec();

    return updatedActivity;
  }

  async getUserActivity(lineUserId: string): Promise<Activity> {
    const driver = await this.driverService.getDriverByLineUserId(lineUserId);

    const activity = await this.activityModel
      .findOne({
        status: { $ne: 'FINISH' },
        driver: driver.id,
      })
      .populate({
        path: 'currentBooking',
        select: 'status bookingEndedAt',
        populate: { path: 'invoice', select: 'paymentUrl status totalPrice' },
      })
      .populate({
        path: 'currentParking',
        select:
          'status freeParkingEndAt parkingAt calculatePriceAt calculatedPrice',
        populate: { path: 'invoice', select: 'paymentUrl status totalPrice' },
      })
      .populate({
        path: 'park',
      })
      .populate({
        path: 'slot',
      })
      .populate({
        path: 'driver',
      })
      .exec();

    return activity;
  }

  async startParking(slotId: string): Promise<any> {
    const activity = await this.activityModel
      .findOne({
        slot: slotId,
        status: 'BOOKED',
      })
      .populate('currentBooking')
      .exec();

    if (!activity) {
      throw new NotFoundException('activity not found');
    }

    const parking = await this.parkingService.startParkingFromActivity(
      activity,
    );

    if (!parking) {
      throw new NotFoundException('parking not found');
    }

    await activity.updateOne({
      status: 'PARKED',
      currentParking: parking.id,
    });

    await activity.currentBooking.updateOne({
      status: 'FINISH',
    });
  }

  async getListFromPark(parkId: string): Promise<Activity[] | null> {
    return this.activityModel.find({ park: parkId }).exec();
  }

  async finishActivity(slotId: string): Promise<any> {
    const actvity = await this.activityModel
      .findOne({ slot: slotId, status: 'PARKED' })
      .populate('currentParking')
      .populate('slot')
      .exec();

    // console.log(slotId, actvity);

    if (!actvity) {
      return;
    }

    if (
      actvity.currentParking.status === 'PARKED_PAID' ||
      actvity.currentParking.status === 'PARKED'
    ) {
      await actvity
        .updateOne({
          status: 'FINISH',
        })
        .exec();

      await actvity.slot
        .updateOne({
          status: 'AVAILABLE',
          gate: 'CLOSE',
        })
        .exec();

      await actvity.currentParking
        .updateOne({
          status: 'FINISH',
        })
        .exec();

      console.log('finish');
    }
  }
}
