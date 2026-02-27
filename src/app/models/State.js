import mongoose from "mongoose";

const StatsSchema = new mongoose.Schema({
  toolName: String,
  timestamp: { type: Date, default: Date.now },
  status: { type: String, default: "success" },
});

export default mongoose.models.Stats || mongoose.model("Stats", StatsSchema);
