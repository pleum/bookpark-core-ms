import { Injectable, NotFoundException } from '@nestjs/common';
import { SlotService } from 'src/core/slot/slot.service';
import { ActivityService } from 'src/core/activity/activity.service';
import { UpdateDeviceDTO } from './dto/update-device.dto';

@Injectable()
export class DeviceService {
  constructor(
    private readonly slotService: SlotService,
    private readonly activityService: ActivityService,
  ) {}

  async update(dto: UpdateDeviceDTO): Promise<any> {
    const slot = await this.slotService.getOneFromDeviceId(dto.deviceId);

    if (slot === null) {
      throw new NotFoundException('slot not found');
    }

    if (slot.isDetected === dto.isDetected) {
      return;
    }

    await slot.updateOne({
      isDetected: dto.isDetected,
    });

    if (dto.isDetected && slot.gate === 'OPEN') {
      return await this.activityService.startParking(slot._id);
    } else if (!dto.isDetected && slot.gate === 'OPEN') {
      return await this.activityService.finishActivity(slot._id);
    }
  }

  async fetch(): Promise<any> {
    return (await this.slotService.getList()).map(slot => ({
      deviceId: slot.deviceId,
      gate: slot.gate,
    }));
  }
}
