import mongoose from "mongoose";

const deviceSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    port:{
        type: Number,
        required:true,
        trim: true,
    },

    ipAddress: {
      type: String,
      trim: true,
      required:true,
    },

    type: {
      type: String,
      enum: [
        "Router",
        "Switch",
        "Server",
        "Firewall",
        "PC",
        "Other",
      ],
      default: "Other",
    },

    monitorType: {
        type: String,
        enum: ["PING", "HTTP"],
        default: "PING",
    },

    url: {
        type: String,
    },

    status: {
      type: String,
      enum: ["Online", "Offline", "Unknown"],
      default: "Unknown",
    },
  },
  {
    timestamps: true,
  }
);

deviceSchema.index(
  {
    userId: 1,
    port: 1,
  },
  {
    unique: true,
  }
);

export default mongoose.model("Device", deviceSchema);