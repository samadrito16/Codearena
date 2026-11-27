import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Bell,
  CheckCircle2,
  FolderGit2,
  Sparkles,
} from 'lucide-react';

export default function Projects() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) return;
    setSubscribed(true);
  };

  return (
    <div className="relative min-h-[75vh] w-full max-w-5xl mx-auto px-4 sm:px-6 py-12 flex flex-col justify-center items-center space-y-10 animate-in fade-in duration-300">
      {/* Ambient background glows */}
      <div className="pointer-events-none absolute inset-x-0 -top-20 -z-10 flex justify-center overflow-hidden">
        <div className="h-[380px] w-[600px] rounded-full bg-linear-to-tr from-indigo-500/15 via-cyan-500/15 to-transparent blur-3xl opacity-70" />
      </div>

      {/* Hero Header */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold border border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400 shadow-xs backdrop-blur-md">
          <Sparkles size={13} className="animate-pulse" />
          <span>Coming Soon · In Active Development</span>
        </div>

        <h1 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
          Guided Real-World <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-500 via-cyan-500 to-emerald-400">Software Projects</span>
        </h1>

        <p className="text-sm sm:text-base text-slate-600 dark:text-neutral-400 leading-relaxed max-w-xl mx-auto">
          Take your problem-solving beyond single algorithmic functions. Build production-grade systems and fullstack applications with step-by-step milestones, automated test suites, and architectural blueprints.
        </p>
      </div>

      {/* Main Glass Announcement Card */}
      <div className="glass-dropdown-menu rounded-3xl p-6 sm:p-10 border shadow-2xl relative overflow-hidden text-center space-y-6 max-w-xl w-full mx-auto">
        {/* Decorative center icon */}
        <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 shadow-inner mx-auto">
          <FolderGit2 size={28} />
        </div>

        <div className="space-y-2">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            Projects Section is Coming Soon!
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-neutral-400 leading-relaxed">
            We are curating end-to-end projects complete with automated unit tests and interactive workspaces. Leave your email to be the first to get early access when we launch.
          </p>
        </div>

        {/* Waitlist Form */}
        {subscribed ? (
          <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 text-xs font-semibold shadow-xs animate-in zoom-in-95">
            <CheckCircle2 size={16} />
            <span>You're on the early access list! We'll notify you as soon as it goes live.</span>
          </div>
        ) : (
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-center justify-center gap-2 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email for early access..."
              required
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-neutral-700 bg-white/80 dark:bg-black/40 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-neutral-500 focus:outline-hidden focus:ring-2 focus:ring-cyan-500 transition shadow-inner"
            />
            <button
              type="submit"
              className="w-full sm:w-auto shrink-0 inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl font-bold text-xs bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200 transition shadow-md"
            >
              <Bell size={13} />
              <span>Notify Me</span>
            </button>
          </form>
        )}

        {/* Quick Navigation Links */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-3 text-xs">
          <Link
            to="/problems"
            className="inline-flex items-center gap-1.5 font-semibold text-slate-700 dark:text-neutral-300 hover:text-cyan-500 transition"
          >
            <span>Explore Practice Problems</span>
            <ArrowRight size={12} />
          </Link>
          <span className="text-slate-300 dark:text-neutral-700">&bull;</span>
          <Link
            to="/editor"
            className="inline-flex items-center gap-1.5 font-semibold text-slate-700 dark:text-neutral-300 hover:text-cyan-500 transition"
          >
            <span>Open Code Editor</span>
            <ArrowRight size={12} />
          </Link>
        </div>
      </div>
    </div>
  );
}
