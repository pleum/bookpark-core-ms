import { Injectable } from '@nestjs/common';
import { Activity } from '../activity/interfaces/activity.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Parking } from './interfaces/parking.interface';
import { add, differenceInMinutes } from 'date-fns';
import { ReactAdminCrud } from 'src/admin/react-admin-crud.service';

@Injectable()
export class ParkingService extends ReactAdminCrud<Parking> {
  constructor(
    @InjectModel('Parking') private readonly parkingModel: Model<Parking>,
  ) {
    super(parkingModel);
  }

  async startParkingFromActivity(activity: Activity): Promise<Parking> {
    const currentTime = new Date();

    const freeParkingEndAt = add(currentTime, {
      minutes: activity.park.freeParkingMinutes || 1,
    });

    const parking = new this.parkingModel({
      activity: activity.id,
      driver: activity.driver,
      parkingAt: currentTime,
      freeParkingEndAt,
    }).save();

    return parking;
  }

  async getOneById(parkingId: string): Promise<Parking> {
    return this.parkingModel.findById(parkingId).exec();
  }

  async getAll(): Promise<Parking[] | null> {
    return this.parkingModel.find({}).exec();
  }

  async updateEndFree() {
    const currentTime = new Date();
    const endFreeParkigs = await this.parkingModel
      .find({
        status: 'PARKED',
        freeParkingEndAt: { $lt: currentTime },
      })
      .lean()
      .exec();

    const endFreeParkigIds = endFreeParkigs.map(p => p._id);
    const updatedPromises = endFreeParkigIds.map(async id => {
      const parking = await this.parkingModel
        .findByIdAndUpdate(id, { status: 'PARKED_END_FREETIME' }, { new: true })
        .populate({ path: 'activity', populate: { path: 'slot' } })
        .exec();

      await parking.activity.slot.updateOne({
        gate: 'BLOCK',
      });

      return 'success';
    });
    await Promise.resolve(updatedPromises);
  }

  async calculatedEndFreePrice() {
    const endFreeParkigs = await this.parkingModel
      .find({
        status: 'PARKED_END_FREETIME',
      })
      .populate({ path: 'activity', populate: { path: 'park' } })
      .lean()
      .exec();

    const endFreeParkigIds = endFreeParkigs.map(p => ({
      id: p._id,
      pricePerMintute: p.activity.park.parkingPricePerMinute,
      endFreeAt: p.freeParkingEndAt,
    }));

    const currentTime = new Date();
    const updatedPromises = endFreeParkigIds.map(
      ({ id, pricePerMintute, endFreeAt }) => {
        const minituts = differenceInMinutes(currentTime, endFreeAt);
        const price = Math.round(minituts * 1.0 * pricePerMintute);

        return this.parkingModel
          .findByIdAndUpdate(id, {
            calculatedPrice: price,
            calculatedPriceAt: currentTime,
          })
          .exec();
      },
    );
    const result = await Promise.resolve(updatedPromises);
  }

  async createExtendPaidParking() {
    const currentTime = new Date();
    const endFreeParkigs = await this.parkingModel
      .find({
        status: 'PARKED_PAID',
        parkingEndedAt: { $lt: currentTime },
      })
      .populate({ path: 'activity', populate: { path: 'park' } })
      .exec();

    const promises = endFreeParkigs.map(async p => {
      await p
        .updateOne({
          status: 'EXTEND',
        })
        .exec();

      const parking = await new this.parkingModel({
        activity: p.activity.id,
        driver: p.activity.driver,
        parkingAt: currentTime,
        freeParkingEndAt: currentTime,
      }).save();

      await p.activity
        .updateOne({
          currentParking: parking.id,
        })
        .exec();

      return 'success';
    });
    const result = await Promise.resolve(promises);
    console.log(result);
  }

  async getListFromActivitys(activityIds: string[]): Promise<Parking[] | null> {
    return this.model
      .find({ activity: { $in: activityIds } })
      .populate({ path: 'driver', select: 'name' })
      .lean()
      .exec();
  }
}
