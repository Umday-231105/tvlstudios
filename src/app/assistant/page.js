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

  async function handleSend(e) {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;

    const userMessage = { role: "user", content: text };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/tvl-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      const data = await res.json();

      if (data.reply) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.reply },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              "I couldn't generate a response right now. Please try again.",
          },
        ]);
      }
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Something went wrong talking to the AI. Try again in a bit.",
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
        <p className="text-sm text-slate-600 mb-6">
          Ask questions about our studio, services, process or how to start a
          project.
        </p>

        <div className="rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col h-[70vh] max-h-[600px]">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${
                  m.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm ${
                    m.role === "user"
                      ? "bg-sky-600 text-white"
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

          {/* Input */}
          <form
            onSubmit={handleSend}
            className="border-t border-slate-100 px-4 py-3 flex gap-2"
          >
            <input
              type="text"
              placeholder="Ask about TVL Studios..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="px-4 py-2 rounded-2xl bg-sky-600 text-white text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-sky-500 transition-colors"
            >
              Send
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
