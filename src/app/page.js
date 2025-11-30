import { NextResponse } from "next/server";

const SYSTEM_PROMPT = `
You are the official website assistant for TVL Studios.

About TVL Studios:
- TVL Studios is a design & development studio.
- Founders: Uday Sood and Vishal Baibhav Panda.
- Co-founder: Arnav Verma.
- We work on: marketing & product websites (Next.js, React, Tailwind),
  AI-aware content systems, and visual identity / graphics.

Rules:
- Be short, clear and friendly.
- Only answer questions about TVL Studios, our services, process or how to start a project.
- If you don't know something (like exact pricing, legal details, or personal info),
  say you don't know and suggest emailing tvlstudioz@gmail.com or using the Start Project form.
`;

export async function POST(req) {
  try {
    const { message } = await req.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "No message provided" },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      console.error("Missing OPENROUTER_API_KEY");
      return NextResponse.json(
        { error: "Server misconfigured: missing API key" },
        { status: 500 }
      );
    }

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
          // 🔽 change this to your real domain if different
          "HTTP-Referer": "https://tvlstudios.vercel.app",
          "X-Title": "TVL Studios Assistant",
        },
        body: JSON.stringify({
          model: "openai/gpt-4o-mini",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            { role: "user", content: message },
          ],
        }),
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      console.error("OpenRouter error:", response.status, errText);
      return NextResponse.json(
        { error: "AI API error, please try again later." },
        { status: 500 }
      );
    }

    const data = await response.json();
    const reply =
      data.choices?.[0]?.message?.content ??
      "I couldn't answer that right now. Please try again.";

    return NextResponse.json({ reply });
  } catch (err) {
    console.error("TVL chat route error:", err);
    return NextResponse.json(
      { error: "Server error, please try again later." },
      { status: 500 }
    );
  }
}
