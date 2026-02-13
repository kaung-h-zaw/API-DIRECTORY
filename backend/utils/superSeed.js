const mongoose = require("mongoose");
const axios = require("axios");
const path = require("path");
const dotenv = require("dotenv");

// 1. Load Environment Variables
const envPath = path.join(__dirname, "../.env");
dotenv.config({ path: envPath });

const ApiResource = require("../models/ApiResource");

// Stable Gist Mirror (800+ entries)
const SOURCE_URL =
  "https://gist.githubusercontent.com/bensondavies/11eaea744855efc6ddf50dbea102d17b/raw/public_apis.json";

const superSeedDB = async () => {
  try {
    console.log("🌱 Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected!");

    let entries = [];

    // 2. Fetch Data
    try {
      console.log(`📡 Fetching 800+ APIs from Gist Mirror...`);
      const { data } = await axios.get(SOURCE_URL, { timeout: 10000 });

      if (data.entries) entries = data.entries;
      else if (Array.isArray(data)) entries = data;

      console.log(`✅ Success! Downloaded ${entries.length} APIs.`);
    } catch (err) {
      console.warn("⚠️ Download failed. Using HUGE built-in backup.");
      entries = getBackupData();
    }

    // 3. Transform Data & Remove Duplicates
    console.log("⚙️ Processing...");

    const uniqueNames = new Set();
    const formattedData = [];

    for (const entry of entries) {
      // Skip invalid entries
      if (!entry.API) continue;

      const name = entry.API.trim();

      // Skip if duplicate
      if (uniqueNames.has(name)) continue;
      uniqueNames.add(name);

      const auth = entry.Auth || "No Auth";
      const isFree = auth === "No Auth" || auth === "";

      formattedData.push({
        name: name,
        description: entry.Description,
        url: entry.Link,
        category: entry.Category,
        authType: auth,
        cors: entry.Cors || "unknown",
        tags: [entry.Category, isFree ? "Free" : "Auth Required"],
        votes: Math.floor(Math.random() * 50),
      });
    }

    console.log(
      `ℹ️ Removed duplicates. Final count: ${formattedData.length} unique APIs.`,
    );

    // 4. Insert Data
    console.log("🧹 Clearing old data...");
    await ApiResource.deleteMany();

    console.log(`📥 Inserting ${formattedData.length} APIs...`);

    // Insert in chunks of 100
    const chunkSize = 100;
    for (let i = 0; i < formattedData.length; i += chunkSize) {
      const chunk = formattedData.slice(i, i + chunkSize);
      await ApiResource.insertMany(chunk);
    }

    console.log(`🎉 SUCCESS! Database now has ${formattedData.length} APIs.`);
    process.exit();
  } catch (err) {
    console.error("❌ Fatal Error:", err.message);
    process.exit(1);
  }
};

// 🛡️ BUILT-IN BACKUP LIST (Failsafe)
function getBackupData() {
  return [
    {
      API: "Cat Facts",
      Description: "Daily cat facts",
      Auth: "",
      HTTPS: true,
      Cors: "no",
      Link: "https://alexwohlbruck.github.io/cat-facts/",
      Category: "Animals",
    },
    {
      API: "CoinDesk",
      Description: "Bitcoin Price Index",
      Auth: "",
      HTTPS: true,
      Cors: "yes",
      Link: "https://api.coindesk.com/v1/bpi/currentprice.json",
      Category: "Cryptocurrency",
    },
    {
      API: "Bored API",
      Description: "Activity suggestions",
      Auth: "",
      HTTPS: true,
      Cors: "yes",
      Link: "https://www.boredapi.com/",
      Category: "Activities",
    },
    {
      API: "Agify.io",
      Description: "Predict age from name",
      Auth: "",
      HTTPS: true,
      Cors: "yes",
      Link: "https://agify.io/",
      Category: "Demographics",
    },
    {
      API: "Data USA",
      Description: "US Public Data",
      Auth: "",
      HTTPS: true,
      Cors: "yes",
      Link: "https://datausa.io/about/api/",
      Category: "Data",
    },
    {
      API: "Dogs",
      Description: "Random dog images",
      Auth: "",
      HTTPS: true,
      Cors: "yes",
      Link: "https://dog.ceo/dog-api/",
      Category: "Animals",
    },
    {
      API: "IPify",
      Description: "Public IP Address",
      Auth: "",
      HTTPS: true,
      Cors: "yes",
      Link: "https://www.ipify.org/",
      Category: "Development",
    },
    {
      API: "RandomUser",
      Description: "Random user generator",
      Auth: "",
      HTTPS: true,
      Cors: "yes",
      Link: "https://randomuser.me/",
      Category: "Development",
    },
    {
      API: "OpenAI",
      Description: "AI Models (GPT-4)",
      Auth: "apiKey",
      HTTPS: true,
      Cors: "yes",
      Link: "https://openai.com/api/",
      Category: "Artificial Intelligence",
    },
    {
      API: "NASA",
      Description: "Space Data",
      Auth: "apiKey",
      HTTPS: true,
      Cors: "yes",
      Link: "https://api.nasa.gov/",
      Category: "Science",
    },
    {
      API: "Spotify",
      Description: "Music Metadata",
      Auth: "OAuth",
      HTTPS: true,
      Cors: "yes",
      Link: "https://developer.spotify.com/documentation/web-api/",
      Category: "Music",
    },
    {
      API: "Twitter",
      Description: "Social Media Data",
      Auth: "OAuth",
      HTTPS: true,
      Cors: "yes",
      Link: "https://developer.twitter.com/en/docs",
      Category: "Social",
    },
    {
      API: "Stripe",
      Description: "Payment Processing",
      Auth: "apiKey",
      HTTPS: true,
      Cors: "yes",
      Link: "https://stripe.com/docs/api",
      Category: "Finance",
    },
    {
      API: "GitHub",
      Description: "Code Hosting",
      Auth: "OAuth",
      HTTPS: true,
      Cors: "yes",
      Link: "https://docs.github.com/en/rest",
      Category: "Development",
    },
    {
      API: "Discord",
      Description: "Chat Platform",
      Auth: "OAuth",
      HTTPS: true,
      Cors: "yes",
      Link: "https://discord.com/developers/docs/intro",
      Category: "Communication",
    },
    {
      API: "Unsplash",
      Description: "Stock Photos",
      Auth: "apiKey",
      HTTPS: true,
      Cors: "yes",
      Link: "https://unsplash.com/developers",
      Category: "Photography",
    },
    {
      API: "OpenWeather",
      Description: "Weather Data",
      Auth: "apiKey",
      HTTPS: true,
      Cors: "yes",
      Link: "https://openweathermap.org/api",
      Category: "Weather",
    },
    {
      API: "Google Maps",
      Description: "Maps & Routes",
      Auth: "apiKey",
      HTTPS: true,
      Cors: "yes",
      Link: "https://developers.google.com/maps",
      Category: "Geocoding",
    },
    {
      API: "YouTube",
      Description: "Video Hosting",
      Auth: "apiKey",
      HTTPS: true,
      Cors: "yes",
      Link: "https://developers.google.com/youtube/v3",
      Category: "Video",
    },
    {
      API: "Twitch",
      Description: "Live Streaming",
      Auth: "OAuth",
      HTTPS: true,
      Cors: "yes",
      Link: "https://dev.twitch.tv/docs/api",
      Category: "Video",
    },
    {
      API: "PokéAPI",
      Description: "Pokémon Data",
      Auth: "",
      HTTPS: true,
      Cors: "yes",
      Link: "https://pokeapi.co/",
      Category: "Games",
    },
    {
      API: "Marvel",
      Description: "Marvel Comics Data",
      Auth: "apiKey",
      HTTPS: true,
      Cors: "yes",
      Link: "https://developer.marvel.com/",
      Category: "Comics",
    },
  ];
}

superSeedDB();
