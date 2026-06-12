import mongoose from "mongoose";

const incidentSchema = new mongoose.Schema(
  {
    device: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Device",
      required: true,
      index: true
    },

    type: {
      type: String,
      enum: ["offline", "high_latency", "packet_loss"],
      required: true,
      index: true
    },

    status: {
      type: String,
      enum: ["open", "ongoing", "acknowledged", "resolved", "suppressed"],
      default: "open",
      index: true
    },

    severity: {
      type: String,
      enum: ["low", "medium", "high", "critical"],
      default: "medium",
      index: true
    },

    message: {
      type: String,
      default: ""
    },

    firstOccurredAt: {
      type: Date,
      default: Date.now,
      index: true
    },

    lastOccurredAt: {
      type: Date,
      default: Date.now
    },

    resolvedAt: {
      type: Date,
      default: null
    },

    acknowledgedAt: {
      type: Date,
      default: null
    },

    occurrenceCount: {
      type: Number,
      default: 1
    },

    isActive: {
      type: Boolean,
      default: true,
      index: true
    }
  },
  { timestamps: true }
);

incidentSchema.index(
  { createdAt: 1 },
  { expireAfterSeconds: 15 * 24 * 60 * 60 }
);

incidentSchema.index({ device: 1, type: 1, isActive: 1 });

export default mongoose.model("Incident", incidentSchema);