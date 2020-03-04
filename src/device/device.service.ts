import { Injectable, NotFoundException } from '@nestjs/common';
import { SlotService } from 'src/core/slot/slot.service';
import { ActivityService } from 'src/core/activity/activity.service';

@Injectable()
export class DeviceService {
  constructor(
    private readonly slotService: SlotService,
    private readonly activityService: ActivityService,
  ) {}

  async update(slotId: string, isDetected: boolean): Promise<any> {
    const slot = await this.slotService.getOneSlotFromId(slotId);

    if (slot === null) {
      throw new NotFoundException('slot not found');
    }

    if (slot.isDetected === isDetected) {
      return;
    }

    await slot.updateOne({
      isDetected: isDetected,
    });

    if (isDetected && slot.gate === 'OPEN') {
      return await this.activityService.startParking(slotId);
    } else if (!isDetected && slot.gate === 'OPEN') {
      console.log('dadw');
      return await this.activityService.finishActivity(slotId);
    }
  }
}
