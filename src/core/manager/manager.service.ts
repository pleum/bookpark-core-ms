import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Manager } from './interfaces/manager.interface';
import { ReactAdminCrud } from 'src/admin/react-admin-crud.service';

@Injectable()
export class ManagerService extends ReactAdminCrud<Manager> {
  constructor(
    @InjectModel('Manager') private readonly managerModel: Model<Manager>,
  ) {
    super(managerModel);
  }

  async findOne(email: string): Promise<Manager | null> {
    return this.managerModel
      .findOne({ email })
      .lean()
      .exec();
  }
}
