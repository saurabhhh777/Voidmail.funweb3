import mongoose from "mongoose";

const emailInboxSchema = new mongoose.Schema({
    to: {
        type: String,
        required: true,
        index: true
    },
    from: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        default: "No Subject"
    },
    text: {
        type: String,
        default: ""
    },
    html: {
        type: String,
        default: ""
    },
    date: {
        type: Date,
        default: Date.now
    },
    attachments: [{
        filename: String,
        contentType: String,
        size: Number,
        content: Buffer
    }]
}, { timestamps: true });

// Index for better query performance
emailInboxSchema.index({ to: 1, createdAt: -1 });

const EmailInbox = mongoose.model("EmailInbox", emailInboxSchema);

export default EmailInbox;