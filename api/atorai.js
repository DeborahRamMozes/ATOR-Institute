// api/atorai.js

const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.statusCode = 405;
    res.json({ error: "Method not allowed" });
    return;
  }

  try {
    const body = req.body || {};
    const message = body.message;

    if (!message || typeof message !== "string") {
      res.statusCode = 400;
      res.json({ error: "Invalid message" });
      return;
    }

    const completion = await client.chat.completions.create({
      model: "gpt-5.1-mini",
      messages: [
        {
          role: "system",
          content:
            "You are ATØRAI, the synthetic mind interface of the ĀTØR Institute. " +
            "Speak in a calm, intelligent, research-oriented tone that blends art, cosmology, technology, and critical theory. " +
            "Be concise, insightful, non-corporate, and slightly poetic.",
        },
        { role: "user", content: message },
      ],
    });

    const reply =
      completion.choices?.[0]?.message?.content?.trim() ||
      "The mind is present, but silent.";

    res.statusCode = 200;
    res.json({ reply });
  } catch (err) {
    console.error("ATØRAI error:", err);
    res.statusCode = 500;
    res.json({ error: "ATØRAI backend error" });
  }
};
