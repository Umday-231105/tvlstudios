import OpenAI from "openai";

export async function POST(req) {
  const { messages } = await req.json();

  const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const completion = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages,
  });

  return Response.json({
    reply: completion.choices[0].message.content,
  });
}
