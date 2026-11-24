import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Award,
  Building,
  CheckCircle2,
  Copy,
  ExternalLink,
  Flame,
  Globe,
  GraduationCap,
  Linkedin,
  Lock,
  Mail,
  MapPin,
  Share2,
  ShieldCheck,
  Sparkles,
  Trophy,
  ArrowRight,
} from 'lucide-react';
import { fetchPublicProfile } from '../services/certificatesService';
import { getLinkedInSharePostUrl } from '../lib/certificates';
import VerifiedBadgeCard from '../components/profile/VerifiedBadgeCard';
import CertificateCard from '../components/profile/CertificateCard';
import ProfileAvatar from '../components/ProfileAvatar';
import type { PublicProfileData } from '../types';

export default function PublicProfile() {
  const { identifier } = useParams<{ identifier: string }>();
  const [profile, setProfile] = useState<PublicProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!identifier) {
      setError('Profile handle or ID required');
      setLoading(false);
      return;
    }

    fetchPublicProfile(identifier)
      .then((data) => {
        setProfile(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : 'User profile not found');
        setLoading(false);
      });
  }, [identifier]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareLinkedIn = () => {
    const url = getLinkedInSharePostUrl(window.location.href);
    window.open(url, '_blank', 'noopener,noreferrer,width=600,height=600');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 p-4">
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-amber-500 border-t-transparent" />
          <p className="text-sm font-semibold text-muted">Loading verified student profile...</p>
        </div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 p-4">
        <div className="max-w-md w-full rounded-2xl border border-rose-500/30 bg-slate-900 p-8 text-center shadow-2xl">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-500/20 text-rose-400 border border-rose-500/30">
            <Trophy size={28} />
          </div>
          <h2 className="mt-4 text-xl font-extrabold text-primary">Profile Not Found</h2>
          <p className="mt-2 text-xs text-muted leading-relaxed">
            The profile handle <code className="text-rose-400 font-mono">@{identifier}</code> was not found or is currently private.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <Link
              to="/problems"
              className="inline-flex items-center gap-2 rounded-xl bg-amber-500 hover:bg-amber-400 px-4 py-2 text-xs font-bold text-slate-950 transition-all"
            >
              <span>Explore Problems</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Handle private profile
  if (profile.isPrivate) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 p-4">
        <div className="max-w-md w-full rounded-2xl border border-slate-800 bg-slate-900 p-8 text-center shadow-2xl">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-800 text-muted">
            <Lock size={26} />
          </div>
          <h2 className="mt-4 text-xl font-extrabold text-primary">{profile.name}</h2>
          <p className="text-xs text-muted font-mono mt-0.5">@{profile.handle}</p>
          <p className="mt-3 text-xs text-muted leading-relaxed">
            This student has set their PrismCode profile visibility to private.
          </p>
          <div className="mt-6">
            <Link
              to="/problems"
              className="inline-flex items-center gap-2 rounded-xl bg-slate-800 hover:bg-slate-700 px-4 py-2 text-xs font-semibold text-primary transition-all"
            >
              <span>Return to Practice</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const { stats, badges, certificates } = profile;

  return (
    <div className="min-h-screen bg-slate-950 py-10 px-4 sm:px-6 lg:px-8 text-primary selection:bg-amber-500/30">
      <div className="mx-auto max-w-5xl space-y-8">
        {/* Profile Header Card */}
        <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900/90 via-slate-900/50 to-slate-950 p-6 sm:p-8 shadow-2xl backdrop-blur-md">
          {/* Background Ambient Glow */}
          <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-amber-500/10 blur-3xl" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            {/* Avatar & Core Bio */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
              <div className="relative">
                <ProfileAvatar
                  displayName={profile.name}
                  avatarMode={profile.avatarMode}
                  avatarColor={profile.avatarColor as any}
                  avatarImage={profile.avatarImage}
                  size="xl"
                />
                <span
                  className="absolute bottom-0 right-0 flex h-6 w-6 items-center justify-center rounded-full bg-amber-500 text-slate-950 shadow-md ring-2 ring-slate-950"
                  title="Verified PrismCode Student"
                >
                  <ShieldCheck size={14} className="stroke-[3]" />
                </span>
              </div>

              <div>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <h1 className="text-2xl font-extrabold text-white tracking-tight sm:text-3xl">
                    {profile.name}
                  </h1>
                  <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/15 px-2.5 py-0.5 text-[11px] font-bold text-amber-400 border border-amber-500/30">
                    <CheckCircle2 size={12} />
                    <span>Verified</span>
                  </span>
                </div>

                <p className="text-xs font-mono text-muted mt-0.5">@{profile.handle}</p>

                {profile.bio && (
                  <p className="mt-2.5 max-w-xl text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {profile.bio}
                  </p>
                )}

                {/* University / Company / Location meta */}
                <div className="mt-3 flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs text-muted">
                  {profile.university && (
                    <span className="inline-flex items-center gap-1">
                      <GraduationCap size={13} className="text-amber-400" />
                      <span>{profile.university}</span>
                    </span>
                  )}
                  {profile.company && (
                    <span className="inline-flex items-center gap-1">
                      <Building size={13} className="text-indigo-400" />
                      <span>{profile.company}</span>
                    </span>
                  )}
                  {profile.location && (
                    <span className="inline-flex items-center gap-1">
                      <MapPin size={13} className="text-rose-400" />
                      <span>{profile.location}</span>
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Share & Connect Actions */}
            <div className="flex flex-wrap sm:flex-col items-center sm:items-end justify-center gap-2.5 shrink-0">
              <button
                type="button"
                onClick={handleShareLinkedIn}
                className="inline-flex items-center gap-2 rounded-xl bg-[#0A66C2] hover:bg-[#004182] px-4 py-2 text-xs font-bold text-white shadow-md shadow-blue-500/20 transition-all"
                title="Share verified profile on LinkedIn"
              >
                <Linkedin size={14} className="fill-current" />
                <span>Share to LinkedIn</span>
              </button>

              <button
                type="button"
                onClick={handleCopyLink}
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800/80 px-3.5 py-2 text-xs font-semibold text-primary hover:bg-slate-700 transition-all"
              >
                {copied ? <CheckCircle2 size={13} className="text-emerald-400" /> : <Copy size={13} />}
                <span>{copied ? 'Link Copied' : 'Copy Profile Link'}</span>
              </button>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-5 gap-3 border-t border-slate-800/80 pt-6 text-center">
            <div className="p-3 rounded-2xl bg-slate-950/40 border border-slate-800/60">
              <p className="text-[10px] font-bold uppercase text-muted">Total Solved</p>
              <p className="mt-1 text-2xl font-black text-amber-400 tabular-nums">{stats.solvedCount}</p>
            </div>
            <div className="p-3 rounded-2xl bg-slate-950/40 border border-slate-800/60">
              <p className="text-[10px] font-bold uppercase text-muted">Easy / Med / Hard</p>
              <p className="mt-1 text-sm font-extrabold text-primary tabular-nums">
                <span className="text-emerald-400">{stats.easySolved}</span> /{' '}
                <span className="text-amber-400">{stats.mediumSolved}</span> /{' '}
                <span className="text-rose-400">{stats.hardSolved}</span>
              </p>
            </div>
            <div className="p-3 rounded-2xl bg-slate-950/40 border border-slate-800/60">
              <p className="text-[10px] font-bold uppercase text-muted">Mastery Points</p>
              <p className="mt-1 text-2xl font-black text-primary tabular-nums">{stats.points}</p>
            </div>
            <div className="p-3 rounded-2xl bg-slate-950/40 border border-slate-800/60">
              <p className="text-[10px] font-bold uppercase text-muted">Active Streak</p>
              <p className="mt-1 flex items-center justify-center gap-1 text-2xl font-black text-orange-400 tabular-nums">
                <Flame size={20} className="fill-current" /> {stats.streak}d
              </p>
            </div>
            <div className="col-span-2 sm:col-span-1 p-3 rounded-2xl bg-slate-950/40 border border-slate-800/60">
              <p className="text-[10px] font-bold uppercase text-muted">Verified Credentials</p>
              <p className="mt-1 flex items-center justify-center gap-1 text-2xl font-black text-amber-400 tabular-nums">
                <Trophy size={20} /> {certificates.length + badges.length}
              </p>
            </div>
          </div>
        </div>

        {/* Certificates Showcase Section */}
        {certificates.length > 0 && (
          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <GraduationCap size={20} className="text-amber-400" />
              <h2 className="text-lg font-bold text-white tracking-tight">
                Official Certifications ({certificates.length})
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {certificates.map((cert) => (
                <CertificateCard key={cert.id} certificate={cert} isOwner={false} />
              ))}
            </div>
          </section>
        )}

        {/* Verified Badges Showcase Section */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Award size={20} className="text-amber-400" />
              <h2 className="text-lg font-bold text-white tracking-tight">
                Verified Skill Badges ({badges.length})
              </h2>
            </div>
            <span className="text-xs text-muted">Verifiable credential with a unique ID</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {badges.map((badge) => (
              <VerifiedBadgeCard
                key={badge.id}
                badge={{
                  ...badge,
                  category: badge.category as any,
                  tier: badge.tier as any,
                  unlocked: true,
                  progress: 1,
                  target: 1,
                  progressLabel: 'Completed',
                }}
                profileUrl={window.location.href}
                isOwner={false}
              />
            ))}
          </div>
        </section>

        {/* Free Marketing / Referral Conversion Banner */}
        <div className="overflow-hidden rounded-3xl border border-amber-500/20 bg-gradient-to-r from-amber-500/10 via-purple-500/5 to-indigo-500/10 p-8 backdrop-blur-md">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/20 px-3 py-0.5 text-xs font-bold text-amber-400 border border-amber-500/30">
                <Sparkles size={12} />
                <span>PrismCode Algorithmic Training</span>
              </span>
              <h3 className="mt-2 text-xl font-bold text-white">
                Learn, conquer algorithms, and earn your verified credentials
              </h3>
              <p className="mt-1 text-xs text-muted max-w-xl leading-relaxed">
                Join students and engineers sharpening their problem solving intuition with isolated code execution, step-by-step subgoals, and shareable certificates.
              </p>
            </div>

            <Link
              to="/register"
              className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 px-5 py-3 text-xs font-bold text-slate-950 shadow-lg shadow-amber-500/20 transition-all"
            >
              <span>Start Free Today</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
