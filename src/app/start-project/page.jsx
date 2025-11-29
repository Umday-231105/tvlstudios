"use client";

import React, { useState, useEffect } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { useTheme } from "../ThemeProvider";

/* -------------------- NAVBAR -------------------- */
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? theme === "dark"
            ? "bg-neutral-900/85 backdrop-blur-xl border-b border-neutral-800 py-4"
            : "bg-white/80 backdrop-blur-xl border-b border-neutral-200 py-4"
          : theme === "dark"
          ? "bg-neutral-900/40 backdrop-blur-xl py-6"
          : "bg-white/60 backdrop-blur-xl py-6"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <a href="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-emerald-200 via-amber-100 to-lime-100 dark:from-emerald-500/40 dark:via-amber-400/30 dark:to-lime-400/40 flex items-center justify-center shadow-md border border-white/80 dark:border-neutral-800">
            <span className="text-neutral-900 dark:text-neutral-900 font-semibold text-lg">T</span>
          </div>
          <span className="font-medium text-sm tracking-[0.18em] uppercase text-neutral-700 group-hover:text-neutral-900 dark:text-neutral-300 dark:group-hover:text-white transition">
            TVL Studios
          </span>
        </a>

        <div className="hidden md:flex items-center gap-5 text-xs text-neutral-600 dark:text-neutral-300">
          <a href="/" className="hover:text-neutral-900 dark:hover:text-white transition">Home</a>
          <button
            onClick={() => (window.location.href = "/start-project")}
            className="px-4 py-2 rounded-full bg-neutral-900 text-neutral-50 text-xs font-semibold hover:bg-neutral-800 transition dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-white"
          >
            Start a project
          </button>
        </div>

        <button
          onClick={() => setMobileMenuOpen((v) => !v)}
          className="md:hidden text-neutral-700 dark:text-neutral-100"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-neutral-200 dark:border-neutral-800 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-xl">
          <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col gap-3 text-sm text-neutral-800 dark:text-neutral-100">
            <a href="/" onClick={() => setMobileMenuOpen(false)}>Home</a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                window.location.href = "/start-project";
              }}
              className="px-4 py-2 rounded-full bg-neutral-900 text-neutral-50 dark:bg-neutral-100 dark:text-neutral-900"
            >
              Start a project
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

/* -------------------- FOOTER -------------------- */
const Footer = () => {
  const { theme } = useTheme();
  return (
    <footer className="w-full border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 py-10 relative z-10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
          <div>
            <h2 className="text-lg md:text-xl font-semibold mb-2 text-neutral-900 dark:text-neutral-50">
              Have something coming up?
            </h2>
            <p className="text-xs text-neutral-600 dark:text-neutral-300 max-w-md">
              Share a short brief—timing, budget, and context—and we’ll reply with next steps.
            </p>
          </div>

          <div className="flex flex-col items-start md:items-end gap-2 text-xs text-neutral-700 dark:text-neutral-200">
            <button
              onClick={() => (window.location.href = "/start-project")}
              className="px-5 py-2.5 rounded-full bg-neutral-900 text-neutral-50 font-semibold hover:bg-neutral-800 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-white"
            >
              Start a project
            </button>

            <span className="flex items-center gap-2 text-neutral-500 dark:text-neutral-400">
              <strong>Email:</strong> tvlstudioz@gmail.com
            </span>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-[11px] text-neutral-500 dark:text-neutral-400 border-t border-neutral-200 dark:border-neutral-800 pt-4">
          <span>© 2026 TVL Studios.</span>
          <div className="flex items-center gap-4">
            <a href="/privacy-policy" className="hover:text-neutral-800 dark:hover:text-neutral-200">Privacy Policy</a>
            <a href="/terms-of-service" className="hover:text-neutral-800 dark:hover:text-neutral-200">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

/* -------------------- Redesigned START PROJECT PAGE -------------------- */
export default function StartProjectPage() {
  const { theme } = useTheme();

  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    budget: "",
    timeline: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (submitted) setSubmitted(false); // clear success if user edits
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.name, form.email, form.message]);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Invalid email";
    if (!form.message.trim()) e.message = "Tell us about your project";
    return e;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) return;

    setLoading(true);

    try {
      // Simulate submission; replace with API call if you have one
      console.log("Start project submission:", form);

      // fallback: prefill mailto (keeps behavior you had)
      const subject = encodeURIComponent(`New project: ${form.company || form.name}`);
      const body = encodeURIComponent(
        `Name: ${form.name}\nEmail: ${form.email}\nCompany: ${form.company}\nBudget: ${form.budget}\nTimeline: ${form.timeline}\n\nMessage:\n${form.message}`
      );
      // open mail client
      window.location.href = `mailto:tvlstudioz@gmail.com?subject=${subject}&body=${body}`;

      // show success indicator briefly
      setSubmitted(true);
    } catch (err) {
      console.error("Submission error", err);
      // optionally show an error message to user
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen relative overflow-hidden transition-colors duration-500 ${
        theme === "dark" ? "bg-neutral-900 text-neutral-50" : "bg-neutral-50 text-neutral-900"
      }`}
    >
      {/* subtle background accents */}
      {theme !== "dark" && (
        <>
          <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-neutral-50 to-amber-50/40 pointer-events-none z-0" />
          <div className="absolute -left-32 -top-24 w-[520px] h-[520px] rounded-full bg-emerald-100/60 blur-[90px] pointer-events-none mix-blend-multiply opacity-40" />
        </>
      )}

      {theme === "dark" && (
        <>
          <div className="absolute inset-0 bg-neutral-900 z-0" />
          <div className="absolute -right-32 -bottom-32 w-[480px] h-[480px] rounded-full bg-indigo-700/20 blur-[120px] pointer-events-none z-0" />
          <div className="absolute -left-28 top-8 w-[320px] h-[320px] rounded-full bg-purple-700/12 blur-[90px] pointer-events-none z-0" />
        </>
      )}

      <Navbar />

      {/* HERO */}
      <header className="relative z-10 max-w-6xl mx-auto px-6 pt-28 pb-8">
        <div className="rounded-3xl p-8 md:p-12 bg-white/80 dark:bg-neutral-900/85 backdrop-blur-2xl border border-neutral-200 dark:border-neutral-800 shadow-[0_12px_60px_rgba(15,23,42,0.06)] dark:shadow-[0_12px_60px_rgba(0,0,0,0.6)]">
          <div className="md:flex md:items-center md:justify-between gap-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-semibold leading-tight">Start a project</h1>
              <p className="mt-2 text-sm text-neutral-700 dark:text-neutral-300 max-w-xl">
                Tell us about your idea — scope, timing and goals. We’ll reply with availability, a rough scope and next steps.
              </p>
            </div>

            <div className="mt-4 md:mt-0 flex items-center gap-3">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 text-sm text-emerald-700 dark:text-emerald-200">
                <strong>Typical response</strong> <span className="text-xs opacity-80">24–48 hours</span>
              </span>

              <button
                onClick={() => document.getElementById("project-form")?.scrollIntoView({ behavior: "smooth" })}
                className="px-4 py-2 rounded-full bg-neutral-900 text-white text-sm font-semibold hover:bg-neutral-800 transition"
                aria-label="Scroll to form"
              >
                Start now
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN GRID */}
      <main className="relative z-10 max-w-6xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column: highlights */}
          <aside className="lg:col-span-1 flex flex-col gap-6">
            <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/70 dark:bg-neutral-900/80 p-6 backdrop-blur-2xl shadow-sm">
              <h2 className="text-lg font-semibold mb-3 text-neutral-900 dark:text-neutral-50">What we need</h2>
              <ul className="space-y-3 text-sm text-neutral-700 dark:text-neutral-300">
                <li>• A short summary of the problem</li>
                <li>• Who the users are</li>
                <li>• Target timeline & budget</li>
                <li>• Examples of sites or products you like</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/70 dark:bg-neutral-900/80 p-6 backdrop-blur-2xl shadow-sm">
              <h3 className="font-medium mb-2 text-neutral-900 dark:text-neutral-50">Engagements</h3>
              <p className="text-sm text-neutral-700 dark:text-neutral-300">
                We run focused engagements — discovery, design, implementation and launch. Prices and timelines depend on scope; we’ll propose options after we review your brief.
              </p>
            </div>
          </aside>

          {/* Form (bigger area) */}
          <section id="project-form" className="lg:col-span-2">
            <form
              onSubmit={handleSubmit}
              className="rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-900/85 backdrop-blur-2xl p-8 shadow-lg"
              aria-label="Start a project form"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold block mb-1">Name</label>
                  <input
                    value={form.name}
                    onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
                    className={`w-full rounded-md px-3 py-2 border ${
                      errors.name ? "border-rose-500" : "border-neutral-200 dark:border-neutral-700"
                    } bg-white/95 dark:bg-neutral-900/70 text-sm outline-none`}
                    placeholder="Your name"
                    aria-invalid={!!errors.name}
                  />
                  {errors.name && <p className="text-rose-500 text-xs mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="text-xs font-semibold block mb-1">Work email</label>
                  <input
                    value={form.email}
                    onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
                    className={`w-full rounded-md px-3 py-2 border ${
                      errors.email ? "border-rose-500" : "border-neutral-200 dark:border-neutral-700"
                    } bg-white/95 dark:bg-neutral-900/70 text-sm outline-none`}
                    placeholder="email@company.com"
                    aria-invalid={!!errors.email}
                    type="email"
                  />
                  {errors.email && <p className="text-rose-500 text-xs mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="text-xs font-semibold block mb-1">Company</label>
                  <input
                    value={form.company}
                    onChange={(e) => setForm((s) => ({ ...s, company: e.target.value }))}
                    className="w-full rounded-md px-3 py-2 border border-neutral-200 dark:border-neutral-700 bg-white/95 dark:bg-neutral-900/70 text-sm outline-none"
                    placeholder="Company or project name"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold block mb-1">Budget</label>
                  <select
                    value={form.budget}
                    onChange={(e) => setForm((s) => ({ ...s, budget: e.target.value }))}
                    className="w-full rounded-md px-3 py-2 border border-neutral-200 dark:border-neutral-700 bg-white/95 dark:bg-neutral-900/70 text-sm outline-none"
                  >
                    <option value="">Prefer not to say</option>
                    <option value="under-10k">Under $10k</option>
                    <option value="10-30k">$10k–30k</option>
                    <option value="30-75k">$30k–75k</option>
                    <option value="75k+">$75k+</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="text-xs font-semibold block mb-1">Timeline</label>
                  <input
                    value={form.timeline}
                    onChange={(e) => setForm((s) => ({ ...s, timeline: e.target.value }))}
                    className="w-full rounded-md px-3 py-2 border border-neutral-200 dark:border-neutral-700 bg-white/95 dark:bg-neutral-900/70 text-sm outline-none"
                    placeholder="e.g. 3 months, Q1 2026, ASAP"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="text-xs font-semibold block mb-1">Tell us about the project</label>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm((s) => ({ ...s, message: e.target.value }))}
                    rows={6}
                    className={`w-full rounded-md px-3 py-2 border ${
                      errors.message ? "border-rose-500" : "border-neutral-200 dark:border-neutral-700"
                    } bg-white/95 dark:bg-neutral-900/70 text-sm outline-none resize-none`}
                    placeholder="What problem are you solving? Who are the users? Any examples you like?"
                    aria-invalid={!!errors.message}
                  />
                  {errors.message && <p className="text-rose-500 text-xs mt-1">{errors.message}</p>}
                </div>
              </div>

              <div className="mt-6 flex items-center gap-3">
                <button
                  type="submit"
                  disabled={loading}
                  className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold transition ${
                    loading ? "bg-neutral-700 text-white cursor-wait" : "bg-neutral-900 text-white hover:bg-neutral-800"
                  }`}
                >
                  {loading ? "Sending..." : "Send inquiry"}
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setForm({ name: "", email: "", company: "", budget: "", timeline: "", message: "" })
                  }
                  className="text-sm px-4 py-2 rounded-full border border-neutral-200 dark:border-neutral-700 bg-white/90 dark:bg-neutral-900/70"
                >
                  Reset
                </button>

                {submitted && (
                  <div className="ml-2 text-sm text-emerald-600">Thanks — your mail client has been opened.</div>
                )}
              </div>
            </form>

            {/* notes / FAQ */}
            <div className="mt-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/70 dark:bg-neutral-900/80 p-6 text-sm text-neutral-700 dark:text-neutral-300">
              <strong>What to expect</strong>
              <p className="mt-2">After you submit, we’ll review details and reply with availability and suggested next steps—usually within 24–48 hours.</p>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
