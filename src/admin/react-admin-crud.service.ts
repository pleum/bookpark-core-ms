import { Model, Document } from 'mongoose';

export class ReactAdminCrud<T extends Document> {
  constructor(public model: Model<T>) {}

  async getOne(id: string): Promise<T | null> {
    return this.model
      .findById(id)
      .populate('park')
      .lean()
      .exec();
  }

  async getList(): Promise<T[] | null> {
    return this.model
      .find({})
      .lean()
      .exec();
  }

  async getMany(ids: string[]): Promise<T[] | null> {
    return this.model.find({ _id: { $in: ids } }).exec();
  }

  async createOne(dto: any) {
    return new this.model({ ...dto }).save();
  }

  async updateOne(id: string, dto: any) {
    return this.model
      .findByIdAndUpdate(id, dto, {
        new: true,
        runValidators: true,
      })
      .exec();
  }

  async updateMany() {}

  async deleteOne(id: string): Promise<T> {
    return this.model.findByIdAndDelete(id).exec();
  }

  async deleteMany() {}
}
