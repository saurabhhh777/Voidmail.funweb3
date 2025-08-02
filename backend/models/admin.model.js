// adminWallet.model.js
import mongoose from "mongoose";

const adminWalletSchema = new mongoose.Schema({
  walletAddress: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    enum: ["superadmin", "moderator"],
    default: "moderator",
  },
  nonce: {
    type: String,
    default: () => Math.floor(Math.random() * 1000000).toString(),
  },
}, { timestamps: true });

const AdminWallet = mongoose.model("AdminWallet", adminWalletSchema);
export default AdminWallet;
