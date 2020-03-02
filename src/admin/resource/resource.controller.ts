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

  // Drivers
  @Get('managers')
  async getListManager(
    @Req() req: Request,
    @Query('ids') ids: string,
  ): Promise<any> {
    const user = req.user as UserPayload;
    return this.adminService.getListManager(user, ids);
  }
}
