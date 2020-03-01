import * as mongoose from 'mongoose';

export const BookingSchema = new mongoose.Schema({
  driver: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Driver',
    required: true,
  },
  invoice: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Invoice',
  },
  activity: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Activity',
    required: true,
  },
  status: {
    type: mongoose.SchemaTypes.String,
    enum: ['CREATED', 'BOOKED', 'TIMEOUT', 'FINISH'],
    default: 'CREATED',
  },
  totalPrice: {
    type: mongoose.SchemaTypes.Number,
    required: true,
  },
  bookingAt: {
    type: mongoose.SchemaTypes.Date,
  },
  bookingEndedAt: {
    type: mongoose.SchemaTypes.Date,
  },
});
