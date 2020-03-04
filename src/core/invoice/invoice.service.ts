import {
  Injectable,
  Inject,
  forwardRef,
  BadGatewayException,
  NotFoundException,
  Logger,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { add } from 'date-fns';
import { Invoice } from './interfaces/invoice.interface';
import { LinePayService } from 'src/line/line-pay/line-pay.service';
import { Booking } from '../booking/interfaces/booking.interface';
import { ConfigService } from '@nestjs/config';
import { Parking } from '../parking/interfaces/parking.interface';
import { ReactAdminCrud } from 'src/admin/react-admin-crud.service';
import { DriverService } from '../driver/driver.service';
import { LineMessagingService } from 'src/line/line-messaging/line-messaging.service';

@Injectable()
export class InvoiceService extends ReactAdminCrud<Invoice> {
  private readonly logger = new Logger(InvoiceService.name);

  constructor(
    @InjectModel('Invoice') private readonly invoiceModel: Model<Invoice>,
    @Inject(forwardRef(() => LinePayService))
    private readonly linePayService: LinePayService,
    @Inject(forwardRef(() => LineMessagingService))
    private readonly lineMessagingService: LineMessagingService,
    private readonly configService: ConfigService,
    @Inject(forwardRef(() => DriverService))
    private readonly driverService: DriverService,
  ) {
    super(invoiceModel);
  }

  async createInvoice(
    driverId: string,
    totalPrice: number,
    type: string,
  ): Promise<Invoice> {
    const invoice = new this.invoiceModel({ driverId, totalPrice, type });
    return invoice.save();
  }

  async findById(invoiceId: string): Promise<Invoice> {
    return this.invoiceModel.findById(invoiceId).exec();
  }

  async findByTransactionId(transactionId: string): Promise<Invoice> {
    return this.invoiceModel.findOne({ transactionId }).exec();
  }

  async getOneById(invoiceId: string): Promise<Invoice> {
    return this.invoiceModel.findById(invoiceId).exec();
  }

  async createInvoiceFromBooking(
    driverId: string,
    booking: Booking,
  ): Promise<Invoice> {
    const rabbitRedirectUrl = this.configService.get<string>(
      'BOOKPARK_RABBIT_REDIRECT_URL',
    );

    const invoice = await new this.invoiceModel({
      type: 'BOOKING',
      totalPrice: booking.totalPrice,
      activity: booking.activity,
      booking: booking.id,
      driver: driverId,
    }).save();

    const request = {
      amount: invoice.totalPrice,
      currency: 'THB',
      orderId: invoice.id,
      packages: [
        {
          id: '1',
          amount: invoice.totalPrice,
          products: [
            {
              id: '1',
              name: 'Booking',
              imageUrl: 'https://pay-store.line.com/images/pen_brown.jpg',
              quantity: 1,
              price: invoice.totalPrice,
            },
          ],
        },
      ],
      redirectUrls: {
        confirmUrlType: 'SERVER',
        confirmUrl: `${rabbitRedirectUrl}/confirm`,
        cancelUrl: `${rabbitRedirectUrl}/cancel`,
      },
    };

    const linePayRequestRes = await this.linePayService.request(request);
    if (linePayRequestRes.data.returnCode !== '0000') {
      throw new BadGatewayException("can't create line pay request");
    }

    // const paymentTimeoutAt = add(invoice.createdAt, { minutes: 20 });
    // FOR_TESTING
    const paymentTimeoutAt = add(invoice.createdAt, { seconds: 30 });

    const updatedInvoice = await this.invoiceModel
      .findByIdAndUpdate(
        { _id: invoice.id },
        {
          paymentUrl: {
            web: linePayRequestRes.data.info.paymentUrl.web,
            app: linePayRequestRes.data.info.paymentUrl.app,
          },
          paymentTimeoutAt: paymentTimeoutAt,
          status: 'WAITING',
        },
        {
          new: true,
        },
      )
      .exec();

    return updatedInvoice;
  }

  async createInvoiceFromParking(
    driverId: string,
    parking: Parking,
  ): Promise<Invoice> {
    const rabbitRedirectUrl = this.configService.get<string>(
      'BOOKPARK_RABBIT_REDIRECT_URL',
    );

    const invoice = await new this.invoiceModel({
      type: 'PARKING',
      totalPrice: parking.calculatedPrice,
      activity: parking.activity,
      parking: parking.id,
      driver: driverId,
    }).save();

    const request = {
      amount: invoice.totalPrice,
      currency: 'THB',
      orderId: invoice.id,
      packages: [
        {
          id: '1',
          amount: invoice.totalPrice,
          products: [
            {
              id: '1',
              name: 'Parking',
              imageUrl: 'https://pay-store.line.com/images/pen_brown.jpg',
              quantity: 1,
              price: invoice.totalPrice,
            },
          ],
        },
      ],
      redirectUrls: {
        confirmUrlType: 'SERVER',
        confirmUrl: `${rabbitRedirectUrl}/confirm`,
        cancelUrl: `${rabbitRedirectUrl}/cancel`,
      },
    };

    const linePayRequestRes = await this.linePayService.request(request);

    if (linePayRequestRes.data.returnCode !== '0000') {
      throw new BadGatewayException("can't create line pay request");
    }

    // const paymentTimeoutAt = add(invoice.createdAt, { minutes: 20 });
    // FOR_TESTING
    const paymentTimeoutAt = add(invoice.createdAt, { seconds: 30 });

    const updatedInvoice = await this.invoiceModel
      .findByIdAndUpdate(
        { _id: invoice.id },
        {
          paymentUrl: {
            web: linePayRequestRes.data.info.paymentUrl.web,
            app: linePayRequestRes.data.info.paymentUrl.app,
          },
          paymentTimeoutAt: paymentTimeoutAt,
          status: 'WAITING',
        },
        {
          new: true,
        },
      )
      .exec();

    return updatedInvoice;
  }

  async confirm(invoiceId: string): Promise<Invoice> {
    const currentTime = new Date(Date.now());
    const updatedInvoice = await this.invoiceModel
      .findOneAndUpdate(
        { _id: invoiceId, status: 'WAITING' },
        { status: 'PAID', paymentAt: currentTime },
        { new: true },
      )
      .populate('booking')
      .populate('parking')
      .populate({
        path: 'activity',
        populate: [{ path: 'park' }, { path: 'slot' }],
      })
      .exec();

    if (!updatedInvoice) {
      throw new NotFoundException('invoice not found');
    }

    const driver = await this.driverService.getOne(updatedInvoice.driver._id);

    if (updatedInvoice.type === 'BOOKING') {
      const bookingEndedAt = add(currentTime, { minutes: 10 });
      // const bookingEndedAt = add(currentTime, { seconds: 20 });

      await updatedInvoice.booking.updateOne({
        status: 'BOOKED',
        bookingAt: currentTime,
        bookingEndedAt: bookingEndedAt,
      });
      await updatedInvoice.activity.updateOne({
        status: 'BOOKED',
      });

      this.lineMessagingService.sendPushMessage(driver.lineUserId, [
        { type: 'text', text: 'ขอบคุณสำหรับการชำระเงิน' },
        {
          type: 'flex',
          altText: 'daw',
          contents: {
            type: 'bubble',
            body: {
              type: 'box',
              layout: 'vertical',
              contents: [
                {
                  type: 'text',
                  text: 'RECEIPT',
                  weight: 'bold',
                  color: '#1DB446',
                  size: 'sm',
                },
                {
                  type: 'text',
                  text: 'การจอง',
                  weight: 'bold',
                  size: 'xxl',
                  margin: 'md',
                },
                {
                  type: 'text',
                  text: `${updatedInvoice.activity.park.name}`,
                  size: 'xs',
                  color: '#aaaaaa',
                  wrap: true,
                },
                {
                  type: 'separator',
                  margin: 'xxl',
                },
                {
                  type: 'box',
                  layout: 'vertical',
                  margin: 'xxl',
                  spacing: 'sm',
                  contents: [
                    {
                      type: 'box',
                      layout: 'horizontal',
                      contents: [
                        {
                          type: 'text',
                          text: 'รวมทั้งหมด',
                          size: 'sm',
                          color: '#555555',
                          flex: 0,
                        },
                        {
                          type: 'text',
                          text: `${updatedInvoice.totalPrice} บาท`,
                          size: 'sm',
                          color: '#111111',
                          align: 'end',
                        },
                      ],
                    },
                  ],
                },
                {
                  type: 'separator',
                  margin: 'xxl',
                },
                {
                  type: 'box',
                  layout: 'horizontal',
                  margin: 'md',
                  contents: [
                    {
                      type: 'text',
                      text: 'INVOICE ID',
                      size: 'xs',
                      color: '#aaaaaa',
                      flex: 0,
                    },
                    {
                      type: 'text',
                      text: updatedInvoice._id,
                      color: '#aaaaaa',
                      size: 'xs',
                      align: 'end',
                    },
                  ],
                },
              ],
            },
            styles: {
              footer: {
                separator: true,
              },
            },
          },
        },
      ]);
    } else if (updatedInvoice.type === 'PARKING') {
      const parkingPaidEndedAt = add(currentTime, { seconds: 20 });

      await updatedInvoice.parking.updateOne({
        status: 'PARKED_PAID',
        parkingEndedAt: parkingPaidEndedAt,
      });

      await updatedInvoice.activity.slot.updateOne({
        gate: 'OPEN',
      });
    }

    return updatedInvoice;
  }

  async updateTimeoutInvoice() {
    const currentTime = new Date();
    const timeoutInvoices = await this.invoiceModel
      .find({
        status: 'WAITING',
        paymentTimeoutAt: { $lt: currentTime },
      })
      .populate({
        path: 'booking',
        populate: {
          path: 'activity',
          populate: {
            path: 'slot',
          },
        },
      })
      .exec();

    this.logger.log(`found ${timeoutInvoices.length} timeout invoices`);

    const timeoutInvoicesPromise = timeoutInvoices.map(async invoice => {
      await invoice.updateOne({
        status: 'TIMEOUT',
      });
      await invoice.booking.updateOne({
        status: 'PAYMENT_TIMEOUT',
      });
      await invoice.booking.activity.updateOne({
        status: 'FINISH',
      });
      await invoice.booking.activity.slot.updateOne({
        status: 'AVAILABLE',
      });
    });

    const updated = await Promise.resolve(timeoutInvoicesPromise);
    this.logger.log(`updated ${updated.length} timeout invoices`);
  }

  async getListFromActivitys(activityIds: string[]): Promise<Invoice[] | null> {
    return this.invoiceModel
      .find({ activity: { $in: activityIds } })
      .populate({ path: 'driver', select: 'name' })
      .lean()
      .exec();
  }
}
