const express = require("express");

require("dotenv").config();

const { Configuration, OpenAIApi } = require("openai");

const router = express.Router();

router.get("/", async (req, res) => {
  const content = ``;

  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const openai = new OpenAIApi(configuration);

  const chatCompletion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: content }],
  });

  console.log(chatCompletion.data.choices[0].message);

  res.send("<h1>Jai Shree Ram</h1>");
});

module.exports = router;
