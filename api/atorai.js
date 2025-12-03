import { OpenAI } from "openai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const userInput = req.body.q || "";

    const completion = await client.chat.completions.create({
      model: "gpt-5.1-mini",
      messages: [
        { role: "system", content: "You are ATØR-AI, synthetic mind interface of the ATØR Institute." },
        { role: "user", content: userInput }
      ]
    });

    const reply =
      completion.choices?.[0]?.message?.content ??
      "…no output…";

    res.status(200).json({ reply });

  } catch (err) {
    res.status(500).json({ error: "Internal error", details: err.message });
  }
}
