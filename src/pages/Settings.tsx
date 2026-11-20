import {
  Activity,
  Award,
  Building,
  Check,
  CheckCircle2,
  Clock,
  Eye,
  EyeOff,
  Globe,
  Lock,
  Mail,
  MapPin,
  Moon,
  Palette,
  Share2,
  Shield,
  Sun,
  UserCheck,
  User,
  KeyRound,
  LogOut,
  type LucideIcon,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
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
      className="flex items-start justify-between gap-4 rounded-xl border p-3.5 transition"
      style={{ borderColor: 'var(--ca-border)', background: 'var(--ca-surface)' }}
    >
      <div className="flex items-start gap-3">
        {Icon && (
          <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
            <Icon size={14} />
          </span>
        )}
        <div>
          <p className="text-xs font-bold text-primary">{label}</p>
          <p className="mt-0.5 text-[11px] text-muted">{description}</p>
        </div>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${checked ? 'bg-indigo-600' : 'bg-slate-300 dark:bg-slate-700'}`}
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
    privacySettings,
    updatePrivacySettings,
  } = useApp();

  return (
    <div className="space-y-6">
      <section className="page-heading-row">
        <div>
          <p className="section-kicker">PREFERENCES & PRIVACY</p>
          <h2 className="page-title">Settings</h2>
          <p className="page-subtitle">
            Manage your workspace appearance and configure what others see when searching for your developer profile.
          </p>
        </div>
      </section>

      {/* 1. Appearance Section */}
      <section className="panel-card overflow-hidden">
        <div className="flex items-start gap-3 border-b p-5 sm:p-6" style={{ borderColor: 'var(--ca-border)' }}>
          <span className="settings-icon"><Palette size={18}/></span>
          <div>
            <h3 className="section-title text-base">Appearance</h3>
            <p className="mt-1 text-xs text-muted">Choose a display mode and a full interface color system.</p>
          </div>
        </div>
        <div className="space-y-7 p-5 sm:p-6">
          <div>
            <div className="mb-3">
              <p className="text-xs font-bold text-primary">Display mode</p>
              <p className="mt-1 text-[11px] text-muted">Light and dark modes adapt each palette for comfortable contrast.</p>
            </div>
            <div className="grid max-w-lg grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setTheme('light')}
                className={`mode-option ${theme === 'light' ? 'mode-option-active' : ''}`}
                aria-pressed={theme === 'light'}
              >
                <span className="mode-preview mode-preview-light"><span/><span/><span/></span>
                <span className="flex items-center gap-2 text-xs font-bold"><Sun size={15}/> Light</span>
                {theme === 'light' && <Check className="mode-check" size={16} />}
              </button>
              <button
                type="button"
                onClick={() => setTheme('dark')}
                className={`mode-option ${theme === 'dark' ? 'mode-option-active' : ''}`}
                aria-pressed={theme === 'dark'}
              >
                <span className="mode-preview mode-preview-dark"><span/><span/><span/></span>
                <span className="flex items-center gap-2 text-xs font-bold"><Moon size={15}/> Dark</span>
                {theme === 'dark' && <Check className="mode-check" size={16} />}
              </button>
            </div>
          </div>

          <div>
            <div className="mb-4">
              <p className="text-xs font-bold text-primary">Color palette</p>
              <p className="mt-1 text-[11px] text-muted">Each palette changes the page canvas, panel surfaces, borders, gradients, and accent colors.</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {themePalettes.map((item) => {
                const selected = palette === item.id;
                const isDark = theme === 'dark';
                const canvasBg = isDark ? (item.darkCanvas ?? item.editorDark) : item.colors[4];
                const panelBg = isDark ? (item.darkSurface ?? item.colors[0]) : item.colors[0];
                const accentBg = isDark ? (item.darkPrimary ?? item.primary) : item.primary;
                const highlightBg = isDark ? (item.darkSecondary ?? item.secondary) : item.secondary;
                const swatchColors = isDark && item.darkColors ? item.darkColors : item.colors;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setPalette(item.id)}
                    aria-pressed={selected}
                    className={`palette-option ${selected ? 'palette-option-active' : ''}`}
                  >
                    <span className="palette-preview" aria-hidden="true">
                      <span className="palette-preview-canvas" style={{ background: canvasBg }}/>
                      <span className="palette-preview-panel" style={{ background: panelBg }}/>
                      <span className="palette-preview-accent" style={{ background: accentBg }}/>
                      <span className="palette-preview-highlight" style={{ background: highlightBg }}/>
                    </span>
                    <span className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold text-primary">{item.name}</span>
                      {selected && <span className="selected-pill"><Check size={11}/> Selected</span>}
                    </span>
                    <span className="mt-1 block text-left text-[10px] leading-4 text-muted">{item.description}</span>
                    <span className="mt-3 flex h-2.5 overflow-hidden rounded-full">
                      {swatchColors.map((color) => <span key={color} className="flex-1" style={{ background: color }}/>)}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 2. Privacy & Visibility Section */}
      <section className="panel-card overflow-hidden">
        <div className="flex items-start gap-3 border-b p-5 sm:p-6" style={{ borderColor: 'var(--ca-border)' }}>
          <span className="settings-icon"><Shield size={18} /></span>
          <div>
            <h3 className="section-title text-base">Privacy & Visibility</h3>
            <p className="mt-1 text-xs text-muted">
              Control what other people can see when searching for or viewing your profile.
            </p>
          </div>
        </div>

        <div className="space-y-6 p-5 sm:p-6">
          {/* Global Discoverability */}
          <div>
            <div className="mb-3">
              <p className="text-xs font-bold text-primary">Profile discoverability</p>
              <p className="mt-1 text-[11px] text-muted">
                Choose whether your developer profile appears when people search for your name or handle.
              </p>
            </div>
            <div className="grid max-w-lg grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => updatePrivacySettings({ profileVisibility: 'public' })}
                className={`mode-option text-left p-3.5 ${privacySettings.profileVisibility === 'public' ? 'mode-option-active' : ''}`}
                aria-pressed={privacySettings.profileVisibility === 'public'}
              >
                <span className="flex items-center justify-between gap-2">
                  <span className="flex items-center gap-1.5 text-xs font-bold text-primary">
                    <Globe size={15} className="text-emerald-500" /> Public profile
                  </span>
                  {privacySettings.profileVisibility === 'public' && <Check size={15} className="themed-link" />}
                </span>
                <span className="mt-1 block text-[10px] leading-4 text-muted">
                  Discoverable in search; visitors can view permitted profile details.
                </span>
              </button>

              <button
                type="button"
                onClick={() => updatePrivacySettings({ profileVisibility: 'private' })}
                className={`mode-option text-left p-3.5 ${privacySettings.profileVisibility === 'private' ? 'mode-option-active' : ''}`}
                aria-pressed={privacySettings.profileVisibility === 'private'}
              >
                <span className="flex items-center justify-between gap-2">
                  <span className="flex items-center gap-1.5 text-xs font-bold text-primary">
                    <EyeOff size={15} className="text-slate-400" /> Private profile
                  </span>
                  {privacySettings.profileVisibility === 'private' && <Check size={15} className="themed-link" />}
                </span>
                <span className="mt-1 block text-[10px] leading-4 text-muted">
                  Hidden from search; visitors only see a private account notice.
                </span>
              </button>
            </div>
          </div>

          {/* Granular Visibility Settings */}
          <div>
            <div className="mb-3">
              <p className="text-xs font-bold text-primary">Search & Profile visibility controls</p>
              <p className="mt-1 text-[11px] text-muted">
                Fine-tune each individual section visible to other people when viewing your profile:
              </p>
            </div>

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
                description="Show your company, organization, or university / college."
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
                description="Show your 52-week contribution heatmap and active streak badges."
                checked={privacySettings.showHeatmap}
                onChange={(checked) => updatePrivacySettings({ showHeatmap: checked })}
                icon={Activity}
              />
              <PrivacyToggle
                label="Solved problems & analytics"
                description="Show count of solved problems, difficulty breakdown, and recent sessions."
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
        </div>
      </section>

      {/* 3. Account & Security Section */}
      <section className="panel-card overflow-hidden">
        <div className="flex items-start gap-3 border-b p-5 sm:p-6" style={{ borderColor: 'var(--ca-border)' }}>
          <span className="settings-icon"><User size={18} /></span>
          <div>
            <h3 className="section-title text-base">Account & Authentication</h3>
            <p className="mt-1 text-xs text-muted">
              Manage your signed-in developer identity, email verification status, and credentials.
            </p>
          </div>
        </div>

        <div className="space-y-4 p-5 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl border p-4" style={{ borderColor: 'var(--ca-border)', background: 'var(--ca-surface-muted)' }}>
            <div>
              <p className="text-xs font-bold text-primary flex items-center gap-2">
                <span>{user?.name || 'Developer'}</span>
                {user?.role === 'admin' && (
                  <span className="rounded-full bg-indigo-500/15 px-2 py-0.5 text-[9px] font-bold text-indigo-600 dark:text-indigo-400">
                    Administrator
                  </span>
                )}
              </p>
              <p className="mt-1 text-[11px] text-muted flex items-center gap-2">
                <Mail size={13} />
                <span>{user?.email}</span>
                {user?.email_verified ? (
                  <span className="inline-flex items-center gap-1 text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                    <CheckCircle2 size={11} /> Verified
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[10px] text-amber-600 dark:text-amber-400 font-semibold bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                    <Clock size={11} /> Unverified
                  </span>
                )}
              </p>
            </div>

            <div className="flex items-center gap-2">
              {!user?.email_verified && (
                <Link
                  to="/verify-email"
                  className="btn-secondary py-1.5 px-3 text-xs font-medium"
                >
                  Verify Email
                </Link>
              )}
              <Link
                to="/forgot-password"
                className="btn-secondary py-1.5 px-3 text-xs font-medium flex items-center gap-1.5"
              >
                <KeyRound size={13} />
                <span>Reset Password</span>
              </Link>
              <button
                type="button"
                onClick={() => void signOut()}
                className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-xl border border-rose-500/30 bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 text-xs font-medium transition"
              >
                <LogOut size={13} />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <div
        className="rounded-xl border px-4 py-3 text-[11px] text-muted"
        style={{ borderColor: 'var(--ca-border)', background: 'var(--ca-surface-muted)' }}
      >
        All appearance and privacy preferences are saved locally in this browser and applied automatically across all views.
      </div>
    </div>
  );
}
