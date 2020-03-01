import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Manager } from './interfaces/manager.interface';

@Injectable()
export class ManagerService {
  constructor(
    @InjectModel('Manager') private readonly managerModel: Model<Manager>,
  ) {}

  async findOne(email: string): Promise<Manager | null> {
    return this.managerModel
      .findOne({ email })
      .lean()
      .exec();
  }
}
