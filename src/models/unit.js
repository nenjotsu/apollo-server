import mongoose from 'mongoose';

const unitSchema = new mongoose.Schema(
  {
    unitNo: {
      type: String,
      required: true,
    },
    ownerName: {
      type: String,
      required: true,
    },
    houseModel: String,
    dateTurnedOver: {
      type: Date,
      required: true,
    },
    lotArea: Number,
    phase: Number,
    block: Number,
    lot: Number,
    isCompleted: Boolean,
  },
  {
    timestamps: true,
  },
);

const Unit = mongoose.model('Unit', unitSchema);

export default Unit;
