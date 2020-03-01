import { Controller, Get } from '@nestjs/common';
import { DeviceService } from './device.service';

@Controller('device')
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) {}

  @Get('update')
  async update(): Promise<any> {
    const slotId = '5e4fe134d9338903a2811501';
    const isDetected = true
    
    return this.deviceService.update(slotId, isDetected);
  }
}
