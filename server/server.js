require('dotenv').config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());


const API_KEY = process.env.API_KEY;
const GPT_4_API_URL = "https://api.openai.com/v1/chat/completions";

app.get('/api', (req, res) => res.status(200).send('API is working'));
app.post("/api/chat", async (req, res) => {
  try {
    const response = await axios.post(
      GPT_4_API_URL,
      { model: "gpt-4", messages: req.body.messages, temperature: 0.7 },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.log("Error:", error.message);
    console.log("Error data:", error.data);
    res.status(500).json({ message: "Something went wrong" });
    res.json(error.data);
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
