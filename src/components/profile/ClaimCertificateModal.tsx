import { useState } from 'react';
import {
  Award,
  CheckCircle2,
  GraduationCap,
  Lock,
  Sparkles,
  X,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { claimCertificate } from '../../services/certificatesService';
import type { CertificateTrack, IssuedCertificate } from '../../types';

interface ClaimCertificateModalProps {
  tracks: CertificateTrack[];
  issued: IssuedCertificate[];
  isOpen: boolean;
  onClose: () => void;
  onCertificateClaimed: (cert: IssuedCertificate) => void;
}

export default function ClaimCertificateModal({
  tracks,
  issued,
  isOpen,
  onClose,
  onCertificateClaimed,
}: ClaimCertificateModalProps) {
  const [claimingTrackId, setClaimingTrackId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleClaim = async (trackId: string) => {
    try {
      setClaimingTrackId(trackId);
      setError(null);
      const cert = await claimCertificate(trackId);
      onCertificateClaimed(cert);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to claim certificate');
    } finally {
      setClaimingTrackId(null);
    }
  };

  const issuedTrackIds = new Set(issued.map((c) => c.trackId));

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl text-primary">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <GraduationCap size={18} />
            </span>
            <div>
              <h3 className="text-base font-bold text-primary sm:text-lg">
                Official Certification Tracks
              </h3>
              <p className="text-xs text-muted">
                Issued by PrismCode & Refract Labs. Claimable once requirements are fulfilled.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-muted hover:text-primary hover:bg-slate-800 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {error && (
          <div className="mt-4 p-3 rounded-xl border border-rose-500/30 bg-rose-500/10 text-rose-400 text-xs font-medium">
            {error}
          </div>
        )}

        {/* Tracks Grid */}
        <div className="mt-5 space-y-4">
          {tracks.map((track) => {
            const alreadyIssued = issuedTrackIds.has(track.id);
            const isClaiming = claimingTrackId === track.id;

            return (
              <div
                key={track.id}
                className={`relative p-5 rounded-xl border transition-all ${
                  alreadyIssued
                    ? 'border-emerald-500/40 bg-emerald-500/5'
                    : track.isEligible
                    ? 'border-amber-500/50 bg-amber-500/5 shadow-md shadow-amber-500/5'
                    : 'border-slate-800 bg-slate-950/40 opacity-75'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-primary">{track.title}</h4>
                      {alreadyIssued ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-400 border border-emerald-500/30">
                          <CheckCircle2 size={11} />
                          <span>Claimed</span>
                        </span>
                      ) : track.isEligible ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/20 px-2 py-0.5 text-[10px] font-bold text-amber-400 border border-amber-500/30 animate-pulse">
                          <Sparkles size={11} />
                          <span>Ready to Claim!</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded-full bg-slate-800 px-2 py-0.5 text-[10px] font-semibold text-muted">
                          <Lock size={10} />
                          <span>In Progress</span>
                        </span>
                      )}
                    </div>

                    <p className="mt-1 text-xs text-muted leading-relaxed">{track.description}</p>

                    {/* Criteria requirement pills */}
                    <div className="mt-2.5 flex flex-wrap items-center gap-2 text-[11px] text-muted">
                      <span className="font-semibold text-primary">Requires:</span>
                      <span className="rounded bg-slate-800/80 px-2 py-0.5 text-slate-300">
                        {track.requiredSolved} Solved ({track.currentSolved} done)
                      </span>
                      {track.requiredMedium > 0 && (
                        <span className="rounded bg-slate-800/80 px-2 py-0.5 text-slate-300">
                          {track.requiredMedium} Mediums ({track.currentMedium} done)
                        </span>
                      )}
                      {track.requiredHard > 0 && (
                        <span className="rounded bg-slate-800/80 px-2 py-0.5 text-slate-300">
                          {track.requiredHard} Hards ({track.currentHard} done)
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Action button */}
                  <div className="sm:text-right shrink-0">
                    {alreadyIssued ? (
                      <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
                        <ShieldCheck size={14} />
                        <span>Issued</span>
                      </span>
                    ) : track.isEligible ? (
                      <button
                        type="button"
                        onClick={() => handleClaim(track.id)}
                        disabled={isClaiming}
                        className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 px-4 py-2 text-xs font-bold text-slate-950 shadow-md shadow-amber-500/20 transition-all disabled:opacity-50"
                      >
                        {isClaiming ? (
                          <span>Issuing...</span>
                        ) : (
                          <>
                            <span>Claim Certificate</span>
                            <ArrowRight size={13} />
                          </>
                        )}
                      </button>
                    ) : (
                      <div className="w-28 text-right">
                        <span className="text-[11px] font-bold text-muted tabular-nums">
                          {track.progressPct}% Complete
                        </span>
                        <div className="mt-1 h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-indigo-500 rounded-full"
                            style={{ width: `${track.progressPct}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
