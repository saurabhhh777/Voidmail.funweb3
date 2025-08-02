import mongoose from "mongoose";

const customEmailSchema = new mongoose.Schema({
  wallet: {
    type: String,
    required: true,
    index: true
  },
  prefix: {
    type: String,
    required: true
  },
  domain: {
    type: String,
    enum: [
      "voidmail.fun",
      "voidmail.info",
      "voidmail.email",
      "asksaurabh.xyz",
      "bigtimer.site"
    ],
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  nftMint: {
    type: String, // Optional but useful for verifying
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  expiresAt: {
    type: Date, // Optional: if you want to expire custom emails
    default: null
  }
}, { timestamps: true });

const CustomEmail = mongoose.model("CustomEmail", customEmailSchema);

export default CustomEmail;
