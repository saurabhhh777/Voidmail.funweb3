import mongoose from "mongoose";

const transactionHistorySchema = new mongoose.Schema({
  wallet: {
    type: String,
    required: true
  },
  txnHash: {
    type: String,
    required: true
  },
  amountSOL: {
    type: Number,
    required: true
  },
  emailCreated: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ["success", "failed"],
    default: "success"
  }
}, { timestamps: true });

const TransactionHistory = mongoose.model("TransactionHistory", transactionHistorySchema);

export default TransactionHistory;
