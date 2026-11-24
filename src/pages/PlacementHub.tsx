import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Award,
  BookOpen,
  Briefcase,
  CheckCircle2,
  Clock,
  ExternalLink,
  GraduationCap,
  History,
  Play,
  RotateCcw,
  Search,
  Sparkles,
  Trophy,
  Users,
  Zap,
} from 'lucide-react';
import { COMPANY_ASSESSMENTS } from '../data/placement/assessments';
import { PLACEMENT_COMPANIES } from '../data/placement/companies';
import { CompanyAssessment, PlacementCompanyId } from '../types/placement';
import { getPlacementHistory, getStoredActiveSession } from '../lib/placement/progress';
import CompanyCard from '../components/placement/CompanyCard';

export default function PlacementHub() {
  const navigate = useNavigate();

  const [selectedCompanyFilter, setSelectedCompanyFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  const history = useMemo(() => getPlacementHistory(), []);
  const activeSession = useMemo(() => getStoredActiveSession(), []);

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

  // Filter assessments
  const filteredAssessments = useMemo(() => {
    return COMPANY_ASSESSMENTS.filter((a) => {
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
  }, [selectedCompanyFilter, searchQuery]);

  const handleLaunch = (assessmentId: string) => {
    navigate(`/placement/${assessmentId}`);
  };

  const handleResumeActive = () => {
    if (activeSession) {
      navigate(`/placement/${activeSession.assessmentId}`);
    }
  };

  return (
    <div className="mx-auto max-w-[1560px] px-3 sm:px-5 lg:px-7 py-6 space-y-8 animate-in fade-in duration-200">
      {/* Resume Banner (if an unfinished session exists) */}
      {activeSession && !activeSession.isCompleted && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-blue-300/80 bg-blue-50/90 p-4 sm:p-5 dark:border-blue-900/60 dark:bg-blue-950/40 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
              <Play size={18} />
            </div>
            <div>
              <div className="text-xs font-bold text-blue-700 dark:text-blue-300 uppercase tracking-wider">
                Unfinished Mock In Progress
              </div>
              <div className="text-sm font-bold text-slate-900 dark:text-white">
                You have an ongoing assessment session saved.
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={handleResumeActive}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-blue-700 transition-colors"
          >
            <span>Resume Test</span>
            <ArrowRight size={14} />
          </button>
        </div>
      )}

      {/* Hero Showcase Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-slate-200/90 bg-gradient-to-br from-white via-slate-50/40 to-blue-50/30 p-6 sm:p-10 shadow-sm dark:border-neutral-800/80 dark:from-neutral-900 dark:via-neutral-900/80 dark:to-blue-950/20">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-600 dark:text-blue-400">
            <GraduationCap size={14} />
            <span>Campus Recruitment & Online Assessment Simulator</span>
          </div>

          <h1 className="font-display text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Ace Mass-Recruiter OAs & Aptitude
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-neutral-300 leading-relaxed">
            Full-fidelity mock tests matching the exact question patterns, sectional countdown timers,
            marking schemes, and question matrix palettes of <strong>TCS NQT</strong>, <strong>Infosys</strong>, <strong>Accenture</strong>, <strong>Wipro Elite</strong>, and <strong>Cognizant</strong>.
          </p>
        </div>

        {/* Telemetry Stats Strip */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 border-t border-slate-200/70 pt-6 dark:border-neutral-800">
          <div className="rounded-2xl border border-slate-200/80 bg-white/80 p-3.5 dark:border-neutral-800 dark:bg-neutral-850/60 shadow-xs">
            <div className="text-[11px] font-medium text-slate-500 dark:text-neutral-400">Company Mocks</div>
            <div className="mt-1 font-display text-2xl font-bold text-slate-900 dark:text-white">
              {COMPANY_ASSESSMENTS.length}
            </div>
            <div className="mt-0.5 text-[10px] text-slate-500">TCS, Infy, Wipro, Acc, Cog</div>
          </div>

          <div className="rounded-2xl border border-slate-200/80 bg-white/80 p-3.5 dark:border-neutral-800 dark:bg-neutral-850/60 shadow-xs">
            <div className="text-[11px] font-medium text-slate-500 dark:text-neutral-400">Attempts Taken</div>
            <div className="mt-1 font-display text-2xl font-bold text-slate-900 dark:text-white">
              {totalAttempts}
            </div>
            <div className="mt-0.5 text-[10px] text-slate-500">Saved in browser storage</div>
          </div>

          <div className="rounded-2xl border border-slate-200/80 bg-white/80 p-3.5 dark:border-neutral-800 dark:bg-neutral-850/60 shadow-xs">
            <div className="text-[11px] font-medium text-slate-500 dark:text-neutral-400">Avg Percentile</div>
            <div className="mt-1 font-display text-2xl font-bold text-emerald-600 dark:text-emerald-400">
              {avgPercentile > 0 ? `${avgPercentile}%` : '—'}
            </div>
            <div className="mt-0.5 text-[10px] text-slate-500">National benchmark</div>
          </div>

          <div className="rounded-2xl border border-slate-200/80 bg-white/80 p-3.5 dark:border-neutral-800 dark:bg-neutral-850/60 shadow-xs">
            <div className="text-[11px] font-medium text-slate-500 dark:text-neutral-400">Past Reports</div>
            <button
              type="button"
              disabled={totalAttempts === 0}
              onClick={() => setIsHistoryOpen(true)}
              className="mt-1 flex items-center gap-1.5 font-display text-sm font-bold text-blue-600 hover:text-blue-700 dark:text-blue-400 disabled:opacity-40"
            >
              <History size={16} />
              <span>View History ({totalAttempts})</span>
            </button>
            <div className="mt-0.5 text-[10px] text-slate-500">Scorecard archive</div>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Company Pill Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          <button
            type="button"
            onClick={() => setSelectedCompanyFilter('all')}
            className={`rounded-xl px-3.5 py-1.5 font-semibold whitespace-nowrap transition-all ${
              selectedCompanyFilter === 'all'
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700'
            }`}
          >
            All Companies
          </button>

          {Object.values(PLACEMENT_COMPANIES).map((comp) => (
            <button
              key={comp.id}
              type="button"
              onClick={() => setSelectedCompanyFilter(comp.id)}
              className={`rounded-xl px-3.5 py-1.5 font-semibold whitespace-nowrap transition-all ${
                selectedCompanyFilter === comp.id
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700'
              }`}
            >
              {comp.shortName}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search company or track..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white pl-8 pr-3 py-1.5 text-xs text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none dark:border-neutral-800 dark:bg-neutral-900 dark:text-white"
          />
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
          />
        ))}
      </div>

      {/* History Modal */}
      {isHistoryOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-neutral-800 dark:bg-neutral-900 max-h-[80vh] flex flex-col">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-neutral-800">
              <h3 className="font-display text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <History size={16} className="text-blue-500" />
                <span>Placement Mock History</span>
              </h3>
              <button
                type="button"
                onClick={() => setIsHistoryOpen(false)}
                className="text-xs font-semibold text-slate-500 hover:text-slate-800 dark:text-neutral-400 dark:hover:text-white"
              >
                Close
              </button>
            </div>

            <div className="mt-4 flex-1 overflow-y-auto space-y-3">
              {history.map((h) => (
                <div
                  key={h.id}
                  className="rounded-xl border border-slate-200 p-3.5 dark:border-neutral-800 dark:bg-neutral-850/50 flex items-center justify-between"
                >
                  <div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white">
                      {h.assessmentTitle}
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-neutral-400">
                      Score: {h.totalScore}/{h.maxScore} ({h.percentage}%) • {new Date(h.completedAt).toLocaleDateString()}
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="font-display text-base font-extrabold text-emerald-600 dark:text-emerald-400">
                      {h.projectedPercentile}%ile
                    </span>
                    <div className="text-[10px] text-slate-500">{h.verdictTier.trackName}</div>
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
