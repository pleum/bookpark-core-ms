import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Driver } from './interfaces/driver.interface';

@Injectable()
export class DriverService {
  constructor(
    @InjectModel('Driver') private readonly driverModel: Model<Driver>,
  ) {}

  async getDriverByLineUserId(lineUserId: string): Promise<Driver | null> {
    return this.driverModel.findOne({ lineUserId }).exec();
  }

  async getDriverById(driverId: string): Promise<Driver | null> {
    return this.driverModel.findById(driverId).exec();
  }
}
