import { Injectable } from '@nestjs/common';
import { SlotService } from 'src/core/slot/slot.service';
import { UserPayload } from './auth/strategies/jwt.strategy';
import { UpdateSlotDto } from './resource/dto/update-slot.dto';
import { ParkService } from 'src/core/park/park.service';
import { CreateSlotDto } from './resource/dto/create-slot.dto';
import { ParkingService } from 'src/core/parking/parking.service';

@Injectable()
export class AdminService {
  constructor(
    private readonly slotService: SlotService,
    private readonly parkService: ParkService,
    private readonly parkingService: ParkingService,
  ) {}

  async createSlot(user: UserPayload, data: CreateSlotDto) {
    console.log('CREATE SLOT', user);
    if (user.role === 'admin') {
      return this.slotService.createSlot(data);
    }
  }

  async getSlots(user: UserPayload) {
    if (user.role === 'admin') {
      return this.slotService.getAllSlot();
    }

    return this.slotService.getAllSlotFromManagerId('1');
  }

  async getSlot(slotId: string) {
    return this.slotService.getOneSlotFromId(slotId);
  }

  async getSlotIds(slotIds: string[]) {
    return this.slotService.getSlotFromIds(slotIds);
  }

  async updateSlot(user: UserPayload, slotId: string, data: UpdateSlotDto) {
    return this.slotService.updateSlot(slotId, data);
  }

  async getParks() {
    return this.parkService.findAll();
  }

  async getPark(parkId: string) {
    return this.parkService.findOneById(parkId);
  }

  async getParksFromIds(parkIds: string[]) {
    return this.parkService.getAllFromIds(parkIds);
  }

  async getParkings() {
    return this.parkingService.getAll();
  }

}
