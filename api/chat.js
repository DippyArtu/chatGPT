require('dotenv').config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = process.env.API_KEY;
const GPT_4_API_URL = "https://api.openai.com/v1/chat/completions";

module.exports = async (req, res) => {
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

    console.log("GPT-4 API response:", response.data);

    res.json(response.data);
  } catch (error) {
    console.log("Error:", error.message);
    res.status(500).json({ message: "Something went wrong" });
  }
};
