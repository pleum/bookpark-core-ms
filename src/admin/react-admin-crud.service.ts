import { Model, Document } from 'mongoose';
import { Request } from 'express';

export class ReactAdminCrud<T extends Document> {
  constructor(public model: Model<T>) {}

  async getOne(req: Request): Promise<T | null> {
    return this.model
      .findOne()
      .lean()
      .exec();
  }

  async getList(req: Request): Promise<T[] | null> {
    return this.model
      .find({})
      .lean()
      .exec();
  }

  async getMany() {}

  async createOne() {
    return new this.model({}).save();
  }

  async updateOne(req: Request) {
    // const data = await this.model.findByIdAndUpdate(id, dto, {
    //   new: true,
    //   runValidators: true
    // })
  }

  async updateMany() {}

  async deleteOne() {}

  async deleteMany() {}
}
