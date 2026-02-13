const axios = require("axios");
const ApiResource = require("../models/ApiResource");

// ✅ UPDATED WORKING SOURCES (2025)
const SOURCES = [
  // 1. Original Source (Working)
  "https://gist.githubusercontent.com/bensondavies/11eaea744855efc6ddf50dbea102d17b/raw/public_apis.json",

  // 2. Marcelscruz Public APIs (Active fork)
  "https://raw.githubusercontent.com/marcelscruz/public-apis/main/db/resources.json",

  // 3. Backup Mirror
  "https://raw.githubusercontent.com/yoobien/public-apis/master/json/entries.json",
];

const seedDatabase = async ({ clear = false } = {}) => {
  let allEntries = [];

  // 1. Fetch from ALL sources safely
  for (const url of SOURCES) {
    try {
      console.log(`📡 Fetching from: ${url}...`);
      const { data } = await axios.get(url, { timeout: 15000 });

      let entries = [];

      // Handle different JSON structures
      if (data.entries)
        entries = data.entries; // Standard
      else if (data.data)
        entries = data.data; // Some wrappers
      else if (Array.isArray(data)) entries = data; // Direct array

      console.log(`   ✅ Found ${entries.length} APIs.`);
      allEntries = [...allEntries, ...entries];
    } catch (err) {
      // Just warn and continue to the next source
      console.warn(`   ⚠️ Source failed (skipping): ${url}`);
      console.warn(`      Error: ${err.message}`);
    }
  }

  if (allEntries.length === 0) {
    console.error("❌ All sources failed. Using local backup.");
    allEntries = getBackupData();
  }

  // 2. Process Data (Remove Duplicates)
  const uniqueNames = new Set();
  const formattedData = [];

  for (const entry of allEntries) {
    if (!entry.API || !entry.Link) continue;
    const name = entry.API.trim();

    if (uniqueNames.has(name)) continue;
    uniqueNames.add(name);

    const auth = entry.Auth || "No Auth";
    const isFree = auth === "No Auth" || auth === "";

    formattedData.push({
      name: name,
      description: entry.Description,
      url: entry.Link,
      category: entry.Category || "Development",
      authType: auth,
      cors: entry.Cors || "unknown",
      tags: [entry.Category, isFree ? "Free" : "Auth Required"],
      votes: Math.floor(Math.random() * 50),
    });
  }

  // 3. Insert Logic
  if (clear) {
    console.log("🧹 Clearing old data...");
    await ApiResource.deleteMany({});
    console.log(`📥 Inserting ${formattedData.length} unique APIs...`);
    await ApiResource.insertMany(formattedData);
    return {
      success: true,
      message: `Database reset with ${formattedData.length} APIs.`,
    };
  } else {
    console.log("🔍 Checking for existing APIs...");
    const existing = await ApiResource.find({}, "name");
    const existingSet = new Set(existing.map((e) => e.name));

    const newApis = formattedData.filter((item) => !existingSet.has(item.name));

    if (newApis.length > 0) {
      console.log(`📥 Adding ${newApis.length} NEW APIs...`);
      await ApiResource.insertMany(newApis);
    }

    return {
      success: true,
      message:
        newApis.length > 0
          ? `Added ${newApis.length} new APIs. Total in DB: ${existing.length + newApis.length}`
          : "Database is up to date.",
    };
  }
};

// ... keep your getBackupData function ...

module.exports = { seedDatabase };
