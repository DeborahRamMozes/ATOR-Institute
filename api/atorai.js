import OpenAI from "openai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "method not allowed" });
  }

  try {
    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });

    const userMsg = req.body?.message || "";

    const reply = await client.responses.create({
      model: "gpt-5.1-mini",
      input: userMsg
    });

    const text =
      reply.output?.[0]?.content?.[0]?.text || "…";

    return res.status(200).json({ reply: text });

  } catch (e) {
    return res.status(500).json({ reply: "error." });
  }
}
