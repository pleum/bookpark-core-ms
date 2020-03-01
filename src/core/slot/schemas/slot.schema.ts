import * as mongoose from 'mongoose';

const SlotSchema = new mongoose.Schema(
  {
    deviceId: {
      type: mongoose.SchemaTypes.String,
      required: true,
    },
    park: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Park',
      required: true,
    },
    name: {
      type: mongoose.SchemaTypes.String,
      required: true,
    },
    floor: {
      type: mongoose.SchemaTypes.String,
      required: true,
    },
    status: {
      type: mongoose.SchemaTypes.String,
      enum: ['AVAILABLE', 'UNAVAILABLE'],
      default: 'AVAILABLE',
    },
    isDetected: {
      type: mongoose.SchemaTypes.Boolean,
      default: false,
    },
    gate: {
      type: mongoose.SchemaTypes.String,
      enum: ['CLOSE', 'BLOCK', 'OPEN'],
      default: 'CLOSE',
    },
    location: {
      type: { type: mongoose.SchemaTypes.String, default: 'Point' },
      coordinates: [mongoose.SchemaTypes.Number],
    },
  },
  {
    timestamps: true,
  },
);

export { SlotSchema };
