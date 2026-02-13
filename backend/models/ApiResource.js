const mongoose = require("mongoose");

const apiSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    url: { type: String, required: true }, // Link to official docs
    category: { type: String, required: true, index: true }, // e.g., "Animals", "Security"
    authType: { type: String, default: "unknown" }, // "ApiKey", "No Auth", etc.
    cors: { type: String, default: "unknown" }, // "yes", "no"
    submittedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Who added this?
    votes: { type: Number, default: 0 },
  },
  { timestamps: true },
);

// Enable text search on Name and Description
apiSchema.index({ name: "text", description: "text" });

module.exports = mongoose.model("ApiResource", apiSchema);
