import mongoose from "mongoose";

const pingLogSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    deviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Device",
      required: true,
    },

    status: {
      type: String,
      enum: ["Online", "Offline"],
      required: true,
    },

    responseTime: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

pingLogSchema.index({ deviceId: 1, createdAt: -1 });
pingLogSchema.index(
  { createdAt: 1 },
  { expireAfterSeconds: 60 * 60 * 24 * 30 }
);

export default mongoose.model(
  "PingLog",
  pingLogSchema
);