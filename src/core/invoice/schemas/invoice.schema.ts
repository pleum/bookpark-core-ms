import * as mongoose from 'mongoose';

export const InvoiceSchema = new mongoose.Schema(
  {
    driver: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Driver',
      required: true,
    },
    activity: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Activity',
      required: true,
    },
    status: {
      type: mongoose.SchemaTypes.String,
      enum: ['DRAFT', 'WAITING', 'PAID', 'CANCELED', 'REFUND'],
      default: 'DRAFT',
    },
    totalPrice: {
      type: mongoose.SchemaTypes.Number,
    },
    paymentUrl: {
      web: {
        type: mongoose.SchemaTypes.String,
      },
      app: {
        type: mongoose.SchemaTypes.String,
      },
    },
    type: {
      type: mongoose.SchemaTypes.String,
      enum: ['BOOKING', 'PARKING'],
      required: true,
    },
    booking: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Booking',
    },
    parking: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Parking',
    },
    paymentAt: {
      type: mongoose.SchemaTypes.Date,
    },
    paymentTimeoutAt: {
      type: mongoose.SchemaTypes.Date,
    },
  },
  {
    timestamps: true,
  },
);
