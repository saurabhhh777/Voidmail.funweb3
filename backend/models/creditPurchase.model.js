import mongoose from "mongoose";

const creditPurchaseSchema = new mongoose.Schema({
  wallet: {
    type: String,
    required: true,
    index: true
  },
  credits: {
    type: Number,
    required: true,
    min: 1
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  transactionHash: {
    type: String,
    required: true,
    unique: true
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending'
  },
  solAmount: {
    type: Number,
    required: true
  }
}, { timestamps: true });

const CreditPurchase = mongoose.model("CreditPurchase", creditPurchaseSchema);

export default CreditPurchase; 