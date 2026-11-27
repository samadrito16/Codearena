import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  CheckCircle2,
  Copy,
  ExternalLink,
  GraduationCap,
  Linkedin,
  Share2,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import {
  getLinkedInCertAddUrl,
  getLinkedInSharePostUrl,
  generateCertificateAnnouncement,
} from '../../lib/certificates';
import type { IssuedCertificate } from '../../types';

interface CertificateCardProps {
  certificate: IssuedCertificate;
  isOwner?: boolean;
}

export default function CertificateCard({ certificate, isOwner = false }: CertificateCardProps) {
  const [copied, setCopied] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const issueDateFormatted = new Date(certificate.issueDate).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  const appOrigin = typeof window !== 'undefined' ? window.location.origin : '';
  const verifyUrl = `${appOrigin}/verify/${certificate.id}`;
  const linkedInAddUrl = getLinkedInCertAddUrl(certificate, appOrigin);
  const linkedInShareUrl = getLinkedInSharePostUrl(verifyUrl);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(verifyUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyAnnouncement = () => {
    const text = generateCertificateAnnouncement(certificate, verifyUrl);
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <div className="relative overflow-hidden rounded-2xl border border-amber-500/30 bg-linear-to-br from-amber-500/10 via-slate-900/60 to-purple-950/20 p-5 shadow-lg shadow-amber-500/5 backdrop-blur-md transition-all duration-300 hover:border-amber-500/50 hover:shadow-amber-500/10">
        {/* Holographic PrismCode Seal Watermark */}
        <div className="pointer-events-none absolute -right-6 -bottom-6 opacity-10 text-amber-400">
          <ShieldCheck size={160} />
        </div>

        {/* Top Header: Badge, Issuer & Credential ID */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-amber-500/20 pb-3">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <GraduationCap size={16} />
            </span>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-amber-400">
                PrismCode • Verified Credential
              </p>
              <p className="text-[11px] font-medium text-muted">Issued on {issueDateFormatted}</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 rounded-md border border-slate-700/60 bg-slate-900/80 px-2 py-0.5 text-[10px] font-mono text-muted">
            <ShieldCheck size={12} className="text-emerald-400" />
            <span className="select-all">{certificate.id}</span>
          </div>
        </div>

        {/* Certificate Title & Recipient */}
        <div className="mt-3.5">
          <h3 className="text-base font-extrabold text-primary tracking-tight sm:text-lg">
            {certificate.title}
          </h3>
          <p className="mt-1 text-xs text-muted leading-relaxed line-clamp-2">
            {certificate.description}
          </p>
        </div>

        {/* Key Metrics */}
        <div className="mt-3.5 grid grid-cols-3 gap-2 rounded-xl border border-slate-800/80 bg-slate-900/50 p-2.5 text-center">
          <div>
            <p className="text-[10px] uppercase font-semibold text-muted">Solved</p>
            <p className="text-sm font-extrabold text-primary tabular-nums">{certificate.metrics.solvedCount}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase font-semibold text-muted">Mediums</p>
            <p className="text-sm font-extrabold text-amber-400 tabular-nums">{certificate.metrics.mediumCount}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase font-semibold text-muted">Hards</p>
            <p className="text-sm font-extrabold text-rose-400 tabular-nums">{certificate.metrics.hardCount}</p>
          </div>
        </div>

        {/* Skills pills */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {certificate.skills.map((skill) => (
            <span
              key={skill}
              className="rounded-md border border-slate-700/50 bg-slate-800/40 px-2 py-0.5 text-[10px] font-medium text-slate-300"
            >
              {skill}
            </span>
          ))}
        </div>

        {/* Actions: Add to LinkedIn & View Certificate */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-slate-800/60">
          <Link
            to={`/verify/${certificate.id}`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-amber-400 transition-colors"
          >
            <span>View Proof Page</span>
            <ExternalLink size={13} />
          </Link>

          <div className="flex items-center gap-2">
            {/* 1-Click Add to LinkedIn Profile */}
            <a
              href={linkedInAddUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#0A66C2] hover:bg-[#004182] px-3 py-1.5 text-xs font-bold text-white shadow-xs transition-all"
              title="Add this verified certificate directly to your LinkedIn Licenses & Certifications"
            >
              <Linkedin size={14} className="fill-current" />
              <span>Add to LinkedIn</span>
            </a>

            {/* Share Menu */}
            <button
              type="button"
              onClick={() => setIsShareModalOpen(true)}
              className="inline-flex items-center gap-1 rounded-lg border border-slate-700 bg-slate-800/80 px-2.5 py-1.5 text-xs font-semibold text-primary hover:bg-slate-700 transition-all"
              title="Share certificate"
            >
              <Share2 size={13} />
              <span>Share</span>
            </button>
          </div>
        </div>
      </div>

      {/* Share Modal Dialog */}
      {isShareModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
        >
          <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl text-primary">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Sparkles size={18} className="text-amber-400" />
                <h4 className="text-base font-bold">Share Verified Credential</h4>
              </div>
              <button
                type="button"
                onClick={() => setIsShareModalOpen(false)}
                className="text-muted hover:text-primary transition-colors text-sm"
              >
                ✕
              </button>
            </div>

            <p className="mt-3 text-xs text-muted leading-relaxed">
              Share your official certificate with recruiters and peers. Anyone can verify your solve count and runtime metrics.
            </p>

            <div className="mt-4 space-y-3">
              {/* Direct LinkedIn Share */}
              <a
                href={linkedInShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between w-full p-3 rounded-xl border border-blue-500/30 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 transition-all font-semibold text-xs"
              >
                <div className="flex items-center gap-2">
                  <Linkedin size={18} className="fill-current text-[#0A66C2]" />
                  <span>Post announcement on LinkedIn Feed</span>
                </div>
                <ExternalLink size={14} />
              </a>

              {/* Pre-composed Announcement Text */}
              <div>
                <label className="text-[11px] font-semibold text-muted block mb-1">
                  Pre-composed LinkedIn / Resume Announcement
                </label>
                <textarea
                  readOnly
                  rows={4}
                  value={generateCertificateAnnouncement(certificate, verifyUrl)}
                  className="w-full rounded-xl border border-slate-800 bg-slate-950/80 p-2.5 text-xs text-slate-300 font-mono resize-none focus:outline-hidden"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={handleCopyAnnouncement}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-all"
                >
                  {copied ? <CheckCircle2 size={14} /> : <Copy size={14} />}
                  <span>{copied ? 'Copied Announcement!' : 'Copy Announcement Text'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 text-primary font-semibold text-xs transition-all"
                >
                  <Copy size={14} />
                  <span>Copy Link</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
