"use client";

import React, { useState, useEffect } from "react";

const SUGGESTED_QUESTIONS = [
  "Who are the founders of TVL Studios?",
  "What services does TVL Studios offer?",
  "How can I start a project with TVL Studios?",
];

export default function AssistantWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi, I’m the TVL Studios assistant. Ask me anything about our studio, services or how to start a project.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // Allow navbar (or anywhere) to open the widget:
  useEffect(() => {
    const handler = () => setIsOpen(true);
    if (typeof window !== "undefined") {
      window.addEventListener("tvl-open-assistant", handler);
    }
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("tvl-open-assistant", handler);
      }
    };
  }, []);

  async function sendMessage(text) {
    const trimmed = text.trim();
    if (!trimmed) return;

    const userMessage = { role: "user", content: trimmed };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/tvl-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed }),
      });

      const data = await res.json();

      const reply =
        data.reply ||
        "I couldn't generate a response right now. Please try again.";

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: reply },
      ]);
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

  function handleSubmit(e) {
    e.preventDefault();
    sendMessage(input);
  }

  if (!isOpen) {
    // SMALL ROUND BUTTON (bottom‑right)
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-5 right-5 z-50 rounded-full bg-sky-600 text-white shadow-lg shadow-sky-500/40 px-4 py-2 text-sm font-semibold hover:bg-sky-500 transition-all"
      >
        Chat with TVL
      </button>
    );
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 w-full max-w-sm">
      <div className="rounded-3xl bg-white border border-slate-200 shadow-xl shadow-slate-300/70 flex flex-col h-[420px] overflow-hidden">
        {/* Header */}
        <div className="px-4 py-3 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div>
            <p className="text-sm font-semibold text-slate-900">
              TVL Studios Assistant
            </p>
            <p className="text-[11px] text-slate-500">
              Ask about services, process or starting a project.
            </p>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="w-7 h-7 rounded-full flex items-center justify-center text-slate-500 hover:bg-slate-200/80 text-xs"
          >
            ✕
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 bg-slate-50">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex ${
                m.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] px-3 py-2 rounded-2xl text-xs ${
                  m.role === "user"
                    ? "bg-sky-600 text-white"
                    : "bg-white text-slate-900 border border-slate-200"
                }`}
              >
                {m.content}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="max-w-[80%] px-3 py-2 rounded-2xl bg-white text-slate-500 text-xs border border-slate-200">
                Thinking…
              </div>
            </div>
          )}
        </div>

        {/* Suggested questions */}
        <div className="px-3 py-2 border-t border-slate-200 bg-white flex flex-wrap gap-2">
          {SUGGESTED_QUESTIONS.map((q) => (
            <button
              key={q}
              type="button"
              onClick={() => sendMessage(q)}
              className="text-[10px] px-2 py-1 rounded-full bg-sky-50 text-sky-700 border border-sky-100 hover:bg-sky-100"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input */}
        <form
          onSubmit={handleSubmit}
          className="border-t border-slate-200 px-3 py-2 bg-slate-50 flex gap-2"
        >
          <input
            type="text"
            placeholder="Ask about TVL Studios..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 rounded-2xl border border-slate-200 bg-white px-3 py-1.5 text-xs outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="px-3 py-1.5 rounded-2xl bg-sky-600 text-white text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-sky-500 transition-colors"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
