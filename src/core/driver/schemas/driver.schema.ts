import * as mongoose from 'mongoose';

export const DriverSchema = new mongoose.Schema(
  {
    lineUserId: {
      type: mongoose.SchemaTypes.String,
    },
    name: {
      type: mongoose.SchemaTypes.String,
    },
    phoneNumber: {
      type: mongoose.SchemaTypes.String,
    },
    citizenId: {
      type: mongoose.SchemaTypes.String,
    },
  },
  {
    timestamps: true,
  },
);
