import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PrismMark } from '../components/PrismLogo';
import {
  Code2,
  FileText,
  Shield,
  Terminal,
  AlertTriangle,
  Scale,
  Award,
  CheckCircle2,
  Printer,
  ChevronRight,
  Mail,
  Zap,
  Lock,
} from 'lucide-react';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';

export default function TermsOfService() {
  const { user } = useAuth();
  const { theme, setTheme } = useApp();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Terms of Service | Prismcode';
  }, []);

  const sections = [
    { id: 'acceptance', label: '1. Acceptance of Terms' },
    { id: 'accounts', label: '2. User Accounts & Security' },
    { id: 'sandbox-security', label: '3. Sandbox & Acceptable Use' },
    { id: 'intellectual-property', label: '4. Intellectual Property & Code Ownership' },
    { id: 'anti-cheating', label: '5. Leaderboard & Fair Play' },
    { id: 'compiler-disclaimer', label: '6. Compiler Execution & SLA' },
    { id: 'warranties', label: '7. Disclaimer of Warranties' },
    { id: 'liability', label: '8. Limitation of Liability' },
    { id: 'indemnity', label: '9. Indemnification' },
    { id: 'termination', label: '10. Suspension & Termination' },
    { id: 'governing-law', label: '11. Governing Law & Disputes' },
    { id: 'modifications', label: '12. Modifications to Terms' },
    { id: 'contact', label: '13. Legal Contact' },
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
              to="/privacy"
              className="btn-secondary hidden h-8 px-3 text-xs sm:inline-flex items-center gap-1.5"
            >
              <Shield size={13} />
              <span>Privacy Policy</span>
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
          <span className="text-primary font-medium">Terms of Service</span>
        </nav>

        {/* Hero Title Card */}
        <div
          className="panel-card relative overflow-hidden p-6 sm:p-8 mb-8"
          style={{ borderColor: 'var(--ca-border)', background: 'var(--ca-surface)' }}
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold text-sky-600 dark:text-sky-400 bg-sky-500/10 border border-sky-500/20 mb-3">
                <Scale size={13} />
                <span>Developer Agreement & Acceptable Use</span>
              </div>
              <h1 className="font-display text-2xl font-bold tracking-tight text-primary sm:text-3xl">
                Prismcode Terms of Service
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
                <span>Print Terms</span>
              </button>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-2 text-xs text-muted">
            <span className="rounded-lg px-2.5 py-1" style={{ background: 'var(--ca-surface-muted)', border: '1px solid var(--ca-border)' }}>
              &bull; 100% User Code Ownership
            </span>
            <span className="rounded-lg px-2.5 py-1" style={{ background: 'var(--ca-surface-muted)', border: '1px solid var(--ca-border)' }}>
              &bull; Zero Cryptomining / Exploit Tolerance
            </span>
            <span className="rounded-lg px-2.5 py-1" style={{ background: 'var(--ca-surface-muted)', border: '1px solid var(--ca-border)' }}>
              &bull; Real-time Sandboxed Grading
            </span>
            <span className="rounded-lg px-2.5 py-1" style={{ background: 'var(--ca-surface-muted)', border: '1px solid var(--ca-border)' }}>
              &bull; Fair Play Leaderboards
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
                <p className="font-semibold text-primary">Questions About Our Terms?</p>
                <p className="mt-1">Contact our legal team at:</p>
                <a href="mailto:legal@refractlabs.com" className="mt-1 inline-flex items-center gap-1 themed-link font-mono text-[11px]">
                  <Mail size={12} />
                  legal@refractlabs.com
                </a>
              </div>
            </div>
          </aside>

          {/* Document Content Column */}
          <article className="lg:col-span-3 space-y-8">
            {/* Section 1 */}
            <section
              id="acceptance"
              className="panel-card p-6 sm:p-8"
              style={{ borderColor: 'var(--ca-border)', background: 'var(--ca-surface)' }}
            >
              <div className="flex items-center gap-2.5 text-primary">
                <FileText size={18} className="themed-link" />
                <h2 className="font-display text-lg font-bold sm:text-xl">1. Acceptance of Terms & Eligibility</h2>
              </div>
              <div className="mt-4 space-y-3 text-xs sm:text-sm leading-relaxed text-muted">
                <p>
                  These Terms of Service (&ldquo;Terms&rdquo;) represent a legally binding agreement between you (&ldquo;User&rdquo;,
                  &ldquo;you&rdquo;) and <strong>Refract Labs</strong> (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;the Company&rdquo;), operator of <strong>Prismcode</strong> (&ldquo;the Platform&rdquo;).
                  By accessing Prismcode, registering an account, writing code in the workspace, or submitting solutions to our compiler,
                  you explicitly accept and agree to comply with these Terms.
                </p>
                <p>
                  <strong>Eligibility:</strong> You must be at least 13 years of age (or the minimum legal age for digital consent in your jurisdiction)
                  to use Prismcode. If you are accessing the platform on behalf of a company, educational institution, or organization,
                  you warrant that you have authority to bind that entity to these Terms.
                </p>
              </div>
            </section>

            {/* Section 2 */}
            <section
              id="accounts"
              className="panel-card p-6 sm:p-8"
              style={{ borderColor: 'var(--ca-border)', background: 'var(--ca-surface)' }}
            >
              <div className="flex items-center gap-2.5 text-primary">
                <Lock size={18} className="themed-link" />
                <h2 className="font-display text-lg font-bold sm:text-xl">2. User Accounts & Security</h2>
              </div>
              <div className="mt-4 space-y-3 text-xs sm:text-sm leading-relaxed text-muted">
                <p>
                  To unlock full platform capabilities (including persistent progress tracking, streak history, and competitive leaderboard placement),
                  you must register an account.
                </p>
                <ul className="list-disc pl-5 space-y-1.5">
                  <li><strong>Account Accuracy:</strong> You agree to provide accurate, current, and complete registration information and keep your email address updated.</li>
                  <li><strong>Credential Safeguarding:</strong> You are solely responsible for maintaining the confidentiality of your password and active session tokens. You agree not to share your account credentials with third parties.</li>
                  <li><strong>Notification of Breach:</strong> If you suspect unauthorized access or credential leakage, you must notify Refract Labs immediately at <a href="mailto:security@refractlabs.com" className="themed-link">security@refractlabs.com</a>.</li>
                </ul>
              </div>
            </section>

            {/* Section 3 - Critical Acceptable Use */}
            <section
              id="sandbox-security"
              className="panel-card p-6 sm:p-8 border-l-4 border-l-amber-500"
              style={{ borderColor: 'var(--ca-border)', background: 'var(--ca-surface)' }}
            >
              <div className="flex items-center gap-2.5 text-primary">
                <Terminal size={18} className="text-amber-500" />
                <h2 className="font-display text-lg font-bold sm:text-xl">
                  3. Online Code Execution & Sandbox Acceptable Use Policy
                </h2>
              </div>
              <div className="mt-4 space-y-4 text-xs sm:text-sm leading-relaxed text-muted">
                <p>
                  Prismcode provides remote and local code execution capabilities powered by OnlineCompiler.io and isolated sandbox containers.
                  The execution environment is engineered exclusively for compiling, evaluating, and benchmarking algorithmic solutions to coding challenges.
                </p>

                <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-4 text-xs">
                  <h3 className="font-bold text-rose-700 dark:text-rose-300 flex items-center gap-1.5">
                    <AlertTriangle size={15} />
                    STRICTLY PROHIBITED EXECUTION ACTIVITIES
                  </h3>
                  <p className="mt-1 text-muted">
                    Any user code submission containing, attempting, or facilitating any of the following constitutes a severe breach of these Terms:
                  </p>
                  <ul className="mt-2 list-disc pl-5 space-y-1.5 text-rose-900 dark:text-rose-200">
                    <li><strong>Cryptocurrency Mining:</strong> Running crypto mining algorithms, proof-of-work scripts, or distributed computing operations.</li>
                    <li><strong>Network & Denial-of-Service Attacks:</strong> Initiating outbound TCP/UDP socket connections, port scanning, network probing, packet flooding, or DDoS attacks against any host or subnet.</li>
                    <li><strong>Malicious Code & Exploits:</strong> Compiling, deploying, or testing malware, ransomware, spyware, Trojan horses, rootkits, or keyloggers.</li>
                    <li><strong>Sandbox Escape Attempts:</strong> Attempting to escape VM or container boundaries, access host filesystems (<code className="font-mono">/etc</code>, host environment variables, process trees), elevate privileges, or spawn fork bombs.</li>
                    <li><strong>Resource Exhaustion:</strong> Bypassing enforced execution limits (5-second CPU time limit, 256MB RAM per test case) or attempting memory overflow attacks.</li>
                  </ul>
                </div>

                <p>
                  <strong>Enforcement & Sanctions:</strong> Submissions are automatically monitored by real-time safety heuristics.
                  Any violation will trigger immediate termination of the execution process, permanent account revocation, and IP subnet blocking.
                  Severe infractions may be referred to competent law enforcement authorities.
                </p>
              </div>
            </section>

            {/* Section 4 - Intellectual Property & Code Ownership */}
            <section
              id="intellectual-property"
              className="panel-card p-6 sm:p-8"
              style={{ borderColor: 'var(--ca-border)', background: 'var(--ca-surface)' }}
            >
              <div className="flex items-center gap-2.5 text-primary">
                <Award size={18} className="themed-link" />
                <h2 className="font-display text-lg font-bold sm:text-xl">
                  4. Intellectual Property & Code Ownership
                </h2>
              </div>
              <div className="mt-4 space-y-4 text-xs sm:text-sm leading-relaxed text-muted">
                <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-xs text-primary">
                  <h3 className="font-bold text-emerald-700 dark:text-emerald-300 flex items-center gap-1.5">
                    <CheckCircle2 size={15} />
                    YOU OWN YOUR CODE
                  </h3>
                  <p className="mt-1 leading-relaxed">
                    You retain 100% intellectual property, copyright, and full ownership of all original source code, algorithms,
                    and solutions you create and write in Prismcode.
                  </p>
                </div>

                <div className="space-y-3">
                  <p>
                    <strong>Limited Operational License to Prismcode:</strong> By submitting code to the platform (via &ldquo;Run&rdquo; or &ldquo;Submit&rdquo;),
                    you grant Prismcode and Refract Labs a worldwide, non-exclusive, royalty-free, perpetual license solely to:
                  </p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Transmit, compile, run, and evaluate your code in our execution sandboxes against automated test cases.</li>
                    <li>Store execution diagnostics (runtimes, memory usage, outcome status) and link them to your practice record.</li>
                    <li>Display your achievements, rankings, and public profile metrics in accordance with your chosen <Link to="/settings" className="themed-link">Privacy Preferences</Link>.</li>
                  </ul>

                  <p className="mt-4">
                    <strong>Prismcode Proprietary Assets:</strong> All Prismcode brand assets, logos, user interfaces, problem descriptions,
                    test case suites, editorial solutions, curriculum roadmaps, and software infrastructure are the intellectual property of Refract Labs
                    and protected by international copyright and trademark laws.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 5 */}
            <section
              id="anti-cheating"
              className="panel-card p-6 sm:p-8"
              style={{ borderColor: 'var(--ca-border)', background: 'var(--ca-surface)' }}
            >
              <div className="flex items-center gap-2.5 text-primary">
                <Zap size={18} className="themed-link" />
                <h2 className="font-display text-lg font-bold sm:text-xl">5. Leaderboard Integrity & Fair Play</h2>
              </div>
              <div className="mt-4 space-y-3 text-xs sm:text-sm leading-relaxed text-muted">
                <p>
                  Prismcode maintains competitive leaderboards to foster legitimate learning and skill benchmarking.
                  Users agree to adhere to our Fair Play standards:
                </p>
                <ul className="list-disc pl-5 space-y-1.5">
                  <li><strong>No Automated Bot Submissions:</strong> You may not use automated bots, headless scripts, or submission flooding to artificially manipulate leaderboard rankings or solve streaks.</li>
                  <li><strong>Single Account Policy:</strong> Users may not register multiple accounts to game contest rankings or spoof ratings.</li>
                  <li><strong>Plagiarism & Exploitation:</strong> Exploiting known test case edge-case leaks or submitting precomputed lookups without solving the underlying algorithm violates the spirit of fair competition and may result in score resets.</li>
                </ul>
              </div>
            </section>

            {/* Section 6 */}
            <section
              id="compiler-disclaimer"
              className="panel-card p-6 sm:p-8"
              style={{ borderColor: 'var(--ca-border)', background: 'var(--ca-surface)' }}
            >
              <div className="flex items-center gap-2.5 text-primary">
                <Terminal size={18} className="themed-link" />
                <h2 className="font-display text-lg font-bold sm:text-xl">6. Compiler Execution & Service Level Expectations</h2>
              </div>
              <div className="mt-4 space-y-3 text-xs sm:text-sm leading-relaxed text-muted">
                <p>
                  Prismcode provides remote code execution via third-party providers (OnlineCompiler.io) and offline execution sandboxes.
                  While we strive for sub-second grading latency and high availability:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>We do not guarantee uninterrupted uptime, zero compiler queuing latency, or zero packet loss during peak load.</li>
                  <li>Execution limits (5-second timeout, 256MB memory cap) are immutable and strictly enforced.</li>
                  <li>In-progress code drafts in your browser editor are saved to browser LocalStorage; however, users are advised to maintain local backups of significant codebases.</li>
                </ul>
              </div>
            </section>

            {/* Section 7 */}
            <section
              id="warranties"
              className="panel-card p-6 sm:p-8"
              style={{ borderColor: 'var(--ca-border)', background: 'var(--ca-surface)' }}
            >
              <div className="flex items-center gap-2.5 text-primary">
                <Shield size={18} className="themed-link" />
                <h2 className="font-display text-lg font-bold sm:text-xl">7. Disclaimer of Warranties</h2>
              </div>
              <div className="mt-4 space-y-3 text-xs sm:text-sm leading-relaxed text-muted">
                <p className="uppercase font-semibold text-xs tracking-wider text-primary">
                  THE PLATFORM IS PROVIDED ON AN &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE&rdquo; BASIS.
                </p>
                <p>
                  TO THE MAXIMUM EXTENT PERMITTED BY LAW, REFRACT LABS AND PRISMCODE EXPRESSLY DISCLAIM ALL WARRANTIES OF ANY KIND, WHETHER EXPRESS,
                  IMPLIED, STATUTORY, OR OTHERWISE, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE,
                  TITLE, AND NON-INFRINGEMENT. WE MAKE NO WARRANTY THAT THE SERVICES OR COMPILER RESULTS WILL BE ACCURATE, UNINTERRUPTED, OR FREE OF ERRORS.
                </p>
              </div>
            </section>

            {/* Section 8 */}
            <section
              id="liability"
              className="panel-card p-6 sm:p-8"
              style={{ borderColor: 'var(--ca-border)', background: 'var(--ca-surface)' }}
            >
              <div className="flex items-center gap-2.5 text-primary">
                <Scale size={18} className="themed-link" />
                <h2 className="font-display text-lg font-bold sm:text-xl">8. Limitation of Liability</h2>
              </div>
              <div className="mt-4 space-y-3 text-xs sm:text-sm leading-relaxed text-muted">
                <p>
                  UNDER NO CIRCUMSTANCES SHALL REFRACT LABS, PRISMCODE, ITS DIRECTORS, EMPLOYEES, AFFILIATES, OR COMPILER PROVIDERS BE LIABLE FOR ANY
                  INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES (INCLUDING LOSS OF DATA, REVENUE, PROFIT, OR BUSINESS INTERRUPTION)
                  ARISING OUT OF OR RELATING TO YOUR USE OR INABILITY TO USE THE PLATFORM OR COMPILER SERVICES.
                </p>
                <p>
                  OUR TOTAL AGGREGATE LIABILITY ARISING FROM ALL CLAIMS RELATING TO THE SERVICE SHALL NOT EXCEED THE GREATER OF ONE HUNDRED US DOLLARS ($100 USD)
                  OR THE TOTAL FEES PAID BY YOU TO REFRACT LABS IN THE TWELVE (12) MONTHS PRECEDING THE CLAIM.
                </p>
              </div>
            </section>

            {/* Section 9 */}
            <section
              id="indemnity"
              className="panel-card p-6 sm:p-8"
              style={{ borderColor: 'var(--ca-border)', background: 'var(--ca-surface)' }}
            >
              <div className="flex items-center gap-2.5 text-primary">
                <Shield size={18} className="themed-link" />
                <h2 className="font-display text-lg font-bold sm:text-xl">9. Indemnification</h2>
              </div>
              <div className="mt-4 space-y-3 text-xs sm:text-sm leading-relaxed text-muted">
                <p>
                  You agree to defend, indemnify, and hold harmless Refract Labs, Prismcode, and their affiliates from and against any claims, liabilities,
                  damages, judgments, awards, losses, costs, or expenses (including reasonable attorneys’ fees) arising out of or relating to
                  your violation of these Terms, your submitted source code, or your breach of the Sandbox Acceptable Use Policy.
                </p>
              </div>
            </section>

            {/* Section 10 */}
            <section
              id="termination"
              className="panel-card p-6 sm:p-8"
              style={{ borderColor: 'var(--ca-border)', background: 'var(--ca-surface)' }}
            >
              <div className="flex items-center gap-2.5 text-primary">
                <AlertTriangle size={18} className="themed-link" />
                <h2 className="font-display text-lg font-bold sm:text-xl">10. Account Suspension & Termination</h2>
              </div>
              <div className="mt-4 space-y-3 text-xs sm:text-sm leading-relaxed text-muted">
                <p>
                  We reserve the right, at our sole discretion, to suspend, disable, or permanently terminate your account without notice
                  if you engage in sandbox abuse, cryptocurrency mining, bot exploitation, or conduct detrimental to platform users.
                </p>
                <p>
                  You may terminate your account at any time by contacting our support team. Upon termination, relevant clauses regarding
                  intellectual property, liability limitations, and indemnity shall survive.
                </p>
              </div>
            </section>

            {/* Section 11 */}
            <section
              id="governing-law"
              className="panel-card p-6 sm:p-8"
              style={{ borderColor: 'var(--ca-border)', background: 'var(--ca-surface)' }}
            >
              <div className="flex items-center gap-2.5 text-primary">
                <Scale size={18} className="themed-link" />
                <h2 className="font-display text-lg font-bold sm:text-xl">11. Governing Law & Dispute Resolution</h2>
              </div>
              <div className="mt-4 space-y-3 text-xs sm:text-sm leading-relaxed text-muted">
                <p>
                  These Terms shall be governed and construed in accordance with the laws of the jurisdiction in which Refract Labs operates,
                  without regard to conflict of law principles. Any legal suit, action, or proceeding arising out of or related to these Terms
                  shall be instituted exclusively in competent courts located within our primary jurisdiction.
                </p>
              </div>
            </section>

            {/* Section 12 */}
            <section
              id="modifications"
              className="panel-card p-6 sm:p-8"
              style={{ borderColor: 'var(--ca-border)', background: 'var(--ca-surface)' }}
            >
              <div className="flex items-center gap-2.5 text-primary">
                <FileText size={18} className="themed-link" />
                <h2 className="font-display text-lg font-bold sm:text-xl">12. Modifications to Terms</h2>
              </div>
              <div className="mt-4 space-y-3 text-xs sm:text-sm leading-relaxed text-muted">
                <p>
                  Refract Labs reserves the right to modify these Terms at any time. When modifications occur, we will revise the &ldquo;Effective Date&rdquo;
                  at the top of this page. Your continued use of the platform after the effective date of revised Terms constitutes your acceptance of the changes.
                </p>
              </div>
            </section>

            {/* Section 13 */}
            <section
              id="contact"
              className="panel-card p-6 sm:p-8"
              style={{ borderColor: 'var(--ca-border)', background: 'var(--ca-surface)' }}
            >
              <div className="flex items-center gap-2.5 text-primary">
                <Mail size={18} className="themed-link" />
                <h2 className="font-display text-lg font-bold sm:text-xl">13. Legal Contact & Notices</h2>
              </div>
              <div className="mt-4 space-y-3 text-xs sm:text-sm leading-relaxed text-muted">
                <p>
                  If you have questions, feedback, or legal notices concerning these Terms of Service, please contact:
                </p>
                <div className="rounded-xl border p-4 space-y-1.5 font-mono text-xs" style={{ borderColor: 'var(--ca-border)', background: 'var(--ca-surface-muted)' }}>
                  <p className="font-bold text-primary">Refract Labs Legal Affairs</p>
                  <p>Email: <a href="mailto:legal@refractlabs.com" className="themed-link">legal@refractlabs.com</a></p>
                  <p>Security & DMCA: <a href="mailto:security@refractlabs.com" className="themed-link">security@refractlabs.com</a></p>
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
