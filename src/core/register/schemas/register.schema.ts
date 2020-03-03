import * as mongoose from 'mongoose';

export const RegisterSchema = new mongoose.Schema(
  {
    name: {
      type: mongoose.SchemaTypes.String,
      required: true,
    },
    email: {
      type: mongoose.SchemaTypes.String,
      required: true,
    },
    password: {
      type: mongoose.SchemaTypes.String,
      required: true,
    },
    phoneNumber: {
      type: mongoose.SchemaTypes.String,
      required: true,
    },
    parkName: {
      type: mongoose.SchemaTypes.String,
      required: true,
    },
    parkAddress: {
      type: mongoose.SchemaTypes.String,
      required: true,
    },
    status: {
      type: mongoose.SchemaTypes.String,
      enum: ['PENDING', 'APPROVED', 'REJECT'],
      default: 'PENDING',
    },
  },
  {
    timestamps: true,
  },
);
