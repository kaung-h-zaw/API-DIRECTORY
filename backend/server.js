const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dbConnect = require("./config/db");

dotenv.config();
dbConnect();

const app = express();

// ----------------------------------------------------
// NUCLEAR CORS FIX: Allow EVERYTHING for development
// ----------------------------------------------------
app.use(
  cors({
    origin: true, // Reflects the request origin back (allows localhost, 127.0.0.1, etc.)
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json());
app.use(cookieParser());

// Routes
app.get("/", (req, res) => res.json({ msg: "API Running" }));
app.use("/api/users", require("./routes/auth"));
app.use("/api/resources", require("./routes/apis"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
