import * as mongoose from 'mongoose';

export const RequestSchema = new mongoose.Schema(
  {
    manager: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Manager',
      required: true,
    },
    type: {
      type: mongoose.SchemaTypes.String,
      enum: ['OTHER', 'ADD_SLOTS', 'CANCEL_SERVICE', 'EDIT_SLOT', 'EDIT_PARK'],
      default: 'OTHER',
    },
    message: {
      type: mongoose.SchemaTypes.String,
    },
    status: {
      type: mongoose.SchemaTypes.String,
      enum: ['PENDING', 'APPROVED', 'REJECT'],
      default: 'PENDING',
    },
    attendant: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Manager',
    },
  },
  {
    timestamps: true,
  },
);
