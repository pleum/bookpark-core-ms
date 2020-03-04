import { Controller, Get, Body, Post } from '@nestjs/common';
import { DeviceService } from './device.service';
import { UpdateDeviceDTO } from './dto/update-device.dto';

@Controller('device')
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) {}

  @Post('update')
  async update(@Body() body: UpdateDeviceDTO): Promise<any> {
    return this.deviceService.update(body);
  }

  @Get('fetch')
  async fetch(): Promise<any> {
    return this.deviceService.fetch();
  }
}
