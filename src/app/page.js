"use client";
import { useEffect, useState } from "react";

export default function ComingSoon() {
  const calculateTimeLeft = () => {
    const launchDate = new Date("2025-12-20T00:00:00"); // <-- SET LAUNCH DATE HERE
    const now = new Date();
    const difference = launchDate - now;

    if (difference <= 0) {
      return { days: "00", hours: "00", minutes: "00", seconds: "00" };
    }

    return {
      days: String(Math.floor(difference / (1000 * 60 * 60 * 24))).padStart(2, "0"),
      hours: String(Math.floor((difference / (1000 * 60 * 60)) % 24)).padStart(2, "0"),
      minutes: String(Math.floor((difference / (1000 * 60)) % 60)).padStart(2, "0"),
      seconds: String(Math.floor((difference / 1000) % 60)).padStart(2, "0"),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 text-white relative overflow-hidden">
      
      {/* QUESTION MARK FLOATING BACKGROUND */}
      <div className="absolute inset-0 opacity-[0.04] select-none pointer-events-none">
        {[...Array(40)].map((_, i) => (
          <span
            key={i}
            className="absolute text-6xl font-bold"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${6 + Math.random() * 6}s ease-in-out infinite`,
            }}
          >
            ?
          </span>
        ))}
      </div>

      {/* CENTER CONTENT */}
      <div className="relative z-10 text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
          TVL Studios
        </h1>
        <p className="mt-2 text-lg md:text-xl text-slate-300">
          Something exciting is coming…
        </p>

        <h2 className="mt-6 text-3xl md:text-5xl font-semibold text-sky-400">
          Coming Soon
        </h2>

        {/* COUNTDOWN */}
        <div className="mt-10 flex gap-5 justify-center text-center">
          {["days", "hours", "minutes", "seconds"].map((unit) => (
            <div key={unit}>
              <div className="text-4xl md:text-5xl font-bold bg-slate-900 px-5 py-3 rounded-xl border border-slate-700 shadow-lg">
                {timeLeft[unit]}
              </div>
              <p className="mt-2 text-sm uppercase tracking-wide text-slate-400">
                {unit}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* GLOW EFFECT */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-sky-500/20 blur-[120px]" />

      {/* Simple CSS for floating marks */}
      <style jsx global>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }
      `}</style>
    </div>
  );
}
