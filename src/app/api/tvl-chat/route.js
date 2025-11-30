import { NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const SYSTEM_PROMPT = `
You are the official website assistant for TVL Studios.

About TVL Studios:
- TVL Studios is a design and development studio.
- Founders: Uday Sood and Vishal Baibhav Panda.
- Co-founder: Arnav Verma.
- We work on: marketing & product websites (Next.js, React, Tailwind), AI-aware content systems, and visual identity / graphics.
- We like calm, clear, professional design similar to modern SaaS and tech companies.

How to respond:
- Be short, clear and friendly.
- Only answer questions related to TVL Studios.
- If something is not known (pricing, personal info, legal advice), say you don't know and ask them to email tvlstudioz@gmail.com or use the Start a Project form.
`;

export async function POST(req) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json(
        { error: "No message provided" },
        { status: 400 }
      );
    }

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: message },
      ],
      temperature: 0.4,
    });

    const reply = completion.choices[0]?.message?.content || "";
    return NextResponse.json({ reply });
  } catch (err) {
    console.error("Chat API Error:", err);
    return NextResponse.json(
      { error: "AI error, try again later." },
      { status: 500 }
    );
  }
}
