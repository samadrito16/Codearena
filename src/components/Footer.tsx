import { Link } from 'react-router-dom';
import { Code2, Shield, FileText, ExternalLink, Terminal, Sparkles, Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="mt-16 border-t transition-colors"
      style={{
        borderColor: 'var(--ca-border)',
        background: 'var(--ca-surface)',
      }}
      aria-label="Site footer"
    >
      <div className="mx-auto max-w-[1480px] px-4 py-12 sm:px-6 lg:px-9">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand & Mission Column */}
          <div className="lg:col-span-2">
            <Link to="/dashboard" className="inline-flex items-center gap-2.5 font-display text-lg font-bold text-primary">
              <span className="brand-mark brand-mark-pulse">
                <Code2 size={18} strokeWidth={2.5} />
              </span>
              <span>CodeArena<span className="themed-link">.</span></span>
            </Link>
            <p className="mt-3 max-w-sm text-xs leading-relaxed text-muted">
              The modern competitive programming and algorithmic skill-building platform.
              Practice 300+ curated problems, execute code across 4 core languages in real time,
              and track your journey with progressive skill trees.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-3 text-xs text-muted">
              <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold" style={{ background: 'var(--ca-surface-muted)', border: '1px solid var(--ca-border)' }}>
                <Terminal size={12} className="themed-link" />
                OnlineCompiler.io Engine
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold" style={{ background: 'var(--ca-surface-muted)', border: '1px solid var(--ca-border)' }}>
                <Shield size={12} className="text-emerald-500" />
                Sandbox Isolated
              </span>
            </div>
          </div>

          {/* Platform Navigation */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-primary">Platform</h3>
            <ul className="mt-4 space-y-2.5 text-xs text-muted">
              <li>
                <Link to="/dashboard" className="transition hover:text-primary">Overview</Link>
              </li>
              <li>
                <Link to="/problems" className="transition hover:text-primary">Problem Library</Link>
              </li>
              <li>
                <Link to="/daily-challenges" className="transition hover:text-primary">Daily Challenges</Link>
              </li>
              <li>
                <Link to="/learning-paths" className="transition hover:text-primary">Learning Paths</Link>
              </li>
              <li>
                <Link to="/leaderboard" className="transition hover:text-primary">Arena Leaderboard</Link>
              </li>
            </ul>
          </div>

          {/* Legal & Compliance */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-primary">Legal & Security</h3>
            <ul className="mt-4 space-y-2.5 text-xs text-muted">
              <li>
                <Link to="/privacy" className="inline-flex items-center gap-1.5 transition hover:text-primary">
                  <Shield size={13} className="themed-link" />
                  <span>Privacy Policy</span>
                </Link>
              </li>
              <li>
                <Link to="/terms" className="inline-flex items-center gap-1.5 transition hover:text-primary">
                  <FileText size={13} className="themed-link" />
                  <span>Terms of Service</span>
                </Link>
              </li>
              <li>
                <Link to="/terms#sandbox-security" className="transition hover:text-primary">
                  Acceptable Use Policy
                </Link>
              </li>
              <li>
                <Link to="/settings" className="transition hover:text-primary">
                  Privacy Preferences
                </Link>
              </li>
            </ul>
          </div>

          {/* Developer & Engine */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-primary">Developer</h3>
            <ul className="mt-4 space-y-2.5 text-xs text-muted">
              <li>
                <a
                  href="https://onlinecompiler.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 transition hover:text-primary"
                >
                  <span>OnlineCompiler.io API</span>
                  <ExternalLink size={11} className="text-muted" />
                </a>
              </li>
              <li>
                <a
                  href="/api/health"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 transition hover:text-primary"
                >
                  <span>Backend API Status</span>
                  <ExternalLink size={11} className="text-muted" />
                </a>
              </li>
              <li>
                <Link to="/settings" className="inline-flex items-center gap-1.5 transition hover:text-primary">
                  <Sparkles size={13} className="themed-link" />
                  <span>Theme & Palettes</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Sub-bar */}
        <div
          className="mt-10 flex flex-col items-center justify-between gap-4 border-t pt-6 text-xs text-muted sm:flex-row"
          style={{ borderColor: 'var(--ca-border)' }}
        >
          <div className="flex flex-wrap items-center gap-2">
            <span>&copy; {currentYear} CodeArena. All rights reserved.</span>
            <span className="hidden sm:inline">&middot;</span>
            <span className="text-[11px] text-muted">Empowering software engineers worldwide.</span>
          </div>
          <div className="flex items-center gap-4 text-xs font-medium">
            <Link to="/terms" className="hover:text-primary transition">Terms</Link>
            <span className="text-muted">&middot;</span>
            <Link to="/privacy" className="hover:text-primary transition">Privacy</Link>
            <span className="text-muted">&middot;</span>
            <Link to="/settings" className="hover:text-primary transition">Settings</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
