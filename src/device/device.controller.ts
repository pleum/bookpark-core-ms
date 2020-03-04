import { Controller, Get, Param } from '@nestjs/common';
import { DeviceService } from './device.service';

@Controller('device')
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) {}

  @Get('update')
  async update(): Promise<any> {
    const slotId = '5e5b9f89cda78434b0141743';

    return this.deviceService.update(slotId, false);
  }
}
