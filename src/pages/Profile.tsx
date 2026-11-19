import { useEffect, useMemo, useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import {
  Activity,
  AlertCircle,
  ArrowRight,
  Building,
  Check,
  CheckCircle2,
  Clock,
  Clock3,
  Code2,
  ExternalLink,
  EyeOff,
  Flame,
  Globe,
  GraduationCap,
  ImagePlus,
  Link2,
  Lock,
  Mail,
  MapPin,
  Pencil,
  RotateCcw,
  Save,
  Shield,
  Sparkles,
  Trash2,
  Trophy,
  UserRound,
  X,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import ProfileAvatar from '../components/ProfileAvatar';
import ConfirmDialog from '../components/ui/ConfirmDialog';
import ErrorAlert from '../components/ui/ErrorAlert';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { useUi } from '../context/UiContext';
import {
  buildDifficultyStats,
  buildMilestoneAchievements,
  buildPeriodSummary,
  buildTopicMastery,
  formatSolveTime,
} from '../lib/analytics';
import {
  AVATAR_COLOR_PRESETS,
  MAX_BIO_LENGTH,
  MAX_DISPLAY_NAME_LENGTH,
  compressAvatarFile,
  getAvatarColorPreset,
  isSafeAvatarImageUrl,
} from '../lib/profileStorage';
import {
  countDailyCompletions,
  formatActivityTime,
  formatDuration,
  getBestStreak,
  getCurrentStreak,
} from '../lib/progress';
import type { AvatarColorId, AvatarMode, ProfileVisibility } from '../types';

interface ProfileDraft {
  displayName: string;
  bio: string;
  avatarMode: AvatarMode;
  avatarColor: AvatarColorId;
  avatarImage: string;
  visibility: ProfileVisibility;
  pronouns: string;
  company: string;
  university: string;
  location: string;
  displayLocalTime: boolean;
  publicEmail: string;
  website: string;
  socialLinks: string[];
}

export default function Profile() {
  const { user } = useAuth();
  const {
    profile,
    updateProfile,
    resetProfile,
    privacySettings,
    problems,
    solvedIds,
    activityLog,
    submissions,
    dailyChallengeByDate,
    dailyCompletions,
  } = useApp();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [draft, setDraft] = useState<ProfileDraft>(() => ({
    displayName: profile.displayName,
    bio: profile.bio,
    avatarMode: profile.avatarMode,
    avatarColor: profile.avatarColor,
    avatarImage: profile.avatarImage,
    visibility: profile.visibility,
    pronouns: profile.pronouns ?? '',
    company: profile.company ?? '',
    university: profile.university ?? '',
    location: profile.location ?? '',
    displayLocalTime: profile.displayLocalTime ?? false,
    publicEmail: profile.publicEmail ?? '',
    website: profile.website ?? '',
    socialLinks: profile.socialLinks ?? [],
  }));
  const [confirmResetOpen, setConfirmResetOpen] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [imageLoadError, setImageLoadError] = useState(false);
  const [savedNotice, setSavedNotice] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { announce } = useUi();

  useEffect(() => {
    setDraft({
      displayName: profile.displayName,
      bio: profile.bio,
      avatarMode: profile.avatarMode,
      avatarColor: profile.avatarColor,
      avatarImage: profile.avatarImage,
      visibility: profile.visibility,
      pronouns: profile.pronouns ?? '',
      company: profile.company ?? '',
      university: profile.university ?? '',
      location: profile.location ?? '',
      displayLocalTime: profile.displayLocalTime ?? false,
      publicEmail: profile.publicEmail ?? '',
      website: profile.website ?? '',
      socialLinks: profile.socialLinks ?? [],
    });
  }, [profile]);

  useEffect(() => {
    if (!isEditModalOpen) return undefined;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleDiscard();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isEditModalOpen, profile]);

  const currentStreak = useMemo(() => getCurrentStreak(activityLog), [activityLog]);
  const bestStreak = useMemo(() => getBestStreak(activityLog), [activityLog]);
  const practiceSeconds = useMemo(
    () => activityLog.reduce((total, event) => total + (event.durationSeconds ?? 0), 0),
    [activityLog],
  );
  const difficultyStats = useMemo(
    () => buildDifficultyStats(problems, solvedIds, activityLog, submissions),
    [problems, solvedIds, activityLog, submissions],
  );
  const weeklySummary = useMemo(
    () => buildPeriodSummary(problems, solvedIds, activityLog, submissions, 'week'),
    [problems, solvedIds, activityLog, submissions],
  );
  const monthlySummary = useMemo(
    () => buildPeriodSummary(problems, solvedIds, activityLog, submissions, 'month'),
    [problems, solvedIds, activityLog, submissions],
  );
  const topTopics = useMemo(
    () => buildTopicMastery(problems, solvedIds, activityLog, submissions)
      .filter((item) => item.solved > 0)
      .slice(0, 4),
    [problems, solvedIds, activityLog, submissions],
  );
  const achievements = useMemo(
    () => buildMilestoneAchievements({
      problems,
      solvedIds,
      activityLog,
      submissions,
      dailyCompletions,
      dailyChallengeByDate,
      currentStreak,
      bestStreak,
    }),
    [problems, solvedIds, activityLog, submissions, dailyCompletions, dailyChallengeByDate, currentStreak, bestStreak],
  );
  const unlockedAchievements = achievements.filter((item) => item.unlocked).length;
  const completedDailyCount = useMemo(
    () => countDailyCompletions(dailyCompletions, dailyChallengeByDate),
    [dailyCompletions, dailyChallengeByDate],
  );

  const profilePreset = getAvatarColorPreset(profile.avatarColor);
  const profileDisplayName = profile.displayName.trim() || 'CodeArena Learner';
  const profileBio = profile.bio.trim();

  const imageUrlTrimmed = draft.avatarImage.trim();
  const hasInvalidImageUrl = draft.avatarMode === 'image' && imageUrlTrimmed.length > 0 && !isSafeAvatarImageUrl(imageUrlTrimmed);

  function openEditModal() {
    setDraft({
      displayName: profile.displayName,
      bio: profile.bio,
      avatarMode: profile.avatarMode,
      avatarColor: profile.avatarColor,
      avatarImage: profile.avatarImage,
      visibility: profile.visibility,
      pronouns: profile.pronouns ?? '',
      company: profile.company ?? '',
      university: profile.university ?? '',
      location: profile.location ?? '',
      displayLocalTime: profile.displayLocalTime ?? false,
      publicEmail: profile.publicEmail ?? '',
      website: profile.website ?? '',
      socialLinks: profile.socialLinks ? [...profile.socialLinks] : [],
    });
    setFormError(null);
    setUploadError(null);
    setIsEditModalOpen(true);
  }

  function handleSave(event: FormEvent) {
    event.preventDefault();
    setFormError(null);
    setUploadError(null);

    const cleanedName = draft.displayName.trim();
    if (!cleanedName) {
      setFormError('Display name is required.');
      return;
    }
    if (draft.avatarMode === 'image' && imageUrlTrimmed && !isSafeAvatarImageUrl(imageUrlTrimmed)) {
      setFormError('Avatar image must be a valid http(s) URL or uploaded image file.');
      return;
    }

    const effectiveMode: AvatarMode = draft.avatarMode === 'image' && imageUrlTrimmed ? 'image' : 'initials';

    updateProfile({
      displayName: cleanedName.slice(0, MAX_DISPLAY_NAME_LENGTH),
      bio: draft.bio.trim().slice(0, MAX_BIO_LENGTH),
      avatarMode: effectiveMode,
      avatarColor: draft.avatarColor,
      avatarImage: effectiveMode === 'image' ? imageUrlTrimmed : '',
      visibility: draft.visibility,
      pronouns: draft.pronouns.trim().slice(0, 40),
      company: draft.company.trim().slice(0, 80),
      university: draft.university.trim().slice(0, 80),
      location: draft.location.trim().slice(0, 80),
      displayLocalTime: draft.displayLocalTime,
      publicEmail: draft.publicEmail.trim().slice(0, 100),
      website: draft.website.trim().slice(0, 120),
      socialLinks: draft.socialLinks.map((s) => s.trim()).filter(Boolean).slice(0, 4),
    });
    setSavedNotice('Profile saved locally in this browser.');
    announce('Profile saved locally');
    setIsEditModalOpen(false);
  }

  function handleDiscard() {
    setDraft({
      displayName: profile.displayName,
      bio: profile.bio,
      avatarMode: profile.avatarMode,
      avatarColor: profile.avatarColor,
      avatarImage: profile.avatarImage,
      visibility: profile.visibility,
      pronouns: profile.pronouns ?? '',
      company: profile.company ?? '',
      university: profile.university ?? '',
      location: profile.location ?? '',
      displayLocalTime: profile.displayLocalTime ?? false,
      publicEmail: profile.publicEmail ?? '',
      website: profile.website ?? '',
      socialLinks: profile.socialLinks ? [...profile.socialLinks] : [],
    });
    setFormError(null);
    setUploadError(null);
    setIsEditModalOpen(false);
  }

  function handleReset() {
    resetProfile();
    setConfirmResetOpen(false);
    setFormError(null);
    setUploadError(null);
    setSavedNotice('Profile reset to browser defaults.');
    announce('Profile reset to defaults');
  }

  async function handleFileUpload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    setUploadError(null);
    setFormError(null);
    try {
      const dataUrl = await compressAvatarFile(file);
      setDraft((prev) => ({
        ...prev,
        avatarMode: 'image',
        avatarImage: dataUrl,
      }));
      setSavedNotice(null);
    } catch (error) {
      setUploadError(error instanceof Error ? error.message : 'Could not process image.');
    }
  }

  return (
    <div className="space-y-6">
      {/* Page Heading Row */}
      <section className="page-heading-row">
        <div>
          <h2 className="page-title mt-0">Your Profile</h2>
          <p className="page-subtitle">
            Manage your developer identity, view performance statistics, and track your coding milestones.
          </p>
        </div>
      </section>

      {/* Success Notification Alert */}
      {savedNotice && (
        <div className="flex items-center justify-between gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-xs font-semibold text-emerald-700 dark:text-emerald-300" role="status">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} /> {savedNotice}
          </div>
          <button
            type="button"
            onClick={() => setSavedNotice(null)}
            className="text-emerald-700/70 hover:text-emerald-700 dark:text-emerald-300/70 dark:hover:text-emerald-300"
            aria-label="Dismiss alert"
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* Main Profile View Card */}
      <section className="panel-card overflow-hidden">
        {/* Top Control Bar */}
        <div className="flex items-center justify-between gap-3 border-b px-5 py-3.5 sm:px-6" style={{ borderColor: 'var(--ca-border)' }}>
          <div className="flex items-center gap-2">
            <Sparkles size={16} className="themed-link" />
            <span className="text-xs font-bold text-primary">Developer Profile</span>
          </div>
          {privacySettings.profileVisibility === 'private' && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-amber-700 dark:text-amber-300">
              <Lock size={12} /> Profile is private
            </span>
          )}
        </div>

        {/* Banner with user's selected gradient */}
        <div className="h-32 sm:h-44 w-full transition-all" style={{ background: profilePreset.banner }} />

        {/* Profile Content */}
        <div className="px-5 pb-6 sm:px-8">
          <div className="-mt-12 sm:-mt-14 flex flex-wrap items-end justify-between gap-4">
            <ProfileAvatar
              displayName={profileDisplayName}
              avatarMode={profile.avatarMode}
              avatarColor={profile.avatarColor}
              avatarImage={profile.avatarImage}
              size="xl"
              className="h-24 w-24 sm:h-28 sm:w-28 ring-4 ring-[var(--ca-surface)] shadow-lg"
            />
            <div className="flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                onClick={openEditModal}
                className="btn-secondary py-1.5 px-3.5 text-xs font-semibold"
              >
                <Pencil size={13} /> Edit profile
              </button>
            </div>
          </div>

          <div className="mt-4">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-display text-2xl font-bold tracking-tight text-primary">
                {profileDisplayName}
              </h3>
              {profile.pronouns && (
                <span className="rounded-md border px-2 py-0.5 text-[11px] font-semibold text-muted" style={{ borderColor: 'var(--ca-border)' }}>
                  {profile.pronouns}
                </span>
              )}
            </div>
            <p className="mt-0.5 text-xs text-muted">
              {user?.email ? `${user.email} · ${user.role === 'admin' ? 'Administrator' : 'Member'}` : 'Signed-in developer account'}
            </p>
            {profileBio && (
              <p className="mt-3 max-w-2xl text-xs sm:text-sm leading-6 text-muted">
                {profileBio}
              </p>
            )}

            {/* GitHub-style Metadata Row */}
            <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted">
              {profile.company && (
                <span className="inline-flex items-center gap-1.5">
                  <Building size={14} className="text-muted shrink-0" />
                  <span className="font-medium text-primary">{profile.company}</span>
                </span>
              )}
              {profile.university && (
                <span className="inline-flex items-center gap-1.5">
                  <GraduationCap size={15} className="text-muted shrink-0" />
                  <span className="font-medium text-primary">{profile.university}</span>
                </span>
              )}
              {profile.location && (
                <span className="inline-flex items-center gap-1.5">
                  <MapPin size={14} className="text-muted shrink-0" />
                  <span>{profile.location}</span>
                  {profile.displayLocalTime && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-muted ml-0.5">
                      <Clock size={12} />
                      {new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })} local
                    </span>
                  )}
                </span>
              )}
              {profile.publicEmail && (
                <a
                  href={`mailto:${profile.publicEmail}`}
                  className="inline-flex items-center gap-1.5 hover:text-primary transition"
                >
                  <Mail size={14} className="text-muted shrink-0" />
                  <span>{profile.publicEmail}</span>
                </a>
              )}
              {profile.website && (
                <a
                  href={profile.website.startsWith('http') ? profile.website : `https://${profile.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 themed-link font-medium hover:underline"
                >
                  <Link2 size={14} className="shrink-0" />
                  <span>{profile.website.replace(/^https?:\/\//i, '').replace(/\/$/, '')}</span>
                  <ExternalLink size={10} />
                </a>
              )}
            </div>

            {/* Social accounts */}
            {profile.socialLinks && profile.socialLinks.length > 0 && (
              <div className="mt-3.5 flex flex-wrap items-center gap-2">
                {profile.socialLinks.map((link, idx) => {
                  const cleanUrl = link.startsWith('http') ? link : `https://${link}`;
                  const label = link.replace(/^https?:\/\/(www\.)?/i, '').replace(/\/$/, '');
                  return (
                    <a
                      key={idx}
                      href={cleanUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-semibold text-primary transition hover:border-slate-400 dark:hover:border-slate-600"
                      style={{ borderColor: 'var(--ca-border)', background: 'var(--ca-surface-muted)' }}
                    >
                      <Link2 size={12} className="text-muted" />
                      <span className="truncate max-w-[180px]">{label}</span>
                      <ExternalLink size={10} className="text-muted" />
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          {privacySettings.profileVisibility === 'private' && (
            <div className="mt-5 flex items-center gap-2 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-2.5 text-xs text-amber-700 dark:text-amber-300">
              <Lock size={14} className="shrink-0" />
              <span>Your profile is currently set to <strong>Private</strong>. Only you can view these stats; other people cannot search or view your profile.</span>
            </div>
          )}

          {/* Local Stats Grid */}
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <div className="rounded-xl p-3.5" style={{ background: 'var(--ca-surface-muted)' }}>
                  <p className="text-[11px] font-semibold text-muted">Marked solved</p>
                  <p className="mt-1 font-display text-xl font-bold text-primary tabular-nums">
                    {difficultyStats.totalSolved}
                    <span className="text-xs font-semibold text-muted">/{difficultyStats.totalProblems}</span>
                  </p>
                  <p className="mt-0.5 text-[10px] text-muted">Local library</p>
                </div>
                <div className="rounded-xl p-3.5" style={{ background: 'var(--ca-surface-muted)' }}>
                  <p className="text-[11px] font-semibold text-muted">Streak</p>
                  <p className="mt-1 flex items-center gap-1 font-display text-xl font-bold text-orange-600 tabular-nums dark:text-orange-300">
                    <Flame size={17} /> {currentStreak}d
                  </p>
                  <p className="mt-0.5 text-[10px] text-muted">Best: {bestStreak}d</p>
                </div>
                <div className="rounded-xl p-3.5" style={{ background: 'var(--ca-surface-muted)' }}>
                  <p className="text-[11px] font-semibold text-muted">Practice time</p>
                  <p className="mt-1 flex items-center gap-1 font-display text-xl font-bold text-primary tabular-nums">
                    <Clock3 size={16} className="text-muted" /> {formatDuration(practiceSeconds)}
                  </p>
                  <p className="mt-0.5 text-[10px] text-muted">{completedDailyCount} {completedDailyCount === 1 ? 'daily' : 'dailies'} done</p>
                </div>
                <div className="rounded-xl p-3.5" style={{ background: 'var(--ca-surface-muted)' }}>
                  <p className="text-[11px] font-semibold text-muted">Achievements</p>
                  <p className="mt-1 flex items-center gap-1 font-display text-xl font-bold text-primary tabular-nums">
                    <Trophy size={16} className="text-amber-500" /> {unlockedAchievements}/{achievements.length}
                  </p>
                  <p className="mt-0.5 text-[10px] text-muted">Badges earned</p>
                </div>
              </div>

              {/* Difficulty Breakdown Bar */}
              <div className="mt-5 rounded-xl border p-4" style={{ borderColor: 'var(--ca-border)' }}>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-primary">Difficulty breakdown</span>
                  <span className="text-xs text-muted tabular-nums">{difficultyStats.overallPct}% complete</span>
                </div>
                <div className="mt-3 grid grid-cols-3 gap-3 text-center">
                  {difficultyStats.items.map((tier) => (
                    <div key={tier.difficulty} className="rounded-lg p-2.5" style={{ background: 'var(--ca-surface-muted)' }}>
                      <p className={`text-xs font-bold ${tier.difficulty === 'Easy' ? 'text-emerald-600 dark:text-emerald-400' : tier.difficulty === 'Medium' ? 'text-amber-600 dark:text-amber-400' : 'text-rose-600 dark:text-rose-400'}`}>
                        {tier.difficulty}
                      </p>
                      <p className="mt-0.5 font-display text-base font-bold text-primary tabular-nums">
                        {tier.solved}/{tier.total}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Activity Summary (Weekly + Monthly) */}
              <div className="mt-5 rounded-xl border p-4" style={{ borderColor: 'var(--ca-border)' }}>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold text-primary">Activity summary</span>
                  <Link to="/progress" className="text-xs font-bold themed-link">
                    Open analytics <ArrowRight size={12} className="inline" />
                  </Link>
                </div>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-lg p-3" style={{ background: 'var(--ca-surface-muted)' }}>
                    <p className="text-[11px] font-semibold text-muted">Last 7 days</p>
                    <p className="mt-1 text-xs font-bold text-primary tabular-nums">
                      {weeklySummary.solvedInPeriod} marked solved · {weeklySummary.activeDays}/7 active days
                    </p>
                    <p className="mt-0.5 text-[11px] text-muted">{formatDuration(weeklySummary.practiceSeconds)} est. practice</p>
                  </div>
                  <div className="rounded-lg p-3" style={{ background: 'var(--ca-surface-muted)' }}>
                    <p className="text-[11px] font-semibold text-muted">Last 30 days</p>
                    <p className="mt-1 text-xs font-bold text-primary tabular-nums">
                      {monthlySummary.solvedInPeriod} marked solved · {monthlySummary.activeDays}/30 active days
                    </p>
                    <p className="mt-0.5 text-[11px] text-muted">{formatDuration(monthlySummary.practiceSeconds)} est. practice</p>
                  </div>
                </div>

                {topTopics.length > 0 && (
                  <div className="mt-3.5 flex flex-wrap gap-2">
                    {topTopics.map((item) => (
                      <span key={item.topic} className="tag-pill text-xs">
                        {item.topic} · {item.solved}/{item.total}
                      </span>
                    ))}
                  </div>
                )}

                {activityLog.length > 0 ? (
                  <div className="mt-4 space-y-2.5 border-t pt-3.5" style={{ borderColor: 'var(--ca-border)' }}>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-muted">Recent local sessions</p>
                    {activityLog.slice(0, 4).map((event) => {
                      const solved = event.type === 'solved';
                      return (
                        <div key={event.id} className="flex items-center gap-3 text-xs">
                          <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${solved ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-300' : 'bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-300'}`}>
                            {solved ? <CheckCircle2 size={14} /> : <Code2 size={14} />}
                          </span>
                          <span className="min-w-0 flex-1 truncate font-medium text-primary">
                            {solved ? 'Marked solved' : 'Practiced'} {event.title}
                          </span>
                          <span className="shrink-0 text-xs text-muted tabular-nums">
                            {event.durationSeconds ? `${formatSolveTime(event.durationSeconds)} · ` : ''}
                            {formatActivityTime(event.timestamp)}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="mt-4 flex items-center gap-2 rounded-lg p-3 text-xs text-muted" style={{ background: 'var(--ca-surface-muted)' }}>
                    <Activity size={15} /> No workspace activity recorded in this browser yet.
                  </div>
                )}
              </div>

          <p className="mt-5 text-[11px] leading-4 text-muted">
            Profile saved locally in this browser.
            {profile.updatedAt ? ` Last saved ${formatActivityTime(profile.updatedAt)}.` : ' Using default profile.'}
          </p>
        </div>
      </section>

      {/* Profile Customization Window (Modal Dialog) */}
      {isEditModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-[2px] ca-modal-backdrop animate-in fade-in"
          role="dialog"
          aria-modal="true"
          aria-labelledby="edit-profile-modal-title"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              handleDiscard();
            }
          }}
        >
          <div className="panel-card ca-modal-panel w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col rounded-2xl shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b p-5 sm:px-6" style={{ borderColor: 'var(--ca-border)' }}>
              <div className="flex items-center gap-3">
                <span className="settings-icon"><UserRound size={18} /></span>
                <div>
                  <h3 id="edit-profile-modal-title" className="section-title text-base">Edit profile</h3>
                  <p className="mt-0.5 text-xs text-muted">Customize your avatar, display name, bio, and display preference.</p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleDiscard}
                className="rounded-lg p-1.5 text-muted hover:bg-slate-100 hover:text-primary dark:hover:bg-slate-800 transition"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body (Scrollable Form) */}
            <form id="edit-profile-form" onSubmit={handleSave} className="overflow-y-auto p-5 sm:p-6 space-y-6">
              {/* Avatar Editor + Live Avatar Preview */}
              <div>
                <div className="mb-3 flex items-center justify-between gap-2">
                  <p className="text-xs font-bold text-primary">Avatar</p>
                  <div className="inline-flex rounded-xl border p-0.5" style={{ borderColor: 'var(--ca-border)', background: 'var(--ca-surface-muted)' }}>
                    {([
                      ['initials', 'Initials badge'],
                      ['image', 'Custom photo'],
                    ] as const).map(([mode, label]) => (
                      <button
                        key={mode}
                        type="button"
                        onClick={() => {
                          setDraft((prev) => ({ ...prev, avatarMode: mode }));
                          setSavedNotice(null);
                        }}
                        className={`rounded-lg px-2.5 py-1 text-[10px] font-bold transition ${draft.avatarMode === mode ? 'bg-indigo-600 text-white shadow-sm' : 'text-muted hover:text-primary'}`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-4 rounded-2xl border p-4 sm:flex-row sm:items-center" style={{ borderColor: 'var(--ca-border)', background: 'var(--ca-surface-muted)' }}>
                  <ProfileAvatar
                    displayName={draft.displayName.trim() || 'CodeArena Learner'}
                    avatarMode={draft.avatarMode}
                    avatarColor={draft.avatarColor}
                    avatarImage={draft.avatarImage}
                    size="lg"
                    onImageErrorChange={setImageLoadError}
                  />

                  {draft.avatarMode === 'initials' ? (
                    <div className="min-w-0 flex-1">
                      <p className="text-[11px] font-semibold text-primary">Badge accent color</p>
                      <p className="mt-0.5 text-[10px] text-muted">Automatically uses your display name initials.</p>
                      <div className="mt-2.5 flex flex-wrap gap-2">
                        {AVATAR_COLOR_PRESETS.map((preset) => {
                          const active = draft.avatarColor === preset.id;
                          return (
                            <button
                              key={preset.id}
                              type="button"
                              onClick={() => {
                                setDraft((prev) => ({ ...prev, avatarColor: preset.id as AvatarColorId }));
                                setSavedNotice(null);
                              }}
                              aria-label={`Select ${preset.label} avatar color`}
                              aria-pressed={active}
                              title={preset.label}
                              className={`flex h-7 w-7 items-center justify-center rounded-full text-white transition ${active ? 'ring-2 ring-offset-2 ring-indigo-500 dark:ring-offset-slate-900' : 'opacity-80 hover:opacity-100'}`}
                              style={{ background: preset.gradient }}
                            >
                              {active && <Check size={13} strokeWidth={3} />}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    <div className="min-w-0 flex-1 space-y-2.5">
                      <label className="block">
                        <span className="text-[10px] font-bold text-muted">Image URL (https://) or upload a local photo</span>
                        <input
                          type="url"
                          value={draft.avatarImage.startsWith('data:image/') ? '' : draft.avatarImage}
                          onChange={(e) => {
                            setDraft((prev) => ({ ...prev, avatarImage: e.target.value }));
                            setUploadError(null);
                            setSavedNotice(null);
                          }}
                          placeholder={draft.avatarImage.startsWith('data:image/') ? 'Local photo uploaded (paste URL to replace)' : 'https://example.com/avatar.png'}
                          className="form-input mt-1 py-2 text-xs"
                        />
                      </label>
                      <div className="flex flex-wrap items-center gap-2">
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/png,image/jpeg,image/webp,image/gif"
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="btn-secondary py-1.5 text-[11px]"
                        >
                          <ImagePlus size={13} /> Upload photo
                        </button>
                        {draft.avatarImage && (
                          <button
                            type="button"
                            onClick={() => {
                              setDraft((prev) => ({ ...prev, avatarImage: '', avatarMode: 'initials' }));
                              setUploadError(null);
                              setSavedNotice(null);
                            }}
                            className="btn-secondary py-1.5 text-[11px] text-rose-600 dark:text-rose-400"
                          >
                            <Trash2 size={13} /> Remove photo
                          </button>
                        )}
                      </div>
                      {hasInvalidImageUrl && (
                        <p className="flex items-center gap-1.5 text-[11px] text-amber-600 dark:text-amber-300">
                          <AlertCircle size={13} /> Enter a valid http(s) image URL.
                        </p>
                      )}
                      {!hasInvalidImageUrl && imageLoadError && draft.avatarImage && (
                        <p className="flex items-center gap-1.5 text-[11px] text-amber-600 dark:text-amber-300">
                          <AlertCircle size={13} /> That image URL could not be loaded. Showing initials fallback.
                        </p>
                      )}
                      {uploadError && (
                        <ErrorAlert
                          title="Photo upload failed"
                          message={uploadError}
                          onRetry={() => fileInputRef.current?.click()}
                          retryLabel="Choose another photo"
                          onDismiss={() => setUploadError(null)}
                        />
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Display Name */}
              <div>
                <div className="mb-1.5 flex items-center justify-between gap-2">
                  <label htmlFor="modal-profile-display-name" className="text-xs font-bold text-primary">
                    Display name
                  </label>
                  <span className="text-[10px] text-muted tabular-nums">
                    {draft.displayName.length} / {MAX_DISPLAY_NAME_LENGTH}
                  </span>
                </div>
                <input
                  id="modal-profile-display-name"
                  type="text"
                  maxLength={MAX_DISPLAY_NAME_LENGTH}
                  value={draft.displayName}
                  onChange={(e) => {
                    setDraft((prev) => ({ ...prev, displayName: e.target.value }));
                    setFormError(null);
                    setSavedNotice(null);
                  }}
                  placeholder="e.g. Adrita Biswas"
                  className="form-input"
                />
              </div>

              {/* Short Bio */}
              <div>
                <div className="mb-1.5 flex items-center justify-between gap-2">
                  <label htmlFor="modal-profile-bio" className="text-xs font-bold text-primary">
                    Short bio
                  </label>
                  <span className="text-[10px] text-muted tabular-nums">
                    {draft.bio.length} / {MAX_BIO_LENGTH}
                  </span>
                </div>
                <textarea
                  id="modal-profile-bio"
                  rows={3}
                  maxLength={MAX_BIO_LENGTH}
                  value={draft.bio}
                  onChange={(e) => {
                    setDraft((prev) => ({ ...prev, bio: e.target.value }));
                    setSavedNotice(null);
                  }}
                  placeholder="Describe your coding journey, favorite topics, or interview prep goals."
                  className="form-input resize-none leading-6"
                />
                <p className="mt-1 text-[11px] text-muted">
                  You can @mention other users and organizations to link to them.
                </p>
              </div>

              {/* Pronouns */}
              <div>
                <label htmlFor="modal-profile-pronouns" className="text-xs font-bold text-primary">
                  Pronouns
                </label>
                <div className="mt-1.5 space-y-2">
                  <select
                    id="modal-profile-pronouns"
                    value={
                      !draft.pronouns
                        ? ''
                        : ['he/him', 'she/her', 'they/them', 'he/they', 'she/they'].includes(draft.pronouns)
                          ? draft.pronouns
                          : 'custom'
                    }
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val === 'custom') {
                        setDraft((prev) => ({ ...prev, pronouns: 'custom' }));
                      } else {
                        setDraft((prev) => ({ ...prev, pronouns: val }));
                      }
                      setSavedNotice(null);
                    }}
                    className="form-input text-xs py-2"
                  >
                    <option value="">Don&apos;t specify</option>
                    <option value="he/him">he/him</option>
                    <option value="she/her">she/her</option>
                    <option value="they/them">they/them</option>
                    <option value="he/they">he/they</option>
                    <option value="she/they">she/they</option>
                    <option value="custom">Custom...</option>
                  </select>
                  {draft.pronouns !== '' &&
                    !['he/him', 'she/her', 'they/them', 'he/they', 'she/they'].includes(draft.pronouns) && (
                      <input
                        type="text"
                        value={draft.pronouns === 'custom' ? '' : draft.pronouns}
                        onChange={(e) => setDraft((prev) => ({ ...prev, pronouns: e.target.value }))}
                        placeholder="Enter your custom pronouns"
                        className="form-input text-xs py-1.5"
                      />
                    )}
                </div>
              </div>

              {/* Affiliation: Company AND University / College */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="modal-profile-company" className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Building size={14} className="text-muted" /> Company / Organization
                  </label>
                  <input
                    id="modal-profile-company"
                    type="text"
                    value={draft.company}
                    onChange={(e) => {
                      setDraft((prev) => ({ ...prev, company: e.target.value }));
                      setSavedNotice(null);
                    }}
                    placeholder="Company name"
                    className="form-input mt-1.5 text-xs py-2"
                  />
                </div>
                <div>
                  <label htmlFor="modal-profile-university" className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <GraduationCap size={15} className="text-muted" /> University / College name
                  </label>
                  <input
                    id="modal-profile-university"
                    type="text"
                    value={draft.university}
                    onChange={(e) => {
                      setDraft((prev) => ({ ...prev, university: e.target.value }));
                      setSavedNotice(null);
                    }}
                    placeholder="College or university (if not with company)"
                    className="form-input mt-1.5 text-xs py-2"
                  />
                </div>
              </div>

              {/* Location & Local Time */}
              <div className="space-y-2">
                <label htmlFor="modal-profile-location" className="text-xs font-bold text-primary flex items-center gap-1.5">
                  <MapPin size={14} className="text-muted" /> Location
                </label>
                <input
                  id="modal-profile-location"
                  type="text"
                  value={draft.location}
                  onChange={(e) => {
                    setDraft((prev) => ({ ...prev, location: e.target.value }));
                    setSavedNotice(null);
                  }}
                  placeholder="e.g. Kolkata, India"
                  className="form-input text-xs py-2"
                />
                <label className="flex items-center gap-2 cursor-pointer pt-1 text-xs text-muted hover:text-primary">
                  <input
                    type="checkbox"
                    checked={draft.displayLocalTime}
                    onChange={(e) => {
                      setDraft((prev) => ({ ...prev, displayLocalTime: e.target.checked }));
                      setSavedNotice(null);
                    }}
                    className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <Clock size={13} />
                  <span>Display current local time</span>
                </label>
              </div>

              {/* Public Email */}
              <div>
                <label htmlFor="modal-profile-email" className="text-xs font-bold text-primary flex items-center gap-1.5">
                  <Mail size={14} className="text-muted" /> Public email
                </label>
                <input
                  id="modal-profile-email"
                  type="email"
                  value={draft.publicEmail}
                  onChange={(e) => {
                    setDraft((prev) => ({ ...prev, publicEmail: e.target.value }));
                    setSavedNotice(null);
                  }}
                  placeholder="developer@example.com"
                  className="form-input mt-1.5 text-xs py-2"
                />
              </div>

              {/* Website */}
              <div>
                <label htmlFor="modal-profile-website" className="text-xs font-bold text-primary flex items-center gap-1.5">
                  <Link2 size={14} className="text-muted" /> Website
                </label>
                <input
                  id="modal-profile-website"
                  type="text"
                  value={draft.website}
                  onChange={(e) => {
                    setDraft((prev) => ({ ...prev, website: e.target.value }));
                    setSavedNotice(null);
                  }}
                  placeholder="Website"
                  className="form-input mt-1.5 text-xs py-2"
                />
              </div>

              {/* Social Accounts (up to 4) */}
              <div>
                <div className="mb-1.5">
                  <p className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Link2 size={14} className="text-muted" /> Social accounts
                  </p>
                  <p className="mt-0.5 text-[11px] text-muted">
                    Add up to 4 links to your social profiles (e.g. GitHub, LinkedIn, Twitter/X).
                  </p>
                </div>
                <div className="space-y-2">
                  {[0, 1, 2, 3].map((idx) => (
                    <div key={idx} className="relative flex items-center">
                      <span className="absolute left-3 text-muted">
                        <Link2 size={13} />
                      </span>
                      <input
                        type="text"
                        value={draft.socialLinks[idx] ?? ''}
                        onChange={(e) => {
                          const updated = [...draft.socialLinks];
                          updated[idx] = e.target.value;
                          setDraft((prev) => ({ ...prev, socialLinks: updated }));
                          setSavedNotice(null);
                        }}
                        placeholder={`Link to social profile ${idx + 1}`}
                        className="form-input pl-9 text-xs py-2"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Display Preference */}
              <div>
                <div className="mb-2 flex items-center justify-between gap-2">
                  <p className="text-xs font-bold text-primary">Display preference</p>
                </div>
                <div className="grid gap-2.5 sm:grid-cols-2" role="radiogroup" aria-label="Profile display preference">
                  {([
                    {
                      value: 'public' as ProfileVisibility,
                      title: 'Public display',
                      desc: 'Show bio, streaks, and activity on your profile.',
                      icon: Globe,
                    },
                    {
                      value: 'private' as ProfileVisibility,
                      title: 'Private display',
                      desc: 'Hide bio, streaks, and stats from visitor preview.',
                      icon: EyeOff,
                    },
                  ]).map((option) => {
                    const Icon = option.icon;
                    const active = draft.visibility === option.value;
                    return (
                      <button
                        key={option.value}
                        type="button"
                        role="radio"
                        aria-checked={active}
                        onClick={() => {
                          setDraft((prev) => ({ ...prev, visibility: option.value }));
                          setSavedNotice(null);
                        }}
                        className={`rounded-xl border p-3.5 text-left transition ${active ? 'border-indigo-500 bg-indigo-50/70 dark:border-indigo-400 dark:bg-indigo-500/10' : 'hover:border-slate-300 dark:hover:border-slate-700'}`}
                        style={active ? undefined : { borderColor: 'var(--ca-border)', background: 'var(--ca-surface)' }}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-primary">
                            <Icon size={14} className={active ? 'themed-link' : 'text-muted'} />
                            {option.title}
                          </span>
                          {active && <Check size={14} className="themed-link" />}
                        </div>
                        <p className="mt-1.5 text-[11px] leading-4 text-muted">{option.desc}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {formError && (
                <ErrorAlert
                  title="Could not save profile"
                  message={formError}
                  onDismiss={() => setFormError(null)}
                />
              )}
            </form>

            {/* Modal Footer */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-t p-4 sm:px-6" style={{ borderColor: 'var(--ca-border)', background: 'var(--ca-surface-muted)' }}>
              <button
                type="button"
                onClick={() => setConfirmResetOpen(true)}
                className="btn-secondary text-xs"
              >
                <RotateCcw size={13} /> Reset to defaults
              </button>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleDiscard}
                  className="btn-secondary text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  form="edit-profile-form"
                  className="btn-primary text-xs"
                >
                  <Save size={14} /> Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Dialog for Reset */}
      <ConfirmDialog
        open={confirmResetOpen}
        tone="warning"
        title="Reset profile to defaults?"
        description="This clears your custom display name, short bio, avatar photo, and display preference saved in this browser."
        confirmLabel="Reset profile"
        cancelLabel="Cancel"
        onConfirm={handleReset}
        onCancel={() => setConfirmResetOpen(false)}
      />
    </div>
  );
}
