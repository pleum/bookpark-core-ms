import * as mongoose from 'mongoose';

export const ParkingSchema = new mongoose.Schema({
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
    enum: ['PARKED', 'PARKED_END_FREETIME', 'PARKED_PAID', 'EXTEND', 'FINISH'],
    default: 'PARKED',
  },
  parkingAt: {
    type: mongoose.SchemaTypes.Date,
  },
  freeParkingEndAt: {
    type: mongoose.SchemaTypes.Date,
    required: true,
  },
  calculatedPriceAt: {
    type: mongoose.SchemaTypes.Date,
  },
  calculatedPrice: {
    type: mongoose.SchemaTypes.Number,
    default: 0,
  },
});
