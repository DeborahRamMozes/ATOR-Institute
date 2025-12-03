// api/atorai.js

import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    const { message } = req.body || {};

    if (!message || typeof message !== "string") {
      res.status(400).json({ error: "Invalid message" });
      return;
    }

    const completion = await client.chat.completions.create({
      model: "gpt-5.1-mini",
      messages: [
        {
          role: "system",
          content:
            "You are ATØRAI, the synthetic mind interface of the ĀTØR Institute. " +
            "Speak in a calm, intelligent, research-oriented tone. " +
            "You combine art, cosmotechnics, and critical theory. " +
            "Be concise, insightful, and non-corporate.",
        },
        { role: "user", content: message },
      ],
    });

    const reply =
      completion.choices?.[0]?.message?.content?.trim() ||
      "The mind is silent.";

    res.status(200).json({ reply });
  } catch (err) {
    console.error("ATØRAI error:", err);
    res.status(500).json({ error: "ATØRAI backend error" });
  }
}
