// backend/routes/resources.js
const Redis = require("redis");
const client = Redis.createClient();
await client.connect();

router.get("/resources", async (req, res) => {
  try {
    // 1. Check Redis
    const cachedData = await client.get("api_resources");
    if (cachedData) {
      console.log("Serving from Cache");
      return res.json(JSON.parse(cachedData));
    }

    // 2. If not in cache, get from DB
    const resources = await Resource.find();

    // 3. Save to Redis (expire in 3600 seconds = 1 hour)
    await client.setEx("api_resources", 3600, JSON.stringify(resources));

    console.log("Serving from DB");
    res.json(resources);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
