import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Award,
  CheckCircle2,
  Copy,
  ExternalLink,
  GraduationCap,
  Linkedin,
  Printer,
  Share2,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Code2,
} from 'lucide-react';
import { verifyCertificate, type VerifyCertificateResponse } from '../services/certificatesService';
import {
  getLinkedInCertAddUrl,
  getLinkedInSharePostUrl,
  generateCertificateAnnouncement,
} from '../lib/certificates';

export default function CertificateVerification() {
  const { certId } = useParams<{ certId: string }>();
  const [data, setData] = useState<VerifyCertificateResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!certId) {
      setError('Certificate ID is required.');
      setLoading(false);
      return;
    }

    verifyCertificate(certId)
      .then((res) => {
        setData(res);
        setLoading(false);
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : 'Invalid or expired certificate');
        setLoading(false);
      });
  }, [certId]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 p-4">
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-amber-500 border-t-transparent" />
          <p className="text-sm font-semibold text-muted">Verifying credential on Refract Labs ledger...</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 p-4">
        <div className="max-w-md w-full rounded-2xl border border-rose-500/30 bg-slate-900 p-8 text-center shadow-2xl">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-500/20 text-rose-400 border border-rose-500/30">
            <ShieldCheck size={28} />
          </div>
          <h2 className="mt-4 text-xl font-extrabold text-primary">Certificate Not Found</h2>
          <p className="mt-2 text-xs text-muted leading-relaxed">
            The certificate identifier <code className="text-rose-400 font-mono">{certId}</code> could not be verified on the official PrismCode credential registry.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <Link
              to="/problems"
              className="inline-flex items-center gap-2 rounded-xl bg-amber-500 hover:bg-amber-400 px-4 py-2 text-xs font-bold text-slate-950 transition-all"
            >
              <span>Explore PrismCode</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const { certificate, recipient, issuer } = data;
  const issueDate = new Date(certificate.issueDate).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const linkedInAddUrl = getLinkedInCertAddUrl(certificate, window.location.origin);
  const linkedInShareUrl = getLinkedInSharePostUrl(window.location.href);

  return (
    <div className="min-h-screen bg-slate-950 py-10 px-4 sm:px-6 lg:px-8 text-primary font-sans selection:bg-amber-500/30">
      <div className="mx-auto max-w-4xl">
        {/* Verification Status Banner */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-5 py-3.5 backdrop-blur-md">
          <div className="flex items-center gap-2.5">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
              <CheckCircle2 size={16} />
            </span>
            <span className="text-xs font-bold text-emerald-400">
              Officially Verified Credential • Issued by {issuer.organization} ({issuer.division})
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800/80 px-2.5 py-1 text-xs font-semibold text-primary hover:bg-slate-700 transition-all"
            >
              {copied ? <CheckCircle2 size={12} className="text-emerald-400" /> : <Copy size={12} />}
              <span>{copied ? 'Link Copied' : 'Copy Verified Link'}</span>
            </button>
          </div>
        </div>

        {/* High-Prestige Certificate Canvas (Printable / Shareable) */}
        <div
          id="certificate-frame"
          className="relative overflow-hidden rounded-3xl border-4 border-amber-500/40 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 p-8 sm:p-14 shadow-2xl shadow-amber-500/10"
        >
          {/* Decorative Corner Ornaments */}
          <div className="pointer-events-none absolute top-4 left-4 h-12 w-12 border-t-2 border-l-2 border-amber-500/60" />
          <div className="pointer-events-none absolute top-4 right-4 h-12 w-12 border-t-2 border-r-2 border-amber-500/60" />
          <div className="pointer-events-none absolute bottom-4 left-4 h-12 w-12 border-b-2 border-l-2 border-amber-500/60" />
          <div className="pointer-events-none absolute bottom-4 right-4 h-12 w-12 border-b-2 border-r-2 border-amber-500/60" />

          {/* Watermark Crest */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-5 text-amber-400">
            <ShieldCheck size={400} />
          </div>

          <div className="relative z-10 text-center">
            {/* Seal & Logo */}
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl border-2 border-amber-500/50 bg-gradient-to-br from-amber-400/20 via-yellow-500/10 to-amber-600/30 text-amber-400 shadow-xl shadow-amber-500/20">
              <GraduationCap size={40} />
            </div>

            <p className="mt-6 text-xs font-bold uppercase tracking-[0.3em] text-amber-400">
              Refract Labs • PrismCode Certification Authority
            </p>

            <h1 className="mt-3 font-serif text-2xl font-bold tracking-tight text-white sm:text-4xl">
              Certificate of Verified Mastery
            </h1>

            <p className="mt-6 text-xs sm:text-sm font-medium text-slate-400">
              This credential certifies that
            </p>

            {/* Recipient Name in High-Prestige Typography */}
            <div className="mt-3 border-b-2 border-amber-500/40 pb-2 inline-block max-w-full">
              <span className="font-serif text-3xl font-extrabold tracking-wide text-amber-300 sm:text-5xl">
                {recipient.name}
              </span>
            </div>

            <p className="mt-4 text-xs sm:text-sm font-medium text-slate-400">
              has demonstrated verified algorithmic proficiency and successfully conquered the curriculum for
            </p>

            {/* Track Title */}
            <h2 className="mt-2 text-xl font-extrabold text-white sm:text-2xl">
              {certificate.title}
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-xs sm:text-sm text-slate-400 leading-relaxed">
              {certificate.description}
            </p>

            {/* Verified Metrics Badge Strip */}
            <div className="mx-auto mt-8 grid max-w-xl grid-cols-3 gap-3 rounded-2xl border border-amber-500/20 bg-slate-900/60 p-4 text-center backdrop-blur-md">
              <div>
                <p className="text-[10px] uppercase font-bold text-slate-400">Verified Solves</p>
                <p className="text-xl font-extrabold text-amber-400 tabular-nums">
                  {certificate.metrics.solvedCount}
                </p>
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-slate-400">Medium & Hard Tier</p>
                <p className="text-xl font-extrabold text-amber-300 tabular-nums">
                  {certificate.metrics.mediumCount + certificate.metrics.hardCount}
                </p>
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-slate-400">Verification Ledger</p>
                <p className="text-xs font-bold text-emerald-400 mt-1 flex items-center justify-center gap-1">
                  <CheckCircle2 size={13} />
                  <span>Valid</span>
                </p>
              </div>
            </div>

            {/* Skills */}
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {certificate.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-slate-700/60 bg-slate-800/40 px-3 py-1 text-xs font-medium text-slate-300"
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* Bottom Certificate Meta: Signatures & Hash */}
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-slate-800/80 pt-6 text-left">
              <div>
                <p className="text-[10px] uppercase tracking-wider text-muted font-bold">Credential Identifier</p>
                <p className="text-xs font-mono font-bold text-slate-200 select-all">{certificate.id}</p>
                <p className="text-[10px] text-muted mt-0.5">SHA-256: {certificate.credentialHash.slice(0, 24)}...</p>
              </div>

              <div className="text-center sm:text-right">
                <p className="text-[10px] uppercase tracking-wider text-muted font-bold">Issue Date</p>
                <p className="text-xs font-bold text-slate-200">{issueDate}</p>
                <p className="text-[10px] text-emerald-400 font-semibold mt-0.5">PrismCode Ledger Authority</p>
              </div>
            </div>
          </div>
        </div>

        {/* Social Sharing & Action Bar (LinkedIn Growth Engine) */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-xl backdrop-blur-md">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/20 text-[#0A66C2]">
              <Linkedin size={22} className="fill-current" />
            </span>
            <div>
              <p className="text-sm font-bold text-primary">Post this credential to your LinkedIn profile</p>
              <p className="text-xs text-muted">Directly adds to your Licenses & Certifications with verified proof.</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
            {/* 1-Click Official Add to LinkedIn */}
            <a
              href={linkedInAddUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 rounded-xl bg-[#0A66C2] hover:bg-[#004182] px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-blue-500/20 transition-all"
            >
              <Linkedin size={15} className="fill-current" />
              <span>Add to LinkedIn Profile</span>
            </a>

            {/* Share Post on LinkedIn */}
            <a
              href={linkedInShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800 px-3 py-2.5 text-xs font-bold text-primary hover:bg-slate-700 transition-all"
            >
              <Share2 size={14} />
              <span>Share Feed Post</span>
            </a>

            {/* Print / Save PDF */}
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800 px-3 py-2.5 text-xs font-bold text-primary hover:bg-slate-700 transition-all"
              title="Print or Save Certificate as PDF"
            >
              <Printer size={14} />
              <span>Print / PDF</span>
            </button>
          </div>
        </div>

        {/* Free Marketing / Referral Conversion Banner for Visitors */}
        <div className="mt-8 overflow-hidden rounded-2xl border border-amber-500/20 bg-gradient-to-r from-amber-500/10 via-purple-500/5 to-indigo-500/10 p-6 sm:p-8 backdrop-blur-md">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/20 px-3 py-0.5 text-xs font-bold text-amber-400 border border-amber-500/30">
                <Sparkles size={12} />
                <span>PrismCode Algorithmic Training</span>
              </span>
              <h3 className="mt-2 text-lg font-bold text-white sm:text-xl">
                Ready to earn your own verified algorithmic certification?
              </h3>
              <p className="mt-1 text-xs text-muted max-w-xl">
                Solve LeetCode-style algorithmic challenges with isolated container execution, automated subgoals, and verified credentials for your resume and LinkedIn.
              </p>
            </div>

            <Link
              to="/register"
              className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 px-5 py-3 text-xs font-bold text-slate-950 shadow-lg shadow-amber-500/20 transition-all"
            >
              <span>Start Solving Free</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
