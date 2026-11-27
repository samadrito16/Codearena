import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PrismMark } from '../components/PrismLogo';
import {
  Code2,
  Shield,
  FileText,
  Lock,
  Database,
  Server,
  Eye,
  CheckCircle2,
  Printer,
  ChevronRight,
  ArrowLeft,
  Mail,
  UserCheck,
  AlertTriangle,
} from 'lucide-react';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';

export default function PrivacyPolicy() {
  const { user } = useAuth();
  const { theme, setTheme } = useApp();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Privacy Policy | Prismcode';
  }, []);

  const sections = [
    { id: 'introduction', label: '1. Introduction & Scope' },
    { id: 'data-collected', label: '2. Information We Collect' },
    { id: 'data-use', label: '3. How We Use Information' },
    { id: 'subprocessors', label: '4. Third-Party Subprocessors' },
    { id: 'cookies-storage', label: '5. Cookies & Local Storage' },
    { id: 'privacy-controls', label: '6. Privacy Controls & Rights' },
    { id: 'data-security', label: '7. Data Security Architecture' },
    { id: 'data-retention', label: '8. Data Retention & Deletion' },
    { id: 'international', label: '9. GDPR & CCPA Compliance' },
    { id: 'children', label: '10. Children’s Privacy' },
    { id: 'changes', label: '11. Policy Updates' },
    { id: 'contact', label: '12. Contact & Inquiries' },
  ];

  return (
    <div className="min-h-screen" style={{ background: 'var(--ca-surface-muted)' }}>
      {/* Top Header / Public Navigation */}
      <header
        className="sticky top-0 z-30 border-b px-4 py-3 sm:px-6 lg:px-9"
        style={{ borderColor: 'var(--ca-border)', background: 'var(--ca-surface)' }}
      >
        <div className="mx-auto flex max-w-[1480px] items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to={user ? '/dashboard' : '/problems'} className="flex items-center gap-2.5 font-display text-lg font-bold text-primary">
              <PrismMark size={30} className="brand-mark-pulse" />
              <span>Prism Code<span className="themed-link">.</span></span>
            </Link>
            <div className="hidden items-center gap-1.5 sm:flex">
              <span className="text-muted">/</span>
              <span className="rounded-full px-2.5 py-0.5 text-xs font-semibold text-muted" style={{ background: 'var(--ca-surface-muted)' }}>
                Legal & Trust
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="icon-button h-8 px-2.5 text-xs font-medium"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? 'Light mode' : 'Dark mode'}
            </button>
            <Link
              to="/terms"
              className="btn-secondary hidden h-8 px-3 text-xs sm:inline-flex items-center gap-1.5"
            >
              <FileText size={13} />
              <span>Terms of Service</span>
            </Link>
            {user ? (
              <Link to="/dashboard" className="btn-primary h-8 px-3 text-xs">
                Back to Dashboard
              </Link>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login" className="btn-secondary h-8 px-3 text-xs">
                  Sign in
                </Link>
                <Link to="/register" className="btn-primary h-8 px-3 text-xs">
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Document Body */}
      <main className="mx-auto max-w-[1480px] px-4 py-8 sm:px-6 lg:px-9">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs text-muted">
          <Link to={user ? '/dashboard' : '/'} className="hover:text-primary transition">
            Prismcode
          </Link>
          <ChevronRight size={13} />
          <span className="text-primary font-medium">Privacy Policy</span>
        </nav>

        {/* Hero Title Card */}
        <div
          className="panel-card relative overflow-hidden p-6 sm:p-8 mb-8"
          style={{ borderColor: 'var(--ca-border)', background: 'var(--ca-surface)' }}
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 mb-3">
                <Shield size={13} />
                <span>Transparent & Developer-First</span>
              </div>
              <h1 className="font-display text-2xl font-bold tracking-tight text-primary sm:text-3xl">
                Prismcode Privacy Policy
              </h1>
              <p className="mt-2 text-xs sm:text-sm text-muted">
                Effective Date: November 20, 2026 &middot; Version 1.2
              </p>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-center">
              <button
                type="button"
                onClick={() => window.print()}
                className="btn-secondary h-9 px-3.5 text-xs inline-flex items-center gap-1.5"
                title="Print or save as PDF"
              >
                <Printer size={14} />
                <span>Print Policy</span>
              </button>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-2 text-xs text-muted">
            <span className="rounded-lg px-2.5 py-1" style={{ background: 'var(--ca-surface-muted)', border: '1px solid var(--ca-border)' }}>
              &bull; Zero Ad Trackers
            </span>
            <span className="rounded-lg px-2.5 py-1" style={{ background: 'var(--ca-surface-muted)', border: '1px solid var(--ca-border)' }}>
              &bull; Hashed Credentials (Bcrypt)
            </span>
            <span className="rounded-lg px-2.5 py-1" style={{ background: 'var(--ca-surface-muted)', border: '1px solid var(--ca-border)' }}>
              &bull; Isolated Code Sandboxes
            </span>
            <span className="rounded-lg px-2.5 py-1" style={{ background: 'var(--ca-surface-muted)', border: '1px solid var(--ca-border)' }}>
              &bull; Granular Visibility Toggles
            </span>
          </div>
        </div>

        {/* Content Grid with Sticky Table of Contents */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Table of Contents Column */}
          <aside className="hidden lg:block">
            <div
              className="sticky top-24 rounded-2xl border p-5"
              style={{ borderColor: 'var(--ca-border)', background: 'var(--ca-surface)' }}
            >
              <h2 className="text-xs font-bold uppercase tracking-wider text-primary mb-3">
                Table of Contents
              </h2>
              <nav className="space-y-1.5 text-xs">
                {sections.map((sec) => (
                  <a
                    key={sec.id}
                    href={`#${sec.id}`}
                    className="block rounded-lg px-2.5 py-1.5 text-muted transition hover:text-primary hover:bg-black/5 dark:hover:bg-white/5"
                  >
                    {sec.label}
                  </a>
                ))}
              </nav>

              <div className="mt-6 border-t pt-4 text-xs text-muted" style={{ borderColor: 'var(--ca-border)' }}>
                <p className="font-semibold text-primary">Need Privacy Assistance?</p>
                <p className="mt-1">Contact our Data Protection team at:</p>
                <a href="mailto:privacy@codearena.com" className="mt-1 inline-flex items-center gap-1 themed-link font-mono text-[11px]">
                  <Mail size={12} />
                  privacy@codearena.com
                </a>
              </div>
            </div>
          </aside>

          {/* Document Content Column */}
          <article className="lg:col-span-3 space-y-8">
            {/* Section 1 */}
            <section
              id="introduction"
              className="panel-card p-6 sm:p-8"
              style={{ borderColor: 'var(--ca-border)', background: 'var(--ca-surface)' }}
            >
              <div className="flex items-center gap-2.5 text-primary">
                <FileText size={18} className="themed-link" />
                <h2 className="font-display text-lg font-bold sm:text-xl">1. Introduction & Scope</h2>
              </div>
              <div className="mt-4 space-y-3 text-xs sm:text-sm leading-relaxed text-muted">
                <p>
                  Welcome to <strong>PrismCode</strong> (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;the Platform&rdquo;).
                  PrismCode provides a modern, high-performance competitive programming ecosystem, real-time code execution,
                  curated algorithmic challenge tracks, and developer progress analytics.
                </p>
                <p>
                  This Privacy Policy describes how PrismCode collects, uses, secures, and handles your information when you visit PrismCode
                  our web application, register an account, submit code solutions, or interact with our APIs.
                </p>
                <p>
                  By registering an account or continuing to use Prismcode, you acknowledge that you have read and understood
                  the terms of this Privacy Policy. If you do not agree with our practices, please discontinue use of the platform.
                </p>
              </div>
            </section>

            {/* Section 2 */}
            <section
              id="data-collected"
              className="panel-card p-6 sm:p-8"
              style={{ borderColor: 'var(--ca-border)', background: 'var(--ca-surface)' }}
            >
              <div className="flex items-center gap-2.5 text-primary">
                <Database size={18} className="themed-link" />
                <h2 className="font-display text-lg font-bold sm:text-xl">2. Information We Collect</h2>
              </div>
              <div className="mt-4 space-y-4 text-xs sm:text-sm leading-relaxed text-muted">
                <p>
                  We collect information necessary to provide our coding platform, verify user identities, execute user-submitted solutions,
                  and ensure platform reliability. We categorize collected information as follows:
                </p>

                <div className="rounded-xl border p-4 space-y-2" style={{ borderColor: 'var(--ca-border)', background: 'var(--ca-surface-muted)' }}>
                  <h3 className="font-bold text-primary text-xs uppercase tracking-wider">A. Account & Profile Information</h3>
                  <ul className="list-disc pl-5 space-y-1 text-xs">
                    <li><strong>Account Credentials:</strong> Full name, email address, salted bcrypt password hash (we never store plain-text passwords), and account role (<code className="font-mono">user</code> or <code className="font-mono">admin</code>).</li>
                    <li><strong>Optional Developer Profile Data:</strong> Developer biography, professional affiliation/organization, geographic location, and external social profile URLs (GitHub, LinkedIn, Twitter/X, personal portfolio).</li>
                    <li><strong>Account Verification Status:</strong> Email verification tokens and confirmation status.</li>
                  </ul>
                </div>

                <div className="rounded-xl border p-4 space-y-2" style={{ borderColor: 'var(--ca-border)', background: 'var(--ca-surface-muted)' }}>
                  <h3 className="font-bold text-primary text-xs uppercase tracking-wider">B. Code Submissions & Practice Metrics</h3>
                  <ul className="list-disc pl-5 space-y-1 text-xs">
                    <li><strong>Source Code Solutions:</strong> Source code written and submitted in JavaScript, Python, Java, or C++.</li>
                    <li><strong>Execution Diagnostics:</strong> Execution runtimes (in milliseconds), memory allocation (in megabytes), exit codes, test case verdicts (Accepted, Wrong Answer, Time Limit Exceeded, Runtime Error), and compiler output (<code className="font-mono">stdout</code> and <code className="font-mono">stderr</code>).</li>
                    <li><strong>Gamification & Progress:</strong> Problem completion status, daily challenge streaks, topic mastery indices, and activity heatmap logs.</li>
                  </ul>
                </div>

                <div className="rounded-xl border p-4 space-y-2" style={{ borderColor: 'var(--ca-border)', background: 'var(--ca-surface-muted)' }}>
                  <h3 className="font-bold text-primary text-xs uppercase tracking-wider">C. Technical & Security Logs</h3>
                  <ul className="list-disc pl-5 space-y-1 text-xs">
                    <li><strong>Security & Abuse Prevention:</strong> IP addresses and request rates collected strictly to enforce rate limits (via Express rate limiters) and mitigate automated denial-of-service attempts.</li>
                    <li><strong>Session Identifiers:</strong> Randomly generated cryptographic session identifiers stored in HTTP-only cookies.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section
              id="data-use"
              className="panel-card p-6 sm:p-8"
              style={{ borderColor: 'var(--ca-border)', background: 'var(--ca-surface)' }}
            >
              <div className="flex items-center gap-2.5 text-primary">
                <CheckCircle2 size={18} className="themed-link" />
                <h2 className="font-display text-lg font-bold sm:text-xl">3. How We Use Your Information</h2>
              </div>
              <div className="mt-4 space-y-3 text-xs sm:text-sm leading-relaxed text-muted">
                <p>We use your information exclusively for legitimate platform purposes:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Core Service Provision:</strong> Compiling, executing, testing, and grading user-submitted algorithmic code against predefined test suites.</li>
                  <li><strong>Progress Tracking & Analytics:</strong> Calculating completion rates, calculating ranking percentiles on the global leaderboard, and computing personalized topic recommendations.</li>
                  <li><strong>Authentication & Security:</strong> Validating session tokens, enforcing role-based permissions (such as admin moderation), enabling secure password resets, and sending email verification links.</li>
                  <li><strong>Sandbox Defense & Integrity:</strong> Detecting and neutralizing malicious activity, including cryptomining scripts, fork bombs, denial-of-service loops, and sandbox evasion attempts.</li>
                </ul>
                <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3.5 text-xs text-primary">
                  <strong>Our Pledge:</strong> We do not sell, rent, monetize, or broker personal user data or submitted source code to advertising brokers or external data aggregators under any circumstances.
                </div>
              </div>
            </section>

            {/* Section 4 */}
            <section
              id="subprocessors"
              className="panel-card p-6 sm:p-8"
              style={{ borderColor: 'var(--ca-border)', background: 'var(--ca-surface)' }}
            >
              <div className="flex items-center gap-2.5 text-primary">
                <Server size={18} className="themed-link" />
                <h2 className="font-display text-lg font-bold sm:text-xl">4. Third-Party Subprocessors</h2>
              </div>
              <div className="mt-4 space-y-3 text-xs sm:text-sm leading-relaxed text-muted">
                <p>
                  To provide secure code compilation and reliable account management, Prismcode partners with vetted third-party infrastructure providers:
                </p>

                <div className="space-y-3 mt-4">
                  <div className="rounded-xl border p-4" style={{ borderColor: 'var(--ca-border)', background: 'var(--ca-surface-muted)' }}>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-primary text-xs">OnlineCompiler.io</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-sm bg-black/5 dark:bg-white/10 text-muted">Code Execution Engine</span>
                    </div>
                    <p className="mt-2 text-xs text-muted">
                      We transmit user code and test case inputs to OnlineCompiler.io via secured HTTPS endpoints to compile and evaluate solutions in isolated execution sandboxes.
                      OnlineCompiler.io executes untrusted code with rigid memory (256MB) and execution time (5s) constraints and returns execution diagnostics.
                    </p>
                  </div>

                  <div className="rounded-xl border p-4" style={{ borderColor: 'var(--ca-border)', background: 'var(--ca-surface-muted)' }}>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-primary text-xs">Clerk</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-sm bg-black/5 dark:bg-white/10 text-muted">Authentication / SSO Provider</span>
                    </div>
                    <p className="mt-2 text-xs text-muted">
                      When you choose to authenticate via Single Sign-On (Google or GitHub OAuth), Clerk processes the identity token verification.
                      Clerk adheres to SOC 2 Type II and GDPR data protection standards.
                    </p>
                  </div>

                  <div className="rounded-xl border p-4" style={{ borderColor: 'var(--ca-border)', background: 'var(--ca-surface-muted)' }}>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-primary text-xs">Transactional Email Provider</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-sm bg-black/5 dark:bg-white/10 text-muted">Email Delivery</span>
                    </div>
                    <p className="mt-2 text-xs text-muted">
                      Used strictly to dispatch transactional notifications such as verification tokens and password reset requests. No marketing emails or newsletters are sent without explicit opt-in.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 5 */}
            <section
              id="cookies-storage"
              className="panel-card p-6 sm:p-8"
              style={{ borderColor: 'var(--ca-border)', background: 'var(--ca-surface)' }}
            >
              <div className="flex items-center gap-2.5 text-primary">
                <Lock size={18} className="themed-link" />
                <h2 className="font-display text-lg font-bold sm:text-xl">5. Cookies & Local Storage Audit</h2>
              </div>
              <div className="mt-4 space-y-3 text-xs sm:text-sm leading-relaxed text-muted">
                <p>
                  Prismcode uses essential cookies and browser LocalStorage items to preserve your active session and preferences:
                </p>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b" style={{ borderColor: 'var(--ca-border)' }}>
                        <th className="py-2.5 font-bold text-primary">Identifier</th>
                        <th className="py-2.5 font-bold text-primary">Storage Type</th>
                        <th className="py-2.5 font-bold text-primary">Purpose & Duration</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y" style={{ borderColor: 'var(--ca-border)' }}>
                      <tr>
                        <td className="py-2 font-mono text-[11px] text-primary">prismcode_session</td>
                        <td className="py-2">HTTP-only Cookie</td>
                        <td className="py-2 text-muted">Essential session authorization token. Expires in 7 days or upon explicit sign-out.</td>
                      </tr>
                      <tr>
                        <td className="py-2 font-mono text-[11px] text-primary">prismcode-theme</td>
                        <td className="py-2">LocalStorage</td>
                        <td className="py-2 text-muted">Stores active UI mode (<code className="font-mono">light</code> or <code className="font-mono">dark</code>). Persistent.</td>
                      </tr>
                      <tr>
                        <td className="py-2 font-mono text-[11px] text-primary">prismcode-palette</td>
                        <td className="py-2">LocalStorage</td>
                        <td className="py-2 text-muted">Stores active color accent palette (Ocean, Classic, Emerald, etc.). Persistent.</td>
                      </tr>
                      <tr>
                        <td className="py-2 font-mono text-[11px] text-primary">prismcode-privacy</td>
                        <td className="py-2">LocalStorage</td>
                        <td className="py-2 text-muted">Stores granular profile data visibility preferences.</td>
                      </tr>
                      <tr>
                        <td className="py-2 font-mono text-[11px] text-primary">prismcode-draft-*</td>
                        <td className="py-2">LocalStorage</td>
                        <td className="py-2 text-muted">Autosaves in-progress code drafts per problem so your code is not lost during navigation.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* Section 6 */}
            <section
              id="privacy-controls"
              className="panel-card p-6 sm:p-8"
              style={{ borderColor: 'var(--ca-border)', background: 'var(--ca-surface)' }}
            >
              <div className="flex items-center gap-2.5 text-primary">
                <Eye size={18} className="themed-link" />
                <h2 className="font-display text-lg font-bold sm:text-xl">6. Privacy Controls & Your Rights</h2>
              </div>
              <div className="mt-4 space-y-4 text-xs sm:text-sm leading-relaxed text-muted">
                <p>
                  You hold complete control over how your developer profile and activity are shared across Prismcode. In your{' '}
                  <Link to="/settings" className="themed-link underline font-medium">Settings &gt; Privacy Preferences</Link>, you can configure:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="rounded-xl border p-3.5" style={{ borderColor: 'var(--ca-border)', background: 'var(--ca-surface-muted)' }}>
                    <p className="font-bold text-primary">Profile Visibility</p>
                    <p className="mt-1 text-muted">Toggle between <strong>Public</strong> (visible on leaderboard and profile views) and <strong>Private</strong> (hidden from global search and directory).</p>
                  </div>
                  <div className="rounded-xl border p-3.5" style={{ borderColor: 'var(--ca-border)', background: 'var(--ca-surface-muted)' }}>
                    <p className="font-bold text-primary">Data Masking</p>
                    <p className="mt-1 text-muted">Selectively hide or reveal your email, affiliation, geographic location, activity heatmap, and achievement badges.</p>
                  </div>
                </div>

                <p>
                  In accordance with applicable global privacy laws, you possess the right to:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>Access & Portability:</strong> Request a full copy of your registered profile and submission history.</li>
                  <li><strong>Correction:</strong> Update or rectify your profile metadata at any time in <Link to="/profile" className="themed-link">Profile Settings</Link>.</li>
                  <li><strong>Erasure (Right to be Forgotten):</strong> Request the permanent deletion of your account and associated code submissions.</li>
                </ul>
              </div>
            </section>

            {/* Section 7 */}
            <section
              id="data-security"
              className="panel-card p-6 sm:p-8"
              style={{ borderColor: 'var(--ca-border)', background: 'var(--ca-surface)' }}
            >
              <div className="flex items-center gap-2.5 text-primary">
                <Shield size={18} className="themed-link" />
                <h2 className="font-display text-lg font-bold sm:text-xl">7. Data Security Architecture</h2>
              </div>
              <div className="mt-4 space-y-3 text-xs sm:text-sm leading-relaxed text-muted">
                <p>
                  PrismCode applies industry-standard technical and operational safeguards:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Cryptographic Password Hashing:</strong> Passwords are salt-hashed using <strong>bcrypt</strong> (10 salt rounds). Plain-text passwords never touch logs, storage, or external networks.</li>
                  <li><strong>Cookie Security:</strong> Session cookies are marked <code className="font-mono">HttpOnly</code>, preventing client-side JavaScript access and XSS interception, with strict <code className="font-mono">SameSite</code> CSRF protections.</li>
                  <li><strong>Execution Isolation:</strong> All remote code execution runs inside ephemeral, restricted virtual containers with zero host filesystem access and network socket restrictions.</li>
                  <li><strong>Transport Layer Security:</strong> All client-to-server and backend-to-subprocessor communications are encrypted in transit via TLS 1.3 / HTTPS.</li>
                </ul>
              </div>
            </section>

            {/* Section 8 */}
            <section
              id="data-retention"
              className="panel-card p-6 sm:p-8"
              style={{ borderColor: 'var(--ca-border)', background: 'var(--ca-surface)' }}
            >
              <div className="flex items-center gap-2.5 text-primary">
                <Database size={18} className="themed-link" />
                <h2 className="font-display text-lg font-bold sm:text-xl">8. Data Retention & Deletion</h2>
              </div>
              <div className="mt-4 space-y-3 text-xs sm:text-sm leading-relaxed text-muted">
                <p>
                  We retain user account data for as long as your account remains active. Code submission history is preserved to populate your skill mastery diagrams and progress logs.
                </p>
                <p>
                  If you close your account or request data deletion via <a href="mailto:privacy@codearena.com" className="themed-link">privacy@codearena.com</a>,
                  we permanently scrub your personal identifiers, email, password hashes, and user records within 30 business days.
                </p>
              </div>
            </section>

            {/* Section 9 */}
            <section
              id="international"
              className="panel-card p-6 sm:p-8"
              style={{ borderColor: 'var(--ca-border)', background: 'var(--ca-surface)' }}
            >
              <div className="flex items-center gap-2.5 text-primary">
                <UserCheck size={18} className="themed-link" />
                <h2 className="font-display text-lg font-bold sm:text-xl">9. GDPR & CCPA Compliance</h2>
              </div>
              <div className="mt-4 space-y-3 text-xs sm:text-sm leading-relaxed text-muted">
                <p>
                  <strong>For European Economic Area (EEA) & UK Users (GDPR):</strong> We process personal data under legitimate interests (providing coding platform functionality), contract fulfillment (user account agreement), and legal compliance.
                </p>
                <p>
                  <strong>For California Residents (CCPA / CPRA):</strong> We do not sell or share personal information with third parties for cross-context behavioral advertising. You possess the right to know what personal data is collected and request deletion without discrimination.
                </p>
              </div>
            </section>

            {/* Section 10 */}
            <section
              id="children"
              className="panel-card p-6 sm:p-8"
              style={{ borderColor: 'var(--ca-border)', background: 'var(--ca-surface)' }}
            >
              <div className="flex items-center gap-2.5 text-primary">
                <AlertTriangle size={18} className="text-amber-500" />
                <h2 className="font-display text-lg font-bold sm:text-xl">10. Children’s Privacy</h2>
              </div>
              <div className="mt-4 space-y-3 text-xs sm:text-sm leading-relaxed text-muted">
                <p>
                  Prismcode is intended for developers, students, and professionals aged 13 and older (or 16 in specific European jurisdictions). We do not knowingly collect personal information from children under 13.
                  If you believe a minor has registered without parental authorization, please contact us for immediate account removal.
                </p>
              </div>
            </section>

            {/* Section 11 */}
            <section
              id="changes"
              className="panel-card p-6 sm:p-8"
              style={{ borderColor: 'var(--ca-border)', background: 'var(--ca-surface)' }}
            >
              <div className="flex items-center gap-2.5 text-primary">
                <FileText size={18} className="themed-link" />
                <h2 className="font-display text-lg font-bold sm:text-xl">11. Policy Updates</h2>
              </div>
              <div className="mt-4 space-y-3 text-xs sm:text-sm leading-relaxed text-muted">
                <p>
                  We may periodically revise this Privacy Policy to reflect platform enhancements, new programming language compilers, or legal developments.
                  When material revisions occur, we will update the &ldquo;Effective Date&rdquo; at the top of this document and notify active users via platform banners or email notices.
                </p>
              </div>
            </section>

            {/* Section 12 */}
            <section
              id="contact"
              className="panel-card p-6 sm:p-8"
              style={{ borderColor: 'var(--ca-border)', background: 'var(--ca-surface)' }}
            >
              <div className="flex items-center gap-2.5 text-primary">
                <Mail size={18} className="themed-link" />
                <h2 className="font-display text-lg font-bold sm:text-xl">12. Contact & Data Protection Officer</h2>
              </div>
              <div className="mt-4 space-y-3 text-xs sm:text-sm leading-relaxed text-muted">
                <p>
                  For any privacy inquiries, data deletion requests, or security disclosures, please reach out to our team:
                </p>
                <div className="rounded-xl border p-4 space-y-1.5 font-mono text-xs" style={{ borderColor: 'var(--ca-border)', background: 'var(--ca-surface-muted)' }}>
                  <p className="font-bold text-primary">CodeArena Security & Privacy Operations</p>
                  <p>Email: <a href="mailto:privacy@codearena.com" className="themed-link">privacy@codearena.com</a></p>
                  <p>Support: <a href="mailto:support@codearena.com" className="themed-link">support@codearena.com</a></p>
                </div>
              </div>
            </section>
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
}
