const mongoose = require("mongoose");
const axios = require("axios");
const path = require("path");
const dotenv = require("dotenv");

// 1. Robust .env loading
// This looks for .env in the parent folder (backend/) relative to this file (backend/utils/seed.js)
const envPath = path.join(__dirname, "../.env");
dotenv.config({ path: envPath });

// Import the Model
const ApiResource = require("../models/ApiResource");

const seedDB = async () => {
  try {
    // Debug: Check if env loaded
    if (!process.env.MONGO_URI) {
      throw new Error(`MONGO_URI is undefined! Checked path: ${envPath}`);
    }
    console.log("🔑 MONGO_URI found.");

    // 2. Connect to DB
    console.log("🌱 Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected!");

    // 3. Fetch data from publicapis.org
    console.log("📡 Fetching APIs from public-apis...");
    // Note: publicapis.org sometimes has CORS/rate limits.
    // If this fails, we will fall back to a hardcoded list below.
    let entries = [];
    try {
      const { data } = await axios.get("https://api.publicapis.org/entries");
      entries = data.entries || [];
    } catch (apiError) {
      console.warn(
        "⚠️ Could not fetch external APIs (site might be down). Using backup data.",
      );
      entries = getBackupData(); // Use fallback function
    }

    if (entries.length === 0) {
      console.warn("⚠️ No entries found. Using backup data.");
      entries = getBackupData();
    }

    // 4. Transform data to match OUR Schema
    // We take the first 50 entries
    const formattedData = entries.slice(0, 50).map((entry) => ({
      name: entry.API,
      description: entry.Description,
      url: entry.Link,
      category: entry.Category,
      authType: entry.Auth || "No Auth",
      cors: entry.Cors || "unknown",
      votes: Math.floor(Math.random() * 50), // Fake random votes
    }));

    // 5. Clear old data & Insert new
    console.log("🧹 Clearing old data...");
    await ApiResource.deleteMany();

    console.log("📥 Inserting new data...");
    await ApiResource.insertMany(formattedData);

    console.log(
      `🎉 Success! Database Seeded with ${formattedData.length} APIs!`,
    );
    process.exit();
  } catch (err) {
    console.error("❌ Seed Error:", err.message);
    process.exit(1);
  }
};

// Fallback data in case the external API is down
function getBackupData() {
  return [
    {
      API: "Cat Facts",
      Description: "Daily cat facts",
      Link: "https://alexwohlbruck.github.io/cat-facts/",
      Category: "Animals",
      Auth: "",
      Cors: "no",
    },
    {
      API: "CoinDesk",
      Description: "Bitcoin Price Index",
      Link: "https://api.coindesk.com/v1/bpi/currentprice.json",
      Category: "Cryptocurrency",
      Auth: "",
      Cors: "yes",
    },
    {
      API: "Bored API",
      Description: "Activity suggestions",
      Link: "https://www.boredapi.com/",
      Category: "Activities",
      Auth: "",
      Cors: "yes",
    },
    {
      API: "Agify.io",
      Description: "Predict age from name",
      Link: "https://agify.io/",
      Category: "Demographics",
      Auth: "",
      Cors: "yes",
    },
    {
      API: "Genderize.io",
      Description: "Predict gender from name",
      Link: "https://genderize.io/",
      Category: "Demographics",
      Auth: "",
      Cors: "yes",
    },
    {
      API: "Nationalize.io",
      Description: "Predict nationality from name",
      Link: "https://nationalize.io/",
      Category: "Demographics",
      Auth: "",
      Cors: "yes",
    },
    {
      API: "Data USA",
      Description: "US Public Data",
      Link: "https://datausa.io/about/api/",
      Category: "Data",
      Auth: "",
      Cors: "yes",
    },
    {
      API: "Dogs",
      Description: "Random dog images",
      Link: "https://dog.ceo/dog-api/",
      Category: "Animals",
      Auth: "",
      Cors: "yes",
    },
    {
      API: "IPify",
      Description: "Public IP Address",
      Link: "https://www.ipify.org/",
      Category: "Development",
      Auth: "",
      Cors: "yes",
    },
    {
      API: "Jokes",
      Description: "Programming jokes",
      Link: "https://official-joke-api.appspot.com/random_joke",
      Category: "Humor",
      Auth: "",
      Cors: "yes",
    },
    {
      API: "RandomUser",
      Description: "Random user generator",
      Link: "https://randomuser.me/",
      Category: "Development",
      Auth: "",
      Cors: "yes",
    },
    {
      API: "Universities",
      Description: "University list",
      Link: "http://universities.hipolabs.com/search?country=United+States",
      Category: "Education",
      Auth: "",
      Cors: "yes",
    },
    {
      API: "Zippopotam",
      Description: "Zip code info",
      Link: "http://api.zippopotam.us/us/90210",
      Category: "Geocoding",
      Auth: "",
      Cors: "yes",
    },
  ];
}

seedDB();
