import {
  Injectable,
  NotFoundException,
  NotAcceptableException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LineSocialService } from 'src/line/line-social/line-social.service';
import { UserProfileResponseDto } from 'src/line/line-social/dto/user-profile-response.dto';
import { Park } from 'src/core/park/interfaces/park.interface';
import { Activity } from 'src/core/activity/interfaces/activity.interface';
import { ActivityService } from 'src/core/activity/activity.service';
import { ParkService } from 'src/core/park/park.service';
import { DriverService } from 'src/core/driver/driver.service';
import { Driver } from 'src/core/driver/interfaces/driver.interface';
import { SlotService } from 'src/core/slot/slot.service';
import { Slot } from 'src/core/slot/interfaces/slot.interface';
import { InvoiceService } from 'src/core/invoice/invoice.service';
import { ParkingService } from 'src/core/parking/parking.service';
import { RegisterDriverDto } from './dto/register-driver.dto';

@Injectable()
export class LiffService {
  constructor(
    private readonly configService: ConfigService,
    private readonly lineSocialService: LineSocialService,
    private readonly parkService: ParkService,
    private readonly parkingService: ParkingService,
    private readonly activityService: ActivityService,
    private readonly driverService: DriverService,
    private readonly slotService: SlotService,
    private readonly invoiceService: InvoiceService,
  ) {}

  async verifyLiffUser(
    accessToken: string,
  ): Promise<UserProfileResponseDto | null> {
    const verified = (
      await this.lineSocialService.verifyAccessToken(accessToken)
    ).data;

    if (
      verified.client_id !==
      this.configService.get<string>('LINE_LOGIN_CLIENT_ID')
    ) {
      return null;
    }

    const lineUser = (await this.lineSocialService.getUserProfile(accessToken))
      .data;

    return lineUser;
  }

  async getParks(): Promise<Park[]> {
    const parks = await this.parkService.findAll();

    if (parks.length === 0) {
      throw new NotFoundException('park not found');
    }

    return parks;
  }

  async getCurrentUserActivity(lineUserId: string): Promise<Activity | null> {
    return this.activityService.getUserActivity(lineUserId);
  }

  async getDriverInfo(lineUserId: string): Promise<Driver> {
    const driver = await this.driverService.getDriverByLineUserId(lineUserId);

    if (driver === null) {
      throw new NotFoundException('user not found');
    }

    return driver;
  }

  async getSlotsFromPark(parkId: string): Promise<Slot[]> {
    const slots = await this.slotService.getAvailableSlotsFromParkId(parkId);

    if (slots.length === 0) {
      throw new NotFoundException('slots not found');
    }

    return slots;
  }

  async booking(slotId: string, lineUserId: string) {
    const driver = await this.driverService.getDriverByLineUserId(lineUserId);
    const activity = await this.activityService.getUserActivity(lineUserId);

    if (activity) {
      throw new NotAcceptableException(
        'คุณไม่สามารถจองได้หลายที่ภายในเวลาเดียวกัน',
      );
    }

    const slot = await this.slotService.bookingSlot(slotId);

    return this.activityService.createActivity(
      driver.id,
      slot.park.id,
      slot.id,
    );
  }

  async toggleSlotGate(lineUserId: string) {
    const activity = await this.activityService.getUserActivity(lineUserId);

    if (activity.slot.gate === 'CLOSE') {
      await activity.slot.updateOne({
        gate: 'OPEN',
      });
    } else if (activity.slot.gate === 'OPEN') {
      await activity.slot.updateOne({
        gate: 'CLOSE',
      });
    }
  }

  async createPaymentParking(lineUserId: string): Promise<any> {
    const activity = await this.activityService.getUserActivity(lineUserId);

    if (activity.currentParking.status !== 'PARKED_END_FREETIME') {
      throw new NotAcceptableException(
        'only parking free time ended can create payment',
      );
    }

    const parking = await this.parkingService.getOneById(
      activity.currentParking._id,
    );

    const invoice = await this.invoiceService.createInvoiceFromParking(
      activity.driver.id,
      parking,
    );

    await parking.updateOne({
      invoice: invoice.id,
    });

    return { paymentUrl: invoice.paymentUrl };
  }

  async driverRegister(lineUserId: string, dto: RegisterDriverDto) {
    const driver = await this.driverService.getDriverByLineUserId(lineUserId);
    if (driver) {
      throw new NotAcceptableException();
    }
    return this.driverService.createOne({ ...dto, lineUserId });
  }

  async fetchDriver(lineUserId: string) {
    const driver = await this.driverService.getDriverByLineUserId(lineUserId);
    if (!driver) {
      throw new NotFoundException();
    }
    return driver;
  }

  async getSlotDetail(slotId: string) {
    return await this.slotService.getOne(slotId);
  }

  async getHistory(lineUserId: string) {
    const driver = await this.driverService.getDriverByLineUserId(lineUserId);
    return this.activityService.getHistroy(driver._id);
  }
}
