import React from 'react';
import {
  Activity,
  ArrowRight,
  Award,
  Building,
  Calendar,
  Check,
  CheckCircle2,
  Clock,
  Flame,
  Globe,
  EyeOff,
  Mail,
  MapPin,
  Moon,
  Share2,
  Sliders,
  Sparkles,
  Sun,
  Target,
  UserCheck,
  KeyRound,
  LogOut,
  UserRound,
  type LucideIcon,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { fontOptions } from '../data/fonts';
import { themePalettes } from '../data/themes';

function PrivacyToggle({
  label,
  description,
  checked,
  onChange,
  icon: Icon,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (next: boolean) => void;
  icon?: LucideIcon;
}) {
  return (
    <div
      className="group flex items-start justify-between gap-4 p-3.5 rounded-xl border transition-all duration-150 hover:bg-slate-500/[0.03]"
      style={{ borderColor: 'var(--ca-border)', background: 'var(--ca-surface)' }}
    >
      <div className="flex items-start gap-3 min-w-0">
        {Icon && (
          <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-500/10 text-muted">
            <Icon size={14} />
          </span>
        )}
        <div>
          <p className="text-xs font-semibold text-primary">{label}</p>
          <p className="mt-0.5 text-[11px] text-muted leading-relaxed">{description}</p>
        </div>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${checked ? 'bg-indigo-600' : 'bg-slate-300 dark:bg-slate-700'}`}
      >
        <span
          className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${checked ? 'translate-x-4' : 'translate-x-0'}`}
        />
      </button>
    </div>
  );
}

export default function Settings() {
  const { user, signOut } = useAuth();
  const {
    theme,
    setTheme,
    palette,
    setPalette,
    fontFamily,
    setFontFamily,
    fontSize,
    setFontSize,
    privacySettings,
    updatePrivacySettings,
    adaptiveMasteryPlan,
    updateAdaptiveMasteryPlan,
  } = useApp();

  const isPrivate = privacySettings.profileVisibility === 'private';

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 space-y-12 animate-in fade-in">
      {/* Page Header */}
      <div
        className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b"
        style={{ borderColor: 'var(--ca-border)' }}
      >
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-primary">
            Settings & Preferences
          </h1>
          <p className="text-xs sm:text-sm text-muted mt-1.5 leading-relaxed">
            Manage your workspace appearance, privacy controls, and account authentication.
          </p>
        </div>
      </div>

      <div className="space-y-16 sm:space-y-20">
        {/* Topic: Appearance */}
        <section aria-labelledby="settings-appearance-title">
          <h2
            id="settings-appearance-title"
            className="text-xl sm:text-2xl font-extrabold text-primary tracking-tight mb-6"
          >
            Appearance
          </h2>

          <div>
            <div
              className="flex items-center justify-between p-4 rounded-xl border transition-all"
              style={{ borderColor: 'var(--ca-border)', background: 'var(--ca-surface)' }}
            >
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-500/10 text-muted">
                  {theme === 'dark' ? (
                    <Moon size={16} className="text-indigo-400" />
                  ) : (
                    <Sun size={16} className="text-amber-500" />
                  )}
                </span>
                <div>
                  <p className="text-xs font-semibold text-primary">Dark mode</p>
                  <p className="text-[11px] text-muted leading-relaxed">
                    {theme === 'dark'
                      ? 'Dark theme is active across the interface.'
                      : 'Light theme is active across the interface.'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={theme === 'dark'}
                aria-label="Toggle dark mode"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
                  theme === 'dark' ? 'bg-indigo-600' : 'bg-slate-300 dark:bg-slate-700'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                    theme === 'dark' ? 'translate-x-4' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Small Theme Options */}
            <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
              {themePalettes.map((item) => {
                const selected = palette === item.id;
                const isDark = theme === 'dark';
                const panelBg = isDark ? (item.darkSurface ?? item.colors[0]) : item.colors[0];
                const accentBg = isDark ? (item.darkPrimary ?? item.primary) : item.primary;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setPalette(item.id)}
                    aria-pressed={selected}
                    title={`${item.name} — ${item.description}`}
                    className={`flex items-center justify-between gap-2 px-3 py-2 rounded-xl border text-left transition-all ${
                      selected
                        ? 'border-indigo-500 bg-indigo-500/5 text-primary ring-1 ring-indigo-500/20 shadow-xs'
                        : 'border-slate-200 dark:border-slate-800 hover:bg-slate-500/[0.04] text-muted hover:text-primary'
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span
                        className="relative flex h-3 w-3 shrink-0 overflow-hidden rounded-full border border-black/15 shadow-xs dark:border-white/20"
                        style={{ background: panelBg }}
                        aria-hidden="true"
                      >
                        <span
                          className="absolute inset-y-0 right-0 w-1/2"
                          style={{ background: accentBg }}
                        />
                      </span>
                      <span className="truncate text-xs font-semibold">
                        {item.name}
                      </span>
                    </div>
                    {selected && (
                      <Check size={11} className="shrink-0 text-indigo-500" strokeWidth={2.5} />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Font Size Selection */}
            <div className="mt-8 pt-6 border-t" style={{ borderColor: 'var(--ca-border)' }}>
              <div className="mb-3">
                <p className="text-xs font-semibold text-primary">Font size</p>
                <p className="text-[11px] text-muted leading-relaxed">
                  Adjust the text scale across the entire interface.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {[
                  {
                    id: 'compact' as const,
                    name: 'Compact',
                    scale: '14px',
                    description: 'Higher information density, ideal for small screens.',
                    sampleClass: 'text-xs',
                  },
                  {
                    id: 'standard' as const,
                    name: 'Standard',
                    scale: '16px',
                    description: 'Balanced readability and spacing across all devices.',
                    sampleClass: 'text-sm',
                  },
                  {
                    id: 'large' as const,
                    name: 'Large',
                    scale: '18px',
                    description: 'Comfortable reading with relaxed, expansive text.',
                    sampleClass: 'text-base',
                  },
                ].map((item) => {
                  const selected = fontSize === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setFontSize(item.id)}
                      aria-pressed={selected}
                      className={`flex flex-col justify-between p-3.5 rounded-xl border text-left transition-all ${
                        selected
                          ? 'border-indigo-500 bg-indigo-500/5 text-primary ring-1 ring-indigo-500/20 shadow-xs'
                          : 'border-slate-200 dark:border-slate-800 hover:bg-slate-500/[0.04] text-muted hover:text-primary'
                      }`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-primary">
                            {item.name}
                          </span>
                          <span className="font-mono text-[10px] text-muted font-bold px-1.5 py-0.5 rounded-md bg-slate-500/10">
                            {item.scale}
                          </span>
                        </div>
                        {selected && (
                          <Check
                            size={12}
                            className="text-indigo-500 shrink-0"
                            strokeWidth={2.5}
                          />
                        )}
                      </div>
                      <p className={`mt-2 font-medium text-primary ${item.sampleClass}`}>
                        The quick brown fox
                      </p>
                      <span className="mt-2 text-[10px] text-muted/70 block">
                        {item.description}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Typography Selection */}
            <div className="mt-8 pt-6 border-t" style={{ borderColor: 'var(--ca-border)' }}>
              <div className="mb-3">
                <p className="text-xs font-semibold text-primary">Typography</p>
                <p className="text-[11px] text-muted leading-relaxed">
                  Choose a typeface for the interface, content, and controls.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                {fontOptions.map((item) => {
                  const selected = fontFamily === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setFontFamily(item.id)}
                      aria-pressed={selected}
                      className={`flex flex-col justify-between p-3.5 rounded-xl border text-left transition-all ${
                        selected
                          ? 'border-indigo-500 bg-indigo-500/5 text-primary ring-1 ring-indigo-500/20 shadow-xs'
                          : 'border-slate-200 dark:border-slate-800 hover:bg-slate-500/[0.04] text-muted hover:text-primary'
                      }`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span
                          className="text-base font-bold text-primary truncate"
                          style={{ fontFamily: item.fontFamily }}
                        >
                          {item.name}
                        </span>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[9px] font-semibold text-muted px-1.5 py-0.5 rounded-md bg-slate-500/10">
                            {item.category}
                          </span>
                          {selected && (
                            <Check
                              size={12}
                              className="text-indigo-500 shrink-0"
                              strokeWidth={2.5}
                            />
                          )}
                        </div>
                      </div>
                      <p
                        className="mt-2 text-xs text-muted/90 truncate w-full"
                        style={{ fontFamily: item.fontFamily }}
                      >
                        {item.previewSample}
                      </p>
                      <span className="mt-2 text-[10px] text-muted/60 block">
                        {item.description}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Topic: Privacy & Visibility */}
        <section aria-labelledby="settings-privacy-title">
          <h2
            id="settings-privacy-title"
            className="text-xl sm:text-2xl font-extrabold text-primary tracking-tight mb-6"
          >
            Privacy & Visibility
          </h2>

          <div className="space-y-6">
            {/* Simple Toggle for Private / Public Profile */}
            <div
              className="flex items-center justify-between p-4 rounded-xl border transition-all"
              style={{ borderColor: 'var(--ca-border)', background: 'var(--ca-surface)' }}
            >
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-500/10 text-muted">
                  {isPrivate ? (
                    <EyeOff size={16} className="text-slate-400" />
                  ) : (
                    <Globe size={16} className="text-emerald-500" />
                  )}
                </span>
                <div>
                  <p className="text-xs font-semibold text-primary">Private profile</p>
                  <p className="text-[11px] text-muted leading-relaxed">
                    {isPrivate
                      ? 'Hidden from search and other users across the platform.'
                      : 'Discoverable in search; other users can view permitted details.'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={isPrivate}
                aria-label="Toggle private profile"
                onClick={() =>
                  updatePrivacySettings({
                    profileVisibility: isPrivate ? 'public' : 'private',
                  })
                }
                className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
                  isPrivate ? 'bg-indigo-600' : 'bg-slate-300 dark:bg-slate-700'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                    isPrivate ? 'translate-x-4' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Granular Visibility Settings (shown only when public) */}
            {!isPrivate && (
              <div>
                <p className="text-xs font-semibold text-primary mb-3">Section visibility controls</p>
                <div className="grid gap-3 sm:grid-cols-2">
                  <PrivacyToggle
                    label="Email address"
                    description="Show your public contact email on your profile."
                    checked={privacySettings.showEmail}
                    onChange={(checked) => updatePrivacySettings({ showEmail: checked })}
                    icon={Mail}
                  />
                  <PrivacyToggle
                    label="Affiliation (Company / University)"
                    description="Show your company, organization, or university."
                    checked={privacySettings.showAffiliation}
                    onChange={(checked) => updatePrivacySettings({ showAffiliation: checked })}
                    icon={Building}
                  />
                  <PrivacyToggle
                    label="Location & local time"
                    description="Display your city/country and current local time indicator."
                    checked={privacySettings.showLocation}
                    onChange={(checked) => updatePrivacySettings({ showLocation: checked })}
                    icon={MapPin}
                  />
                  <PrivacyToggle
                    label="Websites & social profiles"
                    description="Display your portfolio website and linked social profile URLs."
                    checked={privacySettings.showSocials}
                    onChange={(checked) => updatePrivacySettings({ showSocials: checked })}
                    icon={Share2}
                  />
                  <PrivacyToggle
                    label="1-Year activity heatmap & streaks"
                    description="Show your contribution heatmap and active streak badges."
                    checked={privacySettings.showHeatmap}
                    onChange={(checked) => updatePrivacySettings({ showHeatmap: checked })}
                    icon={Activity}
                  />
                  <PrivacyToggle
                    label="Solved problems & analytics"
                    description="Show count of solved problems and difficulty breakdown."
                    checked={privacySettings.showSolvedProblems}
                    onChange={(checked) => updatePrivacySettings({ showSolvedProblems: checked })}
                    icon={UserCheck}
                  />
                  <PrivacyToggle
                    label="Milestone badges & achievements"
                    description="Display unlocked milestone trophies and achievements."
                    checked={privacySettings.showAchievements}
                    onChange={(checked) => updatePrivacySettings({ showAchievements: checked })}
                    icon={Award}
                  />
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Topic: Adaptive Mastery & YearPlanner Integration */}
        <section aria-labelledby="settings-adaptive-title" className="space-y-6">
          <div>
            <div className="flex items-center gap-2.5">
              <h2
                id="settings-adaptive-title"
                className="text-xl sm:text-2xl font-extrabold text-primary tracking-tight"
              >
                Adaptive Preparation &amp; YearPlanner
              </h2>
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-500 border border-amber-500/20">
                <Sparkles size={11} /> Smart Pacing
              </span>
            </div>
            <p className="mt-1 text-xs sm:text-sm text-muted leading-relaxed">
              Connect your YearPlanner timeline with the 25 Mastery blueprints to turn your schedule into an adaptive curriculum like &ldquo;Placements in 45 days, here&apos;s today&apos;s set&rdquo;.
            </p>
          </div>

          <div
            className="p-5 rounded-2xl border transition-all space-y-6"
            style={{ borderColor: 'var(--ca-border)', background: 'var(--ca-surface)' }}
          >
            {/* Master Toggle Card */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3.5 min-w-0">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-500 border border-indigo-500/20">
                  <Target size={20} />
                </span>
                <div>
                  <h3 className="text-sm font-bold text-primary">
                    Connect YearPlanner to Mastery Data
                  </h3>
                  <p className="text-xs text-muted mt-0.5 leading-relaxed">
                    Automatically computes daily blueprint targets and displays &ldquo;Today&apos;s Set&rdquo; on your YearPlanner calendar.
                  </p>
                </div>
              </div>

              <button
                type="button"
                role="switch"
                aria-checked={adaptiveMasteryPlan.enabled}
                aria-label="Toggle adaptive mastery in YearPlanner"
                onClick={() =>
                  updateAdaptiveMasteryPlan({
                    enabled: !adaptiveMasteryPlan.enabled,
                  })
                }
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
                  adaptiveMasteryPlan.enabled ? 'bg-indigo-600' : 'bg-slate-300 dark:bg-slate-700'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                    adaptiveMasteryPlan.enabled ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Expanded Configuration Controls when Enabled */}
            {adaptiveMasteryPlan.enabled && (
              <div className="pt-5 border-t space-y-6 animate-in fade-in" style={{ borderColor: 'var(--ca-border)' }}>
                {/* Target Milestone / Goal Selection */}
                <div>
                  <label htmlFor="settings-adaptive-goal" className="block text-xs font-bold text-primary mb-2">
                    Target Milestone &amp; Objective
                  </label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {[
                      'Campus Placements in 45 Days',
                      'FAANG Interview in 30 Days',
                      'Summer Internship in 60 Days',
                      'Algorithm Mastery in 90 Days',
                    ].map((preset) => {
                      const isSelected = adaptiveMasteryPlan.targetGoal === preset;
                      return (
                        <button
                          key={preset}
                          type="button"
                          onClick={() => {
                            const days = preset.includes('30') ? 30 : preset.includes('45') ? 45 : preset.includes('60') ? 60 : 90;
                            const targetDate = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
                            updateAdaptiveMasteryPlan({
                              targetGoal: preset,
                              targetDays: days,
                              targetDate,
                              dailyPace: Math.max(1, Math.ceil(25 / days)),
                            });
                          }}
                          className={`px-3 py-1.5 rounded-xl border text-xs font-semibold transition ${
                            isSelected
                              ? 'border-indigo-500 bg-indigo-500/10 text-indigo-500'
                              : 'border-slate-200 dark:border-slate-800 text-muted hover:text-primary'
                          }`}
                        >
                          {preset}
                        </button>
                      );
                    })}
                  </div>
                  <input
                    id="settings-adaptive-goal"
                    type="text"
                    value={adaptiveMasteryPlan.targetGoal}
                    onChange={(e) => updateAdaptiveMasteryPlan({ targetGoal: e.target.value })}
                    placeholder="e.g. Placements in 45 days, here's today's set"
                    className="form-input text-xs py-2 w-full"
                  />
                </div>

                {/* Days remaining slider */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-primary">Timeline Horizon</span>
                    <span className="text-xs font-mono font-bold text-indigo-500 bg-indigo-500/10 px-2 py-0.5 rounded-md">
                      {adaptiveMasteryPlan.targetDays} Days Target
                    </span>
                  </div>
                  <input
                    type="range"
                    min={14}
                    max={180}
                    step={1}
                    value={adaptiveMasteryPlan.targetDays}
                    onChange={(e) => {
                      const days = Number(e.target.value);
                      const targetDate = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
                      updateAdaptiveMasteryPlan({
                        targetDays: days,
                        targetDate,
                        dailyPace: Math.max(1, Math.ceil(25 / days)),
                      });
                    }}
                    className="w-full accent-indigo-600"
                  />
                </div>

                {/* Dynamic Calculated Pacing Preview Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3.5 rounded-xl border" style={{ borderColor: 'var(--ca-border)', background: 'var(--ca-surface-muted)' }}>
                    <p className="text-[10px] font-bold uppercase text-muted">Daily Target Pace</p>
                    <p className="mt-1 text-base sm:text-lg font-extrabold text-primary flex items-center gap-1.5">
                      <Flame size={16} className="text-orange-500" />
                      <span>{Math.max(1, Math.ceil(25 / adaptiveMasteryPlan.targetDays))} blueprints / day</span>
                    </p>
                    <p className="mt-0.5 text-[10px] text-muted">To conquer 25 blueprints</p>
                  </div>

                  <div className="p-3.5 rounded-xl border" style={{ borderColor: 'var(--ca-border)', background: 'var(--ca-surface-muted)' }}>
                    <p className="text-[10px] font-bold uppercase text-muted">Target Completion</p>
                    <p className="mt-1 text-base sm:text-lg font-extrabold text-primary flex items-center gap-1.5">
                      <Calendar size={16} className="text-indigo-400" />
                      <span>{adaptiveMasteryPlan.targetDate}</span>
                    </p>
                    <p className="mt-0.5 text-[10px] text-muted">{adaptiveMasteryPlan.targetDays} days countdown</p>
                  </div>

                  <div className="p-3.5 rounded-xl border" style={{ borderColor: 'var(--ca-border)', background: 'var(--ca-surface-muted)' }}>
                    <p className="text-[10px] font-bold uppercase text-muted">Curriculum Scope</p>
                    <p className="mt-1 text-base sm:text-lg font-extrabold text-emerald-500 flex items-center gap-1.5">
                      <CheckCircle2 size={16} />
                      <span>25 Blueprints</span>
                    </p>
                    <p className="mt-0.5 text-[10px] text-muted">5 Core Algorithmic Patterns</p>
                  </div>
                </div>

                {/* Adaptive Options Toggle */}
                <div className="pt-2">
                  <PrivacyToggle
                    label="Prioritize Unmastered &amp; Harder Patterns First"
                    description="Dynamically pushes patterns with lower completion rates to the front of today's set."
                    checked={adaptiveMasteryPlan.prioritizeWeakPatterns}
                    onChange={(checked) => updateAdaptiveMasteryPlan({ prioritizeWeakPatterns: checked })}
                    icon={Sliders}
                  />
                </div>

                {/* Navigation CTA */}
                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs text-muted">
                    Adaptive plan is active in YearPlanner.
                  </span>
                  <Link
                    to="/year"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-500 hover:text-indigo-400 hover:underline"
                  >
                    <span>View Today&apos;s Set in YearPlanner</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Topic: Account & Security */}
        <section aria-labelledby="settings-account-title">
          <h2
            id="settings-account-title"
            className="text-xl sm:text-2xl font-extrabold text-primary tracking-tight mb-6"
          >
            Account & Authentication
          </h2>

          <div>
            {user ? (
              <div
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 p-5 rounded-2xl border transition-all"
                style={{ borderColor: 'var(--ca-border)', background: 'var(--ca-surface)' }}
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl font-bold text-sm select-none"
                    style={{
                      background: 'color-mix(in srgb, var(--ca-accent-solid) 14%, var(--ca-surface-muted))',
                      color: 'var(--ca-accent-solid)',
                      border: '1px solid color-mix(in srgb, var(--ca-accent-solid) 24%, transparent)',
                    }}
                  >
                    {user?.name ? (
                      user.name
                        .split(' ')
                        .map((n) => n[0])
                        .slice(0, 2)
                        .join('')
                        .toUpperCase()
                    ) : (
                      <UserRound size={18} />
                    )}
                  </div>

                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-sm font-bold text-primary truncate">
                        {user.name || 'Developer'}
                      </h3>
                      {user?.role === 'admin' && (
                        <span className="rounded-full bg-indigo-500/15 px-2 py-0.5 text-[9px] font-bold text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                          Administrator
                        </span>
                      )}
                    </div>
                    <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-muted">
                      <span className="truncate">{user.email || 'No email connected'}</span>
                      {user?.email && (
                        user.email_verified ? (
                          <span className="inline-flex items-center gap-1 text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                            <CheckCircle2 size={10} /> Verified
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[10px] text-amber-600 dark:text-amber-400 font-semibold bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                            <Clock size={10} /> Unverified
                          </span>
                        )
                      )}
                    </div>
                  </div>
                </div>

                <div
                  className="flex items-center gap-2.5 flex-wrap sm:shrink-0 pt-3 sm:pt-0 border-t sm:border-t-0"
                  style={{ borderColor: 'var(--ca-border)' }}
                >
                  {!user?.email_verified && (
                    <Link
                      to="/verify-email"
                      className="btn-secondary py-2 px-3 text-xs font-semibold"
                    >
                      Verify email
                    </Link>
                  )}
                  <Link
                    to="/forgot-password"
                    className="btn-secondary py-2 px-3.5 text-xs font-semibold flex items-center gap-1.5"
                  >
                    <KeyRound size={13} />
                    <span>Reset password</span>
                  </Link>
                  <button
                    type="button"
                    onClick={() => void signOut()}
                    className="btn-secondary py-2 px-3.5 text-xs font-semibold flex items-center gap-1.5 hover:border-rose-500/30 hover:bg-rose-500/10 hover:text-rose-500 transition"
                  >
                    <LogOut size={13} />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            ) : (
              <div
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 p-5 rounded-2xl border transition-all"
                style={{ borderColor: 'var(--ca-border)', background: 'var(--ca-surface)' }}
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl font-bold text-sm select-none"
                    style={{
                      background: 'color-mix(in srgb, var(--ca-accent-solid) 14%, var(--ca-surface-muted))',
                      color: 'var(--ca-accent-solid)',
                      border: '1px solid color-mix(in srgb, var(--ca-accent-solid) 24%, transparent)',
                    }}
                  >
                    <UserRound size={18} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-primary">Guest Account</h3>
                    <p className="mt-0.5 text-xs text-muted">
                      You are exploring PrismCode as a guest. Sign in to save settings, sync editor preferences, and track progress.
                    </p>
                  </div>
                </div>

                <Link
                  to="/login"
                  state={{ from: { pathname: '/settings' }, backgroundLocation: { pathname: '/settings' } }}
                  className="btn-primary py-2 px-4 text-xs font-semibold shrink-0"
                >
                  Sign in to your account
                </Link>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
