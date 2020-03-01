import * as mongoose from 'mongoose';

export const ActivitySchema = new mongoose.Schema(
  {
    status: {
      type: mongoose.SchemaTypes.String,
      enum: ['CREATED', 'BOOKED', 'PARKED', 'FINISH', 'CANCELED'],
      default: 'CREATED',
    },
    slot: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Slot',
      required: true,
    },
    park: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Park',
      required: true,
    },
    driver: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Driver',
      required: true,
    },
    currentBooking: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Booking',
    },
    currentParking: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Parking',
    },
  },
  {
    timestamps: true,
  },
);
