import {
  Controller,
  UseGuards,
  Get,
  Param,
  Post,
  Body,
  HttpCode,
} from '@nestjs/common';
import { LiffGuard } from './guards/liff.guard';
import {
  CurrentUser,
  LineUserProfile,
} from './decorators/current-user.decorator';
import { LiffService } from './liff.service';
import { RegisterDriverDto } from './dto/register-driver.dto';
import { get } from 'http';

@Controller('liff')
@UseGuards(LiffGuard)
export class LiffController {
  constructor(private readonly liffService: LiffService) {}

  @Get('user')
  async getCurrentUserInfo(@CurrentUser() user: LineUserProfile): Promise<any> {
    return this.liffService.getDriverInfo(user.userId);
  }

  @Get('parks')
  async getParks(): Promise<any> {
    return this.liffService.getParks();
  }

  @Get('parks/:parkId/slots')
  async getSlotsFromPark(@Param('parkId') parkId: string): Promise<any> {
    return this.liffService.getSlotsFromPark(parkId);
  }

  @Get('activity')
  @HttpCode(200)
  async currentUserActivity(
    @CurrentUser() user: LineUserProfile,
  ): Promise<any> {
    return this.liffService.getCurrentUserActivity(user.userId);
  }

  @Post('booking')
  async booking(
    @CurrentUser() user: LineUserProfile,
    @Body() body,
  ): Promise<any> {
    return this.liffService.booking(body.slotId, user.userId);
  }

  @Post('toggle-gate')
  async toogleGate(@CurrentUser() user: LineUserProfile): Promise<any> {
    return this.liffService.toggleSlotGate(user.userId);
  }

  @Post('pay-parking')
  async createPaymentParking(
    @CurrentUser() user: LineUserProfile,
  ): Promise<any> {
    return this.liffService.createPaymentParking(user.userId);
  }

  @Post('register')
  async driverRegister(
    @CurrentUser() user: LineUserProfile,
    @Body() body: RegisterDriverDto,
  ) {
    return this.liffService.driverRegister(user.userId, body);
  }

  @Get('driver')
  async fetchDriver(@CurrentUser() user: LineUserProfile) {
    return this.liffService.fetchDriver(user.userId);
  }

  @Get('slots/:id')
  async getSlotDetail(@Param('id') slotId: string) {
    return this.liffService.getSlotDetail(slotId);
  }
}
