import {
  Controller,
  UseGuards,
  Get,
  Req,
  Param,
  Put,
  Body,
  Post,
  BadRequestException,
  Query,
  Delete,
} from '@nestjs/common';
import { AdminService } from '../admin.service';
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserPayload } from '../auth/strategies/jwt.strategy';
import { UpdateSlotDto } from './dto/update-slot.dto';
import { CreateSlotDto } from './dto/create-slot.dto';
import { UpdateParkDto } from './dto/update-park.dto';
import { CreateRequestDto } from './dto/create-request.dto';

@UseGuards(JwtAuthGuard)
@Controller('admin/resource')
export class ResourceController {
  constructor(private readonly adminService: AdminService) {}

  @Post('slots')
  async createSlot(
    @Req() req: Request,
    @Body() body: CreateSlotDto,
  ): Promise<any> {
    const user = req.user as UserPayload;
    this.adminService.createSlot(user, body);
  }

  @Get('slots')
  async getListSlot(
    @Req() req: Request,
    @Query('ids') slotIds: string,
  ): Promise<any> {
    const user = req.user as UserPayload;
    return this.adminService.getListSlot(user, slotIds);
  }

  @Get('slots/:id')
  async getOneSlot(
    @Req() req: Request,
    @Param('id') slotId: string,
  ): Promise<any> {
    if (slotId === undefined) {
      throw new BadRequestException();
    }
    const user = req.user as UserPayload;
    return this.adminService.getOneSlot(user, slotId);
  }

  @Delete('slots/:id')
  async deleteOneSlot(
    @Req() req: Request,
    @Param('id') slotId: string,
  ): Promise<any> {
    if (slotId === undefined) {
      throw new BadRequestException();
    }
    const user = req.user as UserPayload;
    return this.adminService.deleteOneSlot(user, slotId);
  }

  @Put('slots/:id')
  async updateOneSlot(
    @Req() req: Request,
    @Body() body: UpdateSlotDto,
    @Param('id') slotId: string,
  ): Promise<any> {
    await this.adminService.updateOneSlot(
      req.user as UserPayload,
      slotId,
      body,
    );

    return {
      message: 'success',
    };
  }

  // Parks
  @Get('parks')
  async getListPark(
    @Req() req: Request,
    @Query('ids') ids: string,
  ): Promise<any> {
    const user = req.user as UserPayload;
    return this.adminService.getListPark(user, ids);
  }

  @Get('parks/:id')
  async getOnePark(
    @Req() req: Request,
    @Param('id') slotId: string,
  ): Promise<any> {
    if (slotId === undefined) {
      throw new BadRequestException();
    }
    const user = req.user as UserPayload;
    return this.adminService.getOnePark(user, slotId);
  }

  @Put('parks/:id')
  async updateOnePark(
    @Req() req: Request,
    @Body() body: UpdateParkDto,
    @Param('id') slotId: string,
  ): Promise<any> {
    const user = req.user as UserPayload;

    console.log(body);

    await this.adminService.updateOnePark(user, slotId, body);

    return {
      message: 'success',
    };
  }

  @Post('parks')
  async createPark(
    @Req() req: Request,
    @Body() body: CreateSlotDto,
  ): Promise<any> {
    const user = req.user as UserPayload;
    await this.adminService.createPark(user, body);

    return {
      message: 'success',
    };
  }

  @Delete('parks/:id')
  async deleteOnePark(
    @Req() req: Request,
    @Param('id') id: string,
  ): Promise<any> {
    if (id === undefined) {
      throw new BadRequestException();
    }
    const user = req.user as UserPayload;
    return this.adminService.deleteOnePark(user, id);
  }

  // Booking
  @Get('bookings')
  async getListBooking(
    @Req() req: Request,
    @Query('ids') ids: string,
  ): Promise<any> {
    const user = req.user as UserPayload;
    return this.adminService.getListBooking(user, ids);
  }

  // Parkings
  @Get('parkings')
  async getListParking(
    @Req() req: Request,
    @Query('ids') ids: string,
  ): Promise<any> {
    const user = req.user as UserPayload;
    return this.adminService.getListParking(user, ids);
  }

  // Invoices
  @Get('invoices')
  async getListInvoice(
    @Req() req: Request,
    @Query('ids') ids: string,
  ): Promise<any> {
    const user = req.user as UserPayload;
    return this.adminService.getListInvoice(user, ids);
  }

  // Drivers
  @Get('drivers')
  async getListDriver(
    @Req() req: Request,
    @Query('ids') ids: string,
  ): Promise<any> {
    const user = req.user as UserPayload;
    return this.adminService.getListDriver(user, ids);
  }

  // Managers
  @Get('managers')
  async getListManager(
    @Req() req: Request,
    @Query('ids') ids: string,
  ): Promise<any> {
    const user = req.user as UserPayload;
    return this.adminService.getListManager(user, ids);
  }

  @Get('managers/:id')
  async getOneManager(
    @Req() req: Request,
    @Param('id') id: string,
  ): Promise<any> {
    if (id === undefined) {
      throw new BadRequestException();
    }
    const user = req.user as UserPayload;
    return this.adminService.getOneManager(user, id);
  }

  // Requests
  @Get('requests')
  async getListRequest(
    @Req() req: Request,
    @Query('ids') ids: string,
  ): Promise<any> {
    const user = req.user as UserPayload;
    return this.adminService.getListRequest(user, ids);
  }

  @Get('requests/:id')
  async getOneRequest(
    @Req() req: Request,
    @Param('id') id: string,
  ): Promise<any> {
    if (id === undefined) {
      throw new BadRequestException();
    }
    const user = req.user as UserPayload;
    return this.adminService.getOneRequest(user, id);
  }

  @Post('requests')
  async createRequest(
    @Req() req: Request,
    @Body() body: CreateRequestDto,
  ): Promise<any> {
    const user = req.user as UserPayload;
    await this.adminService.createRequest(user, body);

    return {
      message: 'success',
    };
  }

  @Post('requests/:id/approved')
  async approvedRequest(
    @Req() req: Request,
    @Param('id') id: string,
  ): Promise<any> {
    if (id === undefined) {
      throw new BadRequestException();
    }
    const user = req.user as UserPayload;
    return this.adminService.approvedRequest(user, id);
  }

  @Post('requests/:id/reject')
  async rejectRequest(
    @Req() req: Request,
    @Param('id') id: string,
  ): Promise<any> {
    if (id === undefined) {
      throw new BadRequestException();
    }
    const user = req.user as UserPayload;
    return this.adminService.rejectRequest(user, id);
  }

  // Registers
  @Get('registers')
  async getListRegister(
    @Req() req: Request,
    @Query('ids') ids: string,
  ): Promise<any> {
    const user = req.user as UserPayload;
    return this.adminService.getListRegister(user, ids);
  }

  @Get('registers/:id')
  async getOneRegister(
    @Req() req: Request,
    @Param('id') id: string,
  ): Promise<any> {
    if (id === undefined) {
      throw new BadRequestException();
    }
    const user = req.user as UserPayload;
    return this.adminService.getOneRegister(user, id);
  }

  @Post('registers/:id/approved')
  async approvedRegister(
    @Req() req: Request,
    @Param('id') id: string,
  ): Promise<any> {
    if (id === undefined) {
      throw new BadRequestException();
    }
    const user = req.user as UserPayload;
    return this.adminService.approvedRegister(user, id);
  }

  @Post('registers/:id/reject')
  async rejectRegister(
    @Req() req: Request,
    @Param('id') id: string,
  ): Promise<any> {
    if (id === undefined) {
      throw new BadRequestException();
    }
    const user = req.user as UserPayload;
    return this.adminService.rejectRegister(user, id);
  }
}
