import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ReactAdminCrud } from 'src/admin/react-admin-crud.service';
import { Request } from './interfaces/request.interface';

@Injectable()
export class RequestService extends ReactAdminCrud<Request> {
  constructor(
    @InjectModel('Request') private readonly requestModel: Model<Request>,
  ) {
    super(requestModel);
  }

  async getListRequestFromManager(
    managerId: string,
  ): Promise<Request[] | null> {
    return this.requestModel
      .find({ manager: managerId })
      .populate({ path: 'manager', select: 'email' })
      .populate({ path: 'attendant', select: 'email' })
      .lean()
      .exec();
  }
}
