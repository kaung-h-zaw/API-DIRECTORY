const ApiResource = require("../models/ApiResource");

// GET /api/resources (List all with filters)
const getApis = async (req, res) => {
  const { category, search } = req.query;
  let query = {};

  if (category && category !== "All") {
    query.category = category;
  }

  if (search) {
    // Uses the text index we created in the Model
    query.$text = { $search: search };
  }

  try {
    const apis = await ApiResource.find(query).sort({
      votes: -1,
      createdAt: -1,
    });
    res.json(apis);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /api/resources (Add new API)
const addApi = async (req, res) => {
  const { name, description, url, category, authType, cors } = req.body;

  try {
    const newApi = await ApiResource.create({
      name,
      description,
      url,
      category,
      authType,
      cors,
      submittedBy: req.user._id, // Attached by auth middleware
    });
    res.status(201).json(newApi);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// PUT /api/resources/:id/vote (Upvote)
const voteApi = async (req, res) => {
  try {
    const api = await ApiResource.findByIdAndUpdate(
      req.params.id,
      { $inc: { votes: 1 } }, // Increment votes by 1
      { new: true },
    );
    res.json(api);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { getApis, addApi, voteApi };
