import {
  Injectable,
  ForbiddenException,
  NotAcceptableException,
} from '@nestjs/common';
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
import { RequestService } from 'src/core/request/request.service';
import { CreateRequestDto } from './resource/dto/create-request.dto';
import { RegisterService } from 'src/core/register/register.service';
import { ActivityService } from 'src/core/activity/activity.service';

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
    private readonly requestService: RequestService,
    private readonly registerService: RegisterService,
    private readonly activityService: ActivityService,
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
        return this.slotService.getList();
      } else if (user.role === 'manager') {
        const park = await this.parkService.getParkFromManagerId(user.userId);
        return this.slotService.getListFromPark(park._id);
      }
      throw new ForbiddenException();
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
      } else if (user.role === 'manager') {
        const park = await this.parkService.getParkFromManagerId(user.userId);
        const activitys = await this.activityService.getListFromPark(park._id);
        const activityIds = activitys.map(a => a._id);
        return this.bookingService.getListFromActivitys(activityIds);
      }
    }
  }

  // Parking
  async getListParking(user: UserPayload, ids: string = undefined) {
    if (ids) {
      if (user.role === 'admin') {
        const idsString = ids.split(',');
        return this.parkingService.getMany(idsString);
      }

      // TODO:: manager
    } else {
      if (user.role === 'admin') {
        return this.parkingService.getList();
      } else if (user.role === 'manager') {
        const park = await this.parkService.getParkFromManagerId(user.userId);
        const activitys = await this.activityService.getListFromPark(park._id);
        const activityIds = activitys.map(a => a._id);
        return this.parkingService.getListFromActivitys(activityIds);
      }
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
      } else if (user.role === 'manager') {
        const park = await this.parkService.getParkFromManagerId(user.userId);
        const activitys = await this.activityService.getListFromPark(park._id);
        const activityIds = activitys.map(a => a._id);
        return this.invocieService.getListFromActivitys(activityIds);
      }
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
      // if (user.role === 'admin') {
      const idsString = ids.split(',');
      return this.managerService.getMany(idsString);
      // }

      // TODO:: manager
    } else {
      if (user.role === 'admin') {
        return this.managerService.getList();
      }

      // TODO:: manager
    }
  }

  async getOneManager(user: UserPayload, id: string) {
    if (user.role === 'admin') {
      return this.managerService.getOne(id);
    }
    // TODO:: manager
  }

  // Request
  async getListRequest(user: UserPayload, ids: string = undefined) {
    if (ids) {
      if (user.role === 'admin') {
        const idsString = ids.split(',');
        return this.requestService.getMany(idsString);
      }

      // TODO:: manager
    } else {
      if (user.role === 'admin') {
        return this.requestService.getList();
      } else if (user.role === 'manager') {
        return this.requestService.getListRequestFromManager(user.userId);
      }
    }
  }

  async getOneRequest(user: UserPayload, id: string) {
    if (user.role === 'admin') {
      return this.requestService.getOne(id);
    }
    // TODO:: manager
  }

  async createRequest(user: UserPayload, data: CreateRequestDto) {
    return this.requestService.createOne({ ...data, manager: user.userId });
  }

  async approvedRequest(user: UserPayload, id: string) {
    if (user.role === 'admin') {
      const request = await this.requestService.getOne(id);
      if (request.status !== 'PENDING') {
        throw new NotAcceptableException();
      }
      return await this.requestService.updateOne(id, {
        status: 'APPROVED',
        attendant: user.userId,
      });
    }
    // TODO:: manager
  }

  async rejectRequest(user: UserPayload, id: string) {
    if (user.role === 'admin') {
      const request = await this.requestService.getOne(id);
      if (request.status !== 'PENDING') {
        throw new NotAcceptableException();
      }
      return await this.requestService.updateOne(id, {
        status: 'REJECT',
        attendant: user.userId,
      });
    }
    // TODO:: manager
  }

  // Request
  async getListRegister(user: UserPayload, ids: string = undefined) {
    if (ids) {
      if (user.role === 'admin') {
        const idsString = ids.split(',');
        return this.registerService.getMany(idsString);
      }

      // TODO:: manager
    } else {
      if (user.role === 'admin') {
        return this.registerService.getList();
      }

      // TODO:: manager
    }
  }

  async getOneRegister(user: UserPayload, id: string) {
    if (user.role === 'admin') {
      return this.registerService.getOne(id);
    }
    // TODO:: manager
  }

  async approvedRegister(user: UserPayload, id: string) {
    if (user.role === 'admin') {
      const register = await this.registerService.getOne(id);

      if (register.status !== 'PENDING') {
        throw new NotAcceptableException();
      }

      const manager = await this.managerService.convertToManager(register);
      await this.registerService.updateOne(id, { status: 'APPROVED' });

      return manager;
    }
    // TODO:: manager
  }

  async rejectRegister(user: UserPayload, id: string) {
    if (user.role === 'admin') {
      const register = await this.registerService.getOne(id);

      if (register.status !== 'PENDING') {
        throw new NotAcceptableException();
      }

      return await this.registerService.updateOne(id, { status: 'REJECT' });
    }
    // TODO:: manager
  }
}
