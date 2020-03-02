import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Driver } from './interfaces/driver.interface';
import { ReactAdminCrud } from 'src/admin/react-admin-crud.service';

@Injectable()
export class DriverService extends ReactAdminCrud<Driver> {
  constructor(
    @InjectModel('Driver') private readonly driverModel: Model<Driver>,
  ) {
    super(driverModel);
  }

  async getDriverByLineUserId(lineUserId: string): Promise<Driver | null> {
    return this.driverModel.findOne({ lineUserId }).exec();
  }

  async getDriverById(driverId: string): Promise<Driver | null> {
    return this.driverModel.findById(driverId).exec();
  }
}
