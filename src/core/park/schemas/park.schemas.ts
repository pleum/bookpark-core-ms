import * as mongoose from 'mongoose';

export const ParkSchema = new mongoose.Schema(
  {
    name: {
      type: mongoose.SchemaTypes.String,
      required: true,
    },
    manager: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Manager',
    },
    location: {
      type: { type: mongoose.SchemaTypes.String, default: 'Point' },
      coordinates: [mongoose.SchemaTypes.Number],
    },
    address: {
      type: mongoose.SchemaTypes.String,
      required: true,
    },
    bookingPrice: {
      type: mongoose.SchemaTypes.Number,
      required: true,
    },
    parkingPricePerMinute: {
      type: mongoose.SchemaTypes.Number,
      required: true,
    },
    parkingFreeMintutes: {
      type: mongoose.SchemaTypes.Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);
