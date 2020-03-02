import { Injectable, ForbiddenException } from '@nestjs/common';
import { SlotService } from 'src/core/slot/slot.service';
import { UserPayload } from './auth/strategies/jwt.strategy';
import { UpdateSlotDto } from './resource/dto/update-slot.dto';
import { ParkService } from 'src/core/park/park.service';
import { CreateSlotDto } from './resource/dto/create-slot.dto';
import { ParkingService } from 'src/core/parking/parking.service';
import { UpdateParkDto } from './resource/dto/update-park.dto';
import { BookingService } from 'src/core/booking/booking.service';
import { InvoiceService } from 'src/core/invoice/invoice.service';
import { DriverService } from 'src/core/driver/driver.service';
import { ManagerService } from 'src/core/manager/manager.service';

@Injectable()
export class AdminService {
  constructor(
    private readonly slotService: SlotService,
    private readonly parkService: ParkService,
    private readonly parkingService: ParkingService,
    private readonly bookingService: BookingService,
    private readonly invocieService: InvoiceService,
    private readonly driverService: DriverService,
    private readonly managerService: ManagerService,
  ) {}

  async createSlot(user: UserPayload, data: CreateSlotDto) {
    if (user.role === 'admin') {
      return this.slotService.createSlot(data);
    }
  }

  async deleteOneSlot(user: UserPayload, slotId: string) {
    if (user.role === 'admin') {
      return this.slotService.deleteOne(slotId);
    }
  }

  async getListSlot(user: UserPayload, ids: string = undefined) {
    if (ids) {
      if (user.role === 'admin') {
        const idsString = ids.split(',');
        return this.slotService.getMany(idsString);
      }
    } else {
      if (user.role === 'admin') {
        return this.slotService.getAllSlot();
      }

      return this.slotService.getAllSlotFromManagerId('1');
    }
  }

  async getOneSlot(user: UserPayload, slotId: string) {
    if (user.role === 'admin') {
      return this.slotService.getOne(slotId);
    }
  }

  async updateOneSlot(user: UserPayload, slotId: string, dto: UpdateSlotDto) {
    if (user.role === 'admin') {
      return this.slotService.updateOne(slotId, dto);
    }
  }

  // Park
  async getListPark(user: UserPayload, ids: string = undefined) {
    if (ids) {
      if (user.role === 'admin') {
        const idsString = ids.split(',');
        return this.parkService.getMany(idsString);
      }

      // TODO:: manager
    } else {
      if (user.role === 'admin') {
        return this.parkService.getList();
      }

      // TODO:: manager
    }
  }

  async getOnePark(user: UserPayload, id: string) {
    if (user.role === 'admin') {
      return this.parkService.getOne(id);
    }
    // TODO:: manager
  }

  async updateOnePark(user: UserPayload, slotId: string, dto: UpdateParkDto) {
    if (user.role === 'admin') {
      return this.parkService.updateOne(slotId, dto);
    }
    throw new ForbiddenException();
  }

  async createPark(user: UserPayload, data: CreateSlotDto) {
    if (user.role === 'admin') {
      return this.parkService.createOne(data);
    }
    throw new ForbiddenException();
  }

  async deleteOnePark(user: UserPayload, slotId: string) {
    if (user.role === 'admin') {
      return this.parkService.deleteOne(slotId);
    }
    throw new ForbiddenException();
  }

  // Booking
  async getListBooking(user: UserPayload, ids: string = undefined) {
    if (ids) {
      if (user.role === 'admin') {
        const idsString = ids.split(',');
        return this.bookingService.getMany(idsString);
      }

      // TODO:: manager
    } else {
      if (user.role === 'admin') {
        return this.bookingService.getList();
      }

      // TODO:: manager
    }
  }

  // Invoice
  async getListInvoice(user: UserPayload, ids: string = undefined) {
    if (ids) {
      if (user.role === 'admin') {
        const idsString = ids.split(',');
        return this.invocieService.getMany(idsString);
      }

      // TODO:: manager
    } else {
      if (user.role === 'admin') {
        return this.invocieService.getList();
      }

      // TODO:: manager
    }
  }

  // Driver
  async getListDriver(user: UserPayload, ids: string = undefined) {
    if (ids) {
      if (user.role === 'admin') {
        const idsString = ids.split(',');
        return this.driverService.getMany(idsString);
      }

      // TODO:: manager
    } else {
      if (user.role === 'admin') {
        return this.driverService.getList();
      }

      // TODO:: manager
    }
  }

  // Managr
  async getListManager(user: UserPayload, ids: string = undefined) {
    if (ids) {
      if (user.role === 'admin') {
        const idsString = ids.split(',');
        return this.managerService.getMany(idsString);
      }

      // TODO:: manager
    } else {
      if (user.role === 'admin') {
        return this.managerService.getList();
      }

      // TODO:: manager
    }
  }
}
