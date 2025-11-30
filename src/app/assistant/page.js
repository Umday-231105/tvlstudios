"use client";

import React, { useState } from "react";

export default function AssistantPage() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi, I’m the TVL Studios assistant. Ask me anything about our studio, services or how we work.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessages = [
      ...messages,
      { role: "user", content: input.trim() },
    ];
    setMessages(newMessages);
    const userInput = input.trim();
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/tvl-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userInput }),
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.reply || "I couldn't respond. Try again.",
        },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Something went wrong while talking to the AI. Try again later.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <main className="pt-24 pb-16 max-w-4xl mx-auto px-4">
        <h1 className="text-2xl md:text-3xl font-semibold mb-2">
          TVL Studios Assistant
        </h1>
        <p className="text-slate-600 mb-6">
          Ask anything about our studio, process, or services.
        </p>

        <div className="rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col h-[70vh] max-h-[600px]">
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm ${
                    m.role === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-slate-100 text-slate-900"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="max-w-[80%] px-3 py-2 rounded-2xl bg-slate-100 text-slate-500 text-sm">
                  Thinking…
                </div>
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="border-t px-4 py-3 flex gap-2">
            <input
              type="text"
              className="flex-1 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm"
              placeholder="Ask your question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />

            <button
              type="submit"
              className="bg-blue-600 rounded-2xl px-4 py-2 text-white font-medium text-sm hover:bg-blue-500 disabled:opacity-40"
              disabled={loading}
            >
              Send
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
