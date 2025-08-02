import mongoose from "mongoose";

const bountySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  reward: {
    amount: {
      type: Number,
      required: true
    },
    currency: {
      type: String,
      enum: ["SOL", "USDC"],
      default: "SOL"
    }
  },
  status: {
    type: String,
    enum: ["active", "completed", "cancelled", "expired"],
    default: "active"
  },
  category: {
    type: String,
    required: true,
    enum: ["development", "design", "content", "marketing", "research", "other"]
  },
  difficulty: {
    type: String,
    enum: ["easy", "medium", "hard", "expert"],
    required: true
  },
  createdBy: {
    type: String, // wallet address
    required: true,
    index: true
  },
  assignedTo: {
    type: String, // wallet address
    default: null,
    index: true
  },
  deadline: {
    type: Date,
    required: true
  },
  requirements: [{
    type: String
  }],
  attachments: [{
    name: String,
    url: String
  }],
  tags: [{
    type: String
  }],
  isOnChain: {
    type: Boolean,
    default: false
  },
  onChainTxHash: {
    type: String,
    default: null
  },
  submissions: [{
    walletAddress: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    attachments: [{
      name: String,
      url: String
    }],
    submittedAt: {
      type: Date,
      default: Date.now
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending"
    },
    reviewedBy: {
      type: String, // admin wallet address
      default: null
    },
    reviewedAt: {
      type: Date,
      default: null
    },
    feedback: {
      type: String,
      default: null
    }
  }]
}, { timestamps: true });

const Bounty = mongoose.model("Bounty", bountySchema);

export default Bounty; 