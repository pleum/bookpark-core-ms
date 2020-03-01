import { Injectable } from '@nestjs/common';
import { Activity } from '../activity/interfaces/activity.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Parking } from './interfaces/parking.interface';
import { add } from 'date-fns';

@Injectable()
export class ParkingService {
  constructor(
    @InjectModel('Parking') private readonly parkingModel: Model<Parking>,
  ) {}

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
}
