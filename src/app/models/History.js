import mongoose from "mongoose";

const HistorySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  toolName: String,
  inputData: String,
  outputData: String,
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.models.History || mongoose.model("History", HistorySchema);
