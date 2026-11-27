import { useState } from 'react';
import { Award, CheckCircle2, Copy, ExternalLink, Lock, Share2, Sparkles } from 'lucide-react';
import { getBadgeTierClasses, getLinkedInSharePostUrl, generateBadgeAnnouncement } from '../../lib/certificates';
import type { VerifiedBadge } from '../../types';

interface VerifiedBadgeCardProps {
  badge: VerifiedBadge;
  profileUrl?: string;
  isOwner?: boolean;
}

export default function VerifiedBadgeCard({ badge, profileUrl, isOwner }: VerifiedBadgeCardProps) {
  const [copied, setCopied] = useState(false);
  const tierClasses = getBadgeTierClasses(badge.tier);

  const handleCopyHash = () => {
    if (!badge.verificationHash) return;
    navigator.clipboard.writeText(badge.verificationHash);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareLinkedIn = () => {
    const url = profileUrl || window.location.href;
    const shareUrl = getLinkedInSharePostUrl(url);
    window.open(shareUrl, '_blank', 'noopener,noreferrer,width=600,height=600');
  };

  return (
    <div
      className={`group relative flex flex-col justify-between p-4 rounded-xl border transition-all duration-300 ${
        badge.unlocked
          ? `${tierClasses.border} ${tierClasses.bg} ${tierClasses.glow}`
          : 'border-slate-800/80 bg-slate-900/30 opacity-60 hover:opacity-80'
      }`}
    >
      {/* Top row: Badge icon, category & tier */}
      <div>
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <div
              className={`p-2 rounded-lg border ${
                badge.unlocked
                  ? `${tierClasses.badgePill}`
                  : 'border-slate-800 bg-slate-800/60 text-slate-500'
              }`}
            >
              {badge.unlocked ? <Award size={20} className={tierClasses.text} /> : <Lock size={18} />}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-primary tracking-tight">{badge.title}</span>
                {badge.unlocked && (
                  <span title="Verified Credential" className="shrink-0 flex items-center">
                    <CheckCircle2 size={13} className="text-emerald-400" />
                  </span>
                )}
              </div>
              <span className="text-[10px] uppercase font-semibold text-muted tracking-wider">
                {badge.category} • {badge.tier}
              </span>
            </div>
          </div>

          {/* Tier Pill */}
          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase border ${tierClasses.badgePill}`}>
            {badge.tier}
          </span>
        </div>

        {/* Description */}
        <p className="mt-2.5 text-xs text-muted leading-relaxed">{badge.description}</p>
      </div>

      {/* Bottom row: Progress or Verification Details */}
      <div className="mt-4 pt-3 border-t border-slate-800/50">
        {badge.unlocked ? (
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-mono text-muted select-all">
                {badge.verificationHash || 'PRISM-VERIFIED'}
              </span>
              <button
                type="button"
                onClick={handleCopyHash}
                className="p-1 rounded-sm text-muted hover:text-primary hover:bg-slate-800/60 transition-colors"
                title="Copy verification code"
                aria-label="Copy verification code"
              >
                {copied ? <CheckCircle2 size={12} className="text-emerald-400" /> : <Copy size={12} />}
              </button>
            </div>

            {isOwner && (
              <button
                type="button"
                onClick={handleShareLinkedIn}
                className="inline-flex items-center gap-1 px-2 py-1 rounded-sm text-[11px] font-semibold text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 border border-blue-500/20 transition-all"
                title="Share this achievement on LinkedIn"
              >
                <Share2 size={11} />
                <span>Share</span>
              </button>
            )}
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between text-[11px] text-muted mb-1.5 font-medium">
              <span>Progress</span>
              <span>{badge.progressLabel}</span>
            </div>
            <div className="h-1.5 w-full bg-slate-800/80 rounded-full overflow-hidden">
              <div
                className="h-full bg-linear-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, Math.round((badge.progress / Math.max(1, badge.target)) * 100))}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
