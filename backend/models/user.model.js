import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  wallet: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  email: {
    type: String,
    default: null
  },
  isPremium: {
    type: Boolean,
    default: false
  },
  credits: {
    type: Number,
    default: 0,
    min: 0
  },
  expiresAt: {
    type: Date,
    default: null
  },
  customEmail: {
    type: String, // example: "saurabh@voidmail.fun"
    default: null
  },
  nftMint: {
    type: String,
    default: null // Store NFT mint if using SPL NFT
  }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;
