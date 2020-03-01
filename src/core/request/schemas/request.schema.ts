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
      enum: [
        'NOTHING',
        'ADD_SLOTS',
        'CANCEL_SERVICE',
        'EDIT_SLOT',
        'EDIT_PARK',
      ],
    },
    message: {
      type: mongoose.SchemaTypes.String,
    },
    status: {
      type: mongoose.SchemaTypes.String,
      enum: ['CREATED', 'APPROVED', 'REJECT'],
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
