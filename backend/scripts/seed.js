// backend/scripts/seed.js
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const { seedDatabase } = require("../utils/superSeed"); // Make sure this path is correct

// Load .env from backend root
dotenv.config({ path: path.join(__dirname, "../.env") });

const run = async () => {
  try {
    console.log("🌱 Connecting to DB...");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ DB Connected!");

    // Set clear: false to ADD data (Smart Update)
    // Set clear: true to DELETE everything and start fresh
    const result = await seedDatabase({ clear: false });

    console.log("-----------------------------------");
    console.log(result.message);
    console.log("-----------------------------------");

    process.exit(0);
  } catch (err) {
    console.error("❌ Error:", err.message);
    process.exit(1);
  }
};

run();
