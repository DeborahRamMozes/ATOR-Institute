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
    const { prompt } = req.body || {};

    if (!prompt || typeof prompt !== "string") {
      res.status(400).json({ error: "Missing prompt" });
      return;
    }

    const response = await client.responses.create({
      model: "gpt-5.1-mini",
      input: prompt,
    });

    // Extract plain text from Responses API
    const text =
      response.output?.[0]?.content?.[0]?.text ?? "No response text.";

    res.status(200).json({ output: text });
  } catch (error) {
    console.error("ATOR-AI API error:", error);
    res.status(500).json({ error: "Internal error from ĀTØR-AI." });
  }
}
