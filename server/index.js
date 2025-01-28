const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const { OAuth2Client } = require("google-auth-library");
const { igdl } = require("btch-downloader");

dotenv.config();

const app = express();

// middleware
app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Server api running");
});

// chat bot server

// mongodb connect
mongoose
  .connect(process.env.MONGO_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("Connection error:", err));

// Google OAuth2 Client
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Verify Google Token
async function verify(token) {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });
  const payload = ticket.getPayload();
  return payload;
}

// API to handle Google Login
app.post("/api/google-login", async (req, res) => {
  try {
    const { token } = req.body;
    const userInfo = await verify(token);
    const { sub, name, email, picture } = userInfo;

    let user = await User.findOne({ googleId: sub });
    if (!user) {
      console.log("User not found, creating new user...");
      user = new User({ googleId: sub, name, email, picture });

      try {
        await user.save();
        console.log("User saved:", user);
      } catch (saveError) {
        console.error("Error saving user to MongoDB:", saveError);
        return res
          .status(500)
          .json({ error: "Failed to save user to database" });
      }
    } else {
      console.log("User already exists:", user);
    }
    res.status(200).json(user); // Send back the user object as response
  } catch (error) {
    console.error("Error during login:", error);
    res.status(400).json({ error: "Invalid token" });
  }
});

const User = require("./models/User");

// Fetch all users
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find(); // Fetch all users from MongoDB
    res.json(users);
  } catch (error) {
    console.error("Failed to fetch users:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// video download api

app.post("/api/fetch-instagram", async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: "URL is required" });
  }

  try {
    const data = await igdl(url);
    console.log(`Data fetched successfully for: ${url}`);
    return res.json(data);
  } catch (error) {
    console.error(`Error fetching data for ${url}:`, error);
    return res
      .status(500)
      .json({ error: error.message || "An unexpected error occurred" });
  }

  // try {
  //   const data = await instagramGetUrl(url);
  //   console.log(`Fetching data for: ${url}`);
  //   return res.json(data);

  // } catch (error) {
  //   console.error(`Error fetching data for ${url}:`, error.message);
  //   return res.status(500).json({ error: error.message });
  // }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
