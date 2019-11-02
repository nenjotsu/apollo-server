import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  orNo: {
    type: String,
    required: true,
  },
  unitNo: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  remarks: {
    type: String,
  },
  paymentType: {
    type: String,
    required: true,
  },
  datePayment: {
    type: Date,
    required: true,
  },
  dateOfCheck: {
    type: Date,
  },
  datePosted: {
    type: Date,
  },
  checkStatus: {
    type: String,
  },
  checkNo: {
    type: Number,
  },
  bankName: {
    type: String,
  },
  bankBranch: {
    type: String,
  },
  isConfirmed: {
    type: Boolean,
  },
});

const Payment = mongoose.model('Payment', paymentSchema);

export default Payment;
