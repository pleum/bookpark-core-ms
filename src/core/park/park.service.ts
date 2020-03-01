import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Park } from './interfaces/park.interface';

@Injectable()
export class ParkService {
  constructor(@InjectModel('Park') private readonly parkModel: Model<Park>) {}

  async create(
    name: string,
    address: string,
    latitude: number,
    longitude: number,
  ): Promise<Park> {
    const park = new this.parkModel({
      name: name,
      address: address,
      location: {
        type: 'Point',
        coordinates: [latitude, longitude],
      },
    });
    return park.save();
  }

  async findAll(): Promise<Park[] | null> {
    return this.parkModel.find().exec();
  }

  async getAllParkWithSlotDetails(): Promise<any> {
    return this.parkModel
      .aggregate([
        {
          $lookup: {
            from: 'slots',
            localField: '_id',
            foreignField: 'park',
            as: 'slots',
          },
        },
        {
          $unset: [
            '__v',
            'createdAt',
            'updatedAt',
            'slots.park',
            'slots.gate',
            'slots.deviceId',
            'slots.updatedAt',
            'slots.createdAt',
            'slots.__v',
          ],
        },
      ])
      .exec();
  }

  async findOneById(parkId: string): Promise<Park | null> {
    return this.parkModel.findById(parkId).exec();
  }

  async getAllFromIds(parkIds: string[]): Promise<Park[] | null> {
    return this.parkModel.find({ _id: { $in: parkIds } }).exec();
  }
}
