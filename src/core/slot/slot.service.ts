import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Slot } from './interfaces/slot.interface';
import { UpdateSlotDto } from 'src/admin/resource/dto/update-slot.dto';
import { CreateSlotDto } from 'src/admin/resource/dto/create-slot.dto';
import { ReactAdminCrud } from 'src/admin/react-admin-crud.service';

@Injectable()
export class SlotService extends ReactAdminCrud<Slot> {
  constructor(@InjectModel('Slot') private readonly slotModel: Model<Slot>) {
    super(slotModel);
  }

  async bookingSlot(slotId: string): Promise<Slot> {
    const slot = await this.slotModel
      .findById(slotId)
      .populate('park')
      .exec();

    if (slot === null) {
      throw new NotFoundException('slot not found');
    }

    if (slot.status === 'UNAVAILABLE') {
      throw new NotAcceptableException(
        'this parking slot is unvailable for booking',
      );
    }

    await slot.updateOne({
      status: 'UNAVAILABLE',
    });

    return slot;
  }

  async getSlotsFromParkId(parkId: string): Promise<Slot[] | null> {
    return this.slotModel.find({ park: parkId }).exec();
  }

  async getAvailableSlotsFromParkId(parkId: string): Promise<Slot[] | null> {
    return this.slotModel.find({ park: parkId, status: 'AVAILABLE' }).exec();
  }

  async getOneSlotFromId(slotId: string): Promise<Slot> {
    return this.slotModel.findById(slotId).exec();
  }

  async getAllSlotFromManagerId(managerId: string): Promise<Slot[] | null> {
    return this.slotModel.find({ manager: managerId }).exec();
  }

  async getAllSlot(): Promise<Slot[] | null> {
    return this.slotModel.find({}).exec();
  }

  async updateSlot(slotId: string, data: UpdateSlotDto): Promise<Slot | null> {
    return this.slotModel
      .findOneAndUpdate(
        { _id: slotId },
        {
          ...data,
        },
      )
      .exec();
  }

  async createSlot(data: CreateSlotDto): Promise<Slot | null> {
    return new this.slotModel({ ...data }).save();
  }

  async getSlotFromIds(ids: string[]): Promise<Slot[] | null> {
    return this.slotModel.find({ _id: { $in: ids } }).exec();
  }

  async getListFromPark(parkId: string): Promise<Slot[] | null> {
    return this.slotModel
      .find({ park: parkId })
      .populate('park')
      .lean()
      .exec();
  }
}
