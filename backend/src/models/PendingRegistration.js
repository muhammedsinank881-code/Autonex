import mongoose from "mongoose";

const pendingRegistrationSchema = new mongoose.Schema(
  {
    fullName: String,

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: String,

    country: String,

    phone: Number,

    profile: {
      type: String,
      default: "",
    },

    otp: String,

    attempts: {
      type: Number,
      default: 0,
    },

    expiresAt: {
      type: Date,
      required: true,
      expires: 0,
    },
    lastOtpSentAt: {
      type: Date,
      default: Date.now,
    },
    isOtpVerified: {
      type: Boolean,
      default: false,
    }
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("PendingRegistration", pendingRegistrationSchema);
