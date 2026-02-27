import mongoose from "mongoose";

const ToolSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: String, // AI, Utility, Developer
  usageCount: { type: Number, default: 0 }, // Is se "High Traffic" dikhayenge
  isPremium: { type: Boolean, default: false },
});

export default mongoose.models.Tool || mongoose.model("Tool", ToolSchema);
