import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AlertCircle,
  ArrowRight,
  Brain,
  Briefcase,
  CheckCircle2,
  Cpu,
  Database,
  GraduationCap,
  History,
  Layers,
  Play,
  RotateCcw,
  Search,
  Sparkles,
  Terminal,
  Trophy,
  UserCheck,
  X,
} from 'lucide-react';
import { COMPANY_ASSESSMENTS } from '../data/placement/assessments';
import { PLACEMENT_COMPANIES } from '../data/placement/companies';
import { CompanyAssessment, CompanyCategory } from '../types/placement';
import { clearActiveSession, getPlacementHistory, getStoredActiveSession } from '../lib/placement/progress';
import CompanyCard from '../components/placement/CompanyCard';
import AptitudePracticeTab from '../components/placement/curriculum/AptitudePracticeTab';
import CsFundamentalsTab from '../components/placement/curriculum/CsFundamentalsTab';
import SqlPracticeTab from '../components/placement/curriculum/SqlPracticeTab';
import ResumeHrPrepTab from '../components/placement/curriculum/ResumeHrPrepTab';

export default function PlacementHub() {
  const navigate = useNavigate();

  const [currentHubTab, setCurrentHubTab] = useState<'oa_mocks' | 'aptitude' | 'cs_core' | 'sql_arena' | 'resume_hr'>('oa_mocks');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<'all' | CompanyCategory>('all');
  const [selectedCompanyFilter, setSelectedCompanyFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [activeSession, setActiveSession] = useState(() => getStoredActiveSession());
  const [switchModalAssessment, setSwitchModalAssessment] = useState<CompanyAssessment | null>(null);

  // Sync activeSession whenever window focus or state changes
  useEffect(() => {
    setActiveSession(getStoredActiveSession());
  }, []);

  const history = useMemo(() => getPlacementHistory(), []);

  // Compute best percentile per assessment from history
  const bestPercentiles = useMemo(() => {
    const map: Record<string, number> = {};
    for (const h of history) {
      if (!map[h.assessmentId] || h.projectedPercentile > map[h.assessmentId]) {
        map[h.assessmentId] = h.projectedPercentile;
      }
    }
    return map;
  }, [history]);

  // Telemetry summary
  const totalAttempts = history.length;
  const avgPercentile =
    totalAttempts > 0
      ? Math.round(
          history.reduce((acc, curr) => acc + curr.projectedPercentile, 0) / totalAttempts
        )
      : 0;

  // Compute available companies according to category filter
  const availableCompanies = useMemo(() => {
    const all = Object.values(PLACEMENT_COMPANIES);
    if (selectedCategoryFilter === 'all') return all;
    return all.filter((c) => c.category === selectedCategoryFilter);
  }, [selectedCategoryFilter]);

  const handleCategoryChange = (cat: 'all' | CompanyCategory) => {
    setSelectedCategoryFilter(cat);
    if (cat !== 'all' && selectedCompanyFilter !== 'all') {
      const comp = PLACEMENT_COMPANIES[selectedCompanyFilter as keyof typeof PLACEMENT_COMPANIES];
      if (comp && comp.category !== cat) {
        setSelectedCompanyFilter('all');
      }
    }
  };

  // Filter assessments
  const filteredAssessments = useMemo(() => {
    return COMPANY_ASSESSMENTS.filter((a) => {
      const compCategory = PLACEMENT_COMPANIES[a.companyId]?.category;
      if (selectedCategoryFilter !== 'all' && compCategory !== selectedCategoryFilter) {
        return false;
      }
      if (selectedCompanyFilter !== 'all' && a.companyId !== selectedCompanyFilter) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = a.title.toLowerCase().includes(q);
        const matchesCompany = a.companyName.toLowerCase().includes(q);
        const matchesTrack = a.track.toLowerCase().includes(q);
        const matchesTags = a.tags.some((t) => t.toLowerCase().includes(q));
        return matchesTitle || matchesCompany || matchesTrack || matchesTags;
      }
      return true;
    });
  }, [selectedCategoryFilter, selectedCompanyFilter, searchQuery]);

  const activeAssessmentObj = useMemo(() => {
    if (!activeSession) return null;
    return COMPANY_ASSESSMENTS.find((a) => a.id === activeSession.assessmentId) || null;
  }, [activeSession]);

  const handleLaunch = (assessmentId: string) => {
    // If an assessment is currently ongoing and user clicked a DIFFERENT mock, confirm switch
    if (activeSession && !activeSession.isCompleted && activeSession.assessmentId !== assessmentId) {
      const target = COMPANY_ASSESSMENTS.find((a) => a.id === assessmentId);
      if (target) {
        setSwitchModalAssessment(target);
        return;
      }
    }
    navigate(`/placement/${assessmentId}`);
  };

  const handleResumeActive = () => {
    if (activeSession) {
      navigate(`/placement/${activeSession.assessmentId}`);
    }
  };

  const handleDiscardActive = () => {
    clearActiveSession();
    setActiveSession(null);
  };

  return (
    <div className="mx-auto max-w-[1560px] px-3 sm:px-5 lg:px-7 py-6 space-y-8 animate-in fade-in duration-200">
      {/* Top Hub Curriculum & Mode Selector */}
      <div
        className="flex items-center gap-2 overflow-x-auto pb-2 border-b"
        style={{ borderColor: 'var(--ca-border)' }}
      >
        {[
          {
            id: 'oa_mocks' as const,
            label: 'Company OA Simulations',
            icon: GraduationCap,
            badge: `${COMPANY_ASSESSMENTS.length} Full Mocks`,
          },
          {
            id: 'aptitude' as const,
            label: 'Aptitude Mastery',
            icon: Brain,
            badge: 'Quant · Logical · Verbal',
          },
          {
            id: 'cs_core' as const,
            label: 'Core CS Fundamentals',
            icon: Cpu,
            badge: 'OS · DBMS · CN · OOP',
          },
          {
            id: 'sql_arena' as const,
            label: 'SQL Practice Arena',
            icon: Database,
            badge: '5 Schemas',
          },
          {
            id: 'resume_hr' as const,
            label: 'ATS Resume & HR Round',
            icon: UserCheck,
            badge: 'STAR Blueprint',
          },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = currentHubTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setCurrentHubTab(tab.id)}
              className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold whitespace-nowrap transition-all border ${
                isActive
                  ? 'bg-indigo-600 text-white border-indigo-500 shadow-xs'
                  : 'text-muted hover:text-primary hover:bg-[var(--ca-surface-muted)]'
              }`}
              style={{
                backgroundColor: isActive ? undefined : 'var(--ca-surface)',
                borderColor: isActive ? undefined : 'var(--ca-border)',
              }}
            >
              <Icon size={16} className={isActive ? 'text-white' : 'text-indigo-400'} />
              <span>{tab.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-md font-medium ${
                  isActive ? 'bg-white/20 text-white' : 'bg-[var(--ca-surface-muted)] text-muted'
                }`}
              >
                {tab.badge}
              </span>
            </button>
          );
        })}
      </div>

      {currentHubTab === 'aptitude' && <AptitudePracticeTab />}
      {currentHubTab === 'cs_core' && <CsFundamentalsTab />}
      {currentHubTab === 'sql_arena' && <SqlPracticeTab />}
      {currentHubTab === 'resume_hr' && <ResumeHrPrepTab />}

      {currentHubTab === 'oa_mocks' && (
        <>
          {/* Resume Banner (if an unfinished session exists) */}
          {activeSession && !activeSession.isCompleted && (
            <div
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border p-4 sm:p-5 shadow-xs transition-all"
              style={{
                borderColor: 'color-mix(in srgb, var(--ca-accent-solid) 35%, var(--ca-border))',
                backgroundColor: 'color-mix(in srgb, var(--ca-accent-solid) 8%, var(--ca-surface))',
              }}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-sm">
                  <Play size={18} />
                </div>
                <div>
                  <div className="text-[11px] font-bold text-indigo-400 uppercase tracking-wider">
                    Unfinished Mock In Progress
                  </div>
                  <div className="text-sm font-bold text-primary">
                    {activeAssessmentObj?.title || 'Assessment in progress'}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-auto">
                <button
                  type="button"
                  onClick={handleDiscardActive}
                  className="rounded-xl border px-3 py-1.5 text-xs font-semibold text-muted hover:text-rose-500 transition-colors"
                  style={{ borderColor: 'var(--ca-border)' }}
                >
                  Discard
                </button>
                <button
                  type="button"
                  onClick={handleResumeActive}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 px-4 py-2 text-xs font-bold text-white shadow-sm transition-colors"
                >
                  <span>Resume Test</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          )}

          {/* Hero Showcase Banner */}
          <div
            className="relative overflow-hidden rounded-3xl border p-6 sm:p-8 md:p-10 shadow-sm"
            style={{
              borderColor: 'color-mix(in srgb, var(--ca-accent-solid) 30%, var(--ca-border))',
              background:
                'radial-gradient(ellipse at top left, color-mix(in srgb, var(--ca-accent-solid) 12%, transparent), var(--ca-surface))',
            }}
          >
            <div className="max-w-3xl space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3 py-1 text-xs font-bold text-indigo-400">
                <GraduationCap size={14} />
                <span>Tier 2 & 3 Campus Recruitment & OA Simulator</span>
              </div>

              <h1 className="font-display text-2xl sm:text-4xl font-extrabold tracking-tight text-primary">
                Ace Mass-Recruiter & Mid-Size OAs
              </h1>

              <p className="text-xs sm:text-sm text-muted leading-relaxed">
                Full-fidelity multi-section assessments with strict section locks, countdown timers,
                negative marking, and raw <strong>stdin/stdout</strong> coding execution matching{' '}
                <strong>TCS NQT</strong>, <strong>Infosys</strong>, <strong>Accenture</strong>,{' '}
                <strong>Wipro</strong>, <strong>Cognizant</strong>, <strong>Zoho</strong>,{' '}
                <strong>Persistent</strong>, and <strong>Capgemini</strong>.
              </p>
            </div>

            {/* Telemetry Stats Strip */}
            <div
              className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 border-t pt-6"
              style={{ borderColor: 'var(--ca-border)' }}
            >
              <div
                className="rounded-2xl border p-3.5 shadow-xs"
                style={{
                  borderColor: 'var(--ca-border)',
                  backgroundColor: 'var(--ca-surface)',
                }}
              >
                <div className="text-[11px] font-medium text-muted">Company Mocks</div>
                <div className="mt-1 font-display text-2xl font-bold text-primary">
                  {COMPANY_ASSESSMENTS.length}
                </div>
                <div className="mt-0.5 text-[10px] text-muted">Mass Recruiters + Mid-Size</div>
              </div>

              <div
                className="rounded-2xl border p-3.5 shadow-xs"
                style={{
                  borderColor: 'var(--ca-border)',
                  backgroundColor: 'var(--ca-surface)',
                }}
              >
                <div className="text-[11px] font-medium text-muted">Attempts Taken</div>
                <div className="mt-1 font-display text-2xl font-bold text-primary">
                  {totalAttempts}
                </div>
                <div className="mt-0.5 text-[10px] text-muted">Saved in browser storage</div>
              </div>

              <div
                className="rounded-2xl border p-3.5 shadow-xs"
                style={{
                  borderColor: 'var(--ca-border)',
                  backgroundColor: 'var(--ca-surface)',
                }}
              >
                <div className="text-[11px] font-medium text-muted">Avg Percentile</div>
                <div className="mt-1 font-display text-2xl font-bold text-emerald-500">
                  {avgPercentile > 0 ? `${avgPercentile}%` : '—'}
                </div>
                <div className="mt-0.5 text-[10px] text-muted">National benchmark</div>
              </div>

              <div
                className="rounded-2xl border p-3.5 shadow-xs"
                style={{
                  borderColor: 'var(--ca-border)',
                  backgroundColor: 'var(--ca-surface)',
                }}
              >
                <div className="text-[11px] font-medium text-muted">Past Reports</div>
                <button
                  type="button"
                  disabled={totalAttempts === 0}
                  onClick={() => setIsHistoryOpen(true)}
                  className="mt-1 flex items-center gap-1.5 font-display text-sm font-bold text-indigo-400 hover:text-indigo-300 disabled:opacity-40 transition-colors"
                >
                  <History size={16} />
                  <span>View History ({totalAttempts})</span>
                </button>
                <div className="mt-0.5 text-[10px] text-muted">Scorecard archive</div>
              </div>
            </div>
          </div>

          {/* Category Switcher Tabs */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
              <span className="text-xs font-semibold text-muted shrink-0 mr-1">Category:</span>
              <button
                type="button"
                onClick={() => handleCategoryChange('all')}
                className={`rounded-xl px-3.5 py-1.5 font-bold whitespace-nowrap border transition-all ${
                  selectedCategoryFilter === 'all'
                    ? 'bg-indigo-600 text-white border-indigo-500 shadow-xs'
                    : 'text-muted hover:text-primary'
                }`}
                style={{
                  backgroundColor: selectedCategoryFilter === 'all' ? undefined : 'var(--ca-surface)',
                  borderColor: selectedCategoryFilter === 'all' ? undefined : 'var(--ca-border)',
                }}
              >
                All Companies ({COMPANY_ASSESSMENTS.length})
              </button>
              <button
                type="button"
                onClick={() => handleCategoryChange('mass_recruiter')}
                className={`rounded-xl px-3.5 py-1.5 font-bold whitespace-nowrap border transition-all ${
                  selectedCategoryFilter === 'mass_recruiter'
                    ? 'bg-indigo-600 text-white border-indigo-500 shadow-xs'
                    : 'text-muted hover:text-primary'
                }`}
                style={{
                  backgroundColor: selectedCategoryFilter === 'mass_recruiter' ? undefined : 'var(--ca-surface)',
                  borderColor: selectedCategoryFilter === 'mass_recruiter' ? undefined : 'var(--ca-border)',
                }}
              >
                Mass Recruiters (TCS, Infy, Wipro, Accenture, Cognizant)
              </button>
              <button
                type="button"
                onClick={() => handleCategoryChange('mid_size')}
                className={`rounded-xl px-3.5 py-1.5 font-bold whitespace-nowrap border transition-all ${
                  selectedCategoryFilter === 'mid_size'
                    ? 'bg-indigo-600 text-white border-indigo-500 shadow-xs'
                    : 'text-muted hover:text-primary'
                }`}
                style={{
                  backgroundColor: selectedCategoryFilter === 'mid_size' ? undefined : 'var(--ca-surface)',
                  borderColor: selectedCategoryFilter === 'mid_size' ? undefined : 'var(--ca-border)',
                }}
              >
                Mid-Size Recruiters (Zoho, Persistent, Capgemini)
              </button>
            </div>

            {/* Filter & Search Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              {/* Company Pill Tabs */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
                <button
                  type="button"
                  onClick={() => setSelectedCompanyFilter('all')}
                  className={`rounded-xl px-3.5 py-1.5 font-bold whitespace-nowrap border transition-all ${
                    selectedCompanyFilter === 'all'
                      ? 'bg-indigo-600 text-white border-indigo-500 shadow-xs'
                      : 'text-muted hover:text-primary'
                  }`}
                  style={{
                    backgroundColor: selectedCompanyFilter === 'all' ? undefined : 'var(--ca-surface)',
                    borderColor: selectedCompanyFilter === 'all' ? undefined : 'var(--ca-border)',
                  }}
                >
                  All in Category
                </button>

                {availableCompanies.map((comp) => {
                  const isSelected = selectedCompanyFilter === comp.id;
                  return (
                    <button
                      key={comp.id}
                      type="button"
                      onClick={() => setSelectedCompanyFilter(comp.id)}
                      className={`rounded-xl px-3.5 py-1.5 font-bold whitespace-nowrap border transition-all ${
                        isSelected
                          ? 'bg-indigo-600 text-white border-indigo-500 shadow-xs'
                          : 'text-muted hover:text-primary'
                      }`}
                      style={{
                        backgroundColor: isSelected ? undefined : 'var(--ca-surface)',
                        borderColor: isSelected ? undefined : 'var(--ca-border)',
                      }}
                    >
                      {comp.shortName}
                    </button>
                  );
                })}
              </div>

              {/* Search Input */}
              <div className="relative w-full sm:w-64">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted opacity-60" />
                <input
                  type="text"
                  placeholder="Search company or track..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-xl border pl-8 pr-3 py-1.5 text-xs text-primary placeholder:text-muted focus:outline-none focus:border-indigo-500 transition-colors"
                  style={{
                    backgroundColor: 'var(--ca-surface)',
                    borderColor: 'var(--ca-border)',
                  }}
                />
              </div>
            </div>
          </div>

          {/* Assessment Cards Grid */}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredAssessments.map((assessment) => (
              <CompanyCard
                key={assessment.id}
                assessment={assessment}
                onStart={handleLaunch}
                bestAttemptPercentile={bestPercentiles[assessment.id]}
                isActiveSession={activeSession?.assessmentId === assessment.id && !activeSession.isCompleted}
              />
            ))}
          </div>
        </>
      )}

      {/* Switch Mock Confirmation Modal */}
      {switchModalAssessment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div
            className="w-full max-w-md rounded-2xl border p-6 shadow-2xl space-y-4"
            style={{ backgroundColor: 'var(--ca-surface)', borderColor: 'var(--ca-border)' }}
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500 border border-amber-500/20">
                <AlertCircle size={20} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-primary">Switch Active Assessment?</h3>
                <p className="text-xs text-muted">You have a mock currently in progress.</p>
              </div>
            </div>

            <p className="text-xs text-muted leading-relaxed">
              You are currently taking <strong>{activeAssessmentObj?.title || 'an assessment'}</strong>. Launching{' '}
              <strong>{switchModalAssessment.title}</strong> will switch your active session to this new assessment.
            </p>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setSwitchModalAssessment(null)}
                className="rounded-xl border px-3.5 py-1.5 text-xs font-semibold text-muted hover:text-primary transition-colors"
                style={{ borderColor: 'var(--ca-border)' }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  const targetId = switchModalAssessment.id;
                  setSwitchModalAssessment(null);
                  clearActiveSession();
                  navigate(`/placement/${targetId}`);
                }}
                className="rounded-xl bg-indigo-600 hover:bg-indigo-500 px-4 py-1.5 text-xs font-bold text-white shadow-sm transition-colors"
              >
                Switch to {switchModalAssessment.companyName}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* History Modal */}
      {isHistoryOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div
            className="w-full max-w-xl rounded-2xl border p-6 shadow-2xl max-h-[80vh] flex flex-col"
            style={{
              backgroundColor: 'var(--ca-surface)',
              borderColor: 'var(--ca-border)',
            }}
          >
            <div
              className="flex items-center justify-between border-b pb-3"
              style={{ borderColor: 'var(--ca-border)' }}
            >
              <h3 className="font-display text-base font-bold text-primary flex items-center gap-2">
                <History size={16} className="text-indigo-400" />
                <span>Placement Mock History</span>
              </h3>
              <button
                type="button"
                onClick={() => setIsHistoryOpen(false)}
                className="text-xs font-semibold text-muted hover:text-primary transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            <div className="mt-4 flex-1 overflow-y-auto space-y-3">
              {history.map((h) => (
                <div
                  key={h.id}
                  className="rounded-xl border p-3.5 flex items-center justify-between transition-colors"
                  style={{
                    borderColor: 'var(--ca-border)',
                    backgroundColor: 'var(--ca-surface-muted)',
                  }}
                >
                  <div>
                    <div className="text-xs font-bold text-primary">
                      {h.assessmentTitle}
                    </div>
                    <div className="text-[11px] text-muted">
                      Score: {h.totalScore}/{h.maxScore} ({h.percentage}%) •{' '}
                      {new Date(h.completedAt).toLocaleDateString()}
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="font-display text-base font-extrabold text-emerald-500">
                      {h.projectedPercentile}%ile
                    </span>
                    <div className="text-[10px] text-muted">{h.verdictTier.trackName}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
