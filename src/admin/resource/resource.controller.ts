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
} from '@nestjs/common';
import { AdminService } from '../admin.service';
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserPayload } from '../auth/strategies/jwt.strategy';
import { UpdateSlotDto } from './dto/update-slot.dto';
import { CreateSlotDto } from './dto/create-slot.dto';

@UseGuards(JwtAuthGuard)
@Controller('admin/resource')
export class ResourceController {
  constructor(private readonly adminService: AdminService) {}

  @Post('slots')
  async createSlot(
    @Req() req: Request,
    @Body() body: CreateSlotDto,
  ): Promise<any> {
    this.adminService.createSlot(req.user as UserPayload, body);
  }

  @Get('slots')
  async getAllSlots(
    @Req() req: Request,
    @Query('ids') slotIds: string,
  ): Promise<any> {
    if (slotIds) {
      const ids = slotIds.split(',');
      return this.adminService.getSlotIds(ids);
    }

    return this.adminService.getSlots(req.user as UserPayload);
  }

  @Get('slots/:id')
  async getSlot(
    @Req() req: Request,
    @Param('id') slotId: string,
  ): Promise<any> {
    if (slotId === undefined) {
      throw new BadRequestException();
    }

    return this.adminService.getSlot(slotId);
  }

  @Put('slots/:id')
  async updateSlot(
    @Req() req: Request,
    @Body() body: UpdateSlotDto,
    @Param('id') slotId: string,
  ): Promise<any> {
    await this.adminService.updateSlot(req.user as UserPayload, slotId, body);

    return {
      message: 'success',
    };
  }

  @Get('parks')
  async getParks(
    @Req() req: Request,
    @Query('ids') parkIds: string,
  ): Promise<any> {
    if (parkIds) {
      const ids = parkIds.split(',');
      return this.adminService.getParksFromIds(ids);
    }

    return this.adminService.getParks();
  }

  @Get('parks/:id')
  async getPark(
    @Req() req: Request,
    @Param('id') parkId: string,
  ): Promise<any> {
    return this.adminService.getPark(parkId);
  }

  @Get('parkings')
  async getParkings(
    @Req() req: Request,
    @Query('ids') parkIds: string,
  ): Promise<any> {
    // if (parkIds) {
    //   const ids = parkIds.split(',');
    //   return this.adminService.getParksFromIds(ids);
    // }

    return this.adminService.getParkings();
  }
}
