import mongoose from 'mongoose';

const otpSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
      trim: true,
      index: true,
    },
    otp: {
      type: String,
      required: [true, 'OTP is required'],
      trim: true,
    },
    purpose: {
      type: String,
      enum: ['signup', 'login', 'forgot_password'],
      required: true,
    },
    tempData: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 600, // MongoDB TTL index: automatically deletes document after 10 minutes (600 seconds)
    },
  },
  { timestamps: false }
);

export default mongoose.model('Otp', otpSchema);
