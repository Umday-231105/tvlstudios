"use client";

import React, { useState } from "react";

export default function AssistantPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { role: "user", content: input };
    setMessages((m) => [...m, userMsg]);
    setInput("");

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: [...messages, userMsg] }),
    });

    const data = await res.json();
    const botMsg = { role: "assistant", content: data.reply };

    setMessages((m) => [...m, botMsg]);
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <h1 className="text-2xl font-semibold mb-4">TVL Assistant</h1>

      <div className="border rounded-xl p-4 h-[70vh] overflow-y-auto mb-4 bg-slate-50">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`mb-3 p-2 rounded-lg max-w-[70%] ${
              msg.role === "user"
                ? "ml-auto bg-sky-500 text-white"
                : "mr-auto bg-slate-200 text-slate-900"
            }`}
          >
            {msg.content}
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          className="flex-1 border rounded-lg p-2"
          placeholder="Ask me anything..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          onClick={sendMessage}
          className="px-4 py-2 bg-sky-600 text-white rounded-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
}
