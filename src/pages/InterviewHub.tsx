import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Clock,
  ExternalLink,
  Play,
  Sparkles,
  Timer,
  Trophy,
  Zap,
} from 'lucide-react';
import { INTERVIEW_PRESETS } from '../data/interview/presets';
import { generateInterviewRound } from '../data/interview/roundGenerator';
import { computeInterviewScorecard } from '../lib/interview/scoring';
import {
  getInterviewHistory,
  getStoredActiveRound,
  saveInterviewHistoryItem,
  saveStoredActiveRound,
} from '../lib/interview/progress';
import { ActiveInterviewRound, InterviewPresetId } from '../types/interview';
import InterviewHistoryModal from '../components/interview/InterviewHistoryModal';

export default function InterviewHub() {
  const navigate = useNavigate();

  const [selectedPreset, setSelectedPreset] = useState<InterviewPresetId>('faang_standard');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);

  // Auto-submit any unfinished round if candidate is on Hub (since they are out of full-screen)
  useEffect(() => {
    const existing = getStoredActiveRound();
    if (existing && !existing.isCompleted) {
      const finished: ActiveInterviewRound = {
        ...existing,
        isCompleted: true,
        submittedAt: Date.now(),
        autoSubmitReason: 'Auto-submitted: Exited full-screen mode',
      };
      const scorecard = computeInterviewScorecard(finished);
      saveInterviewHistoryItem(scorecard);
      saveStoredActiveRound(null);
    }
  }, []);

  const history = useMemo(() => getInterviewHistory(), []);

  // Compute telemetry summary from history
  const totalRounds = history.length;
  const passedRounds = history.filter(
    (h) => h.verdict === 'STRONG HIRE' || h.verdict === 'HIRE'
  ).length;
  const passRate = totalRounds > 0 ? Math.round((passedRounds / totalRounds) * 100) : 0;

  const handleLaunchRound = (presetId?: InterviewPresetId) => {
    setIsGenerating(true);
    const pid = presetId || selectedPreset;

    // Request fullscreen on user gesture
    if (typeof document !== 'undefined' && document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen().catch(() => {});
    }

    const round = generateInterviewRound(pid);
    saveStoredActiveRound(round);

    navigate(`/interview/${round.id}`);
  };

  return (
    <div className="w-full py-6 space-y-10 animate-in fade-in duration-300">
      {/* Hero Header */}
      <div
        className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b"
        style={{ borderColor: 'var(--ca-border)' }}
      >
        <div className="max-w-4xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold border border-indigo-500/20 bg-indigo-500/10 text-indigo-500">
            <Timer size={13} />
            <span>Simulated Interview Conditions</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-primary">
            Mock Technical Interview
          </h1>
          <p className="text-sm text-muted leading-relaxed">
            Transition from single-problem practice into simulated real-world conditions. Face timed 45-to-60 minute rounds pairing 1 Warm-up and 1 Anchor problem in full-screen proctored conditions with strict focus tracking and comprehensive Big-O scorecards.
          </p>
        </div>

        {/* Telemetry Stats Strip */}
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-4 text-xs font-mono shrink-0">
          {/* Clickable Rounds Completed Tile (Opens Attempt History Modal) */}
          <button
            type="button"
            onClick={() => setIsHistoryModalOpen(true)}
            className="flex items-center gap-3 rounded-2xl p-3 border transition-all duration-200 group text-left cursor-pointer hover:border-indigo-500/50 hover:bg-indigo-500/10 hover:shadow-lg active:scale-95"
            style={{ borderColor: 'var(--ca-border)', backgroundColor: 'var(--ca-surface)' }}
            title="Click to view your complete interview attempt history"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-500 border border-indigo-500/20 group-hover:scale-105 group-hover:bg-indigo-500/20 transition-all">
              <Trophy size={16} />
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-[10px] uppercase font-sans font-bold text-muted group-hover:text-indigo-400 transition-colors">
                <span>Rounds Completed</span>
                <ExternalLink size={10} className="opacity-60 group-hover:opacity-100" />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-sm font-bold text-primary">{totalRounds}</span>
                <span className="text-[10px] font-sans text-indigo-400 font-medium group-hover:underline">
                  View History →
                </span>
              </div>
            </div>
          </button>

          <div
            className="flex items-center gap-2.5 rounded-2xl p-3 border"
            style={{ borderColor: 'var(--ca-border)', backgroundColor: 'var(--ca-surface)' }}
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
              <Sparkles size={16} />
            </div>
            <div>
              <div className="text-[10px] uppercase font-sans font-bold text-muted">Hire Rate</div>
              <div className="text-sm font-bold text-emerald-500">{passRate}%</div>
            </div>
          </div>
        </div>
      </div>

      {/* Presets Selection Section */}
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-bold text-primary">Select Interview Format</h2>
          <p className="text-xs text-muted">Choose your desired round length and evaluation benchmark.</p>
        </div>

        {/* 3 Clean Preset Cards (No P1/P2 difficulty labels, no divider line, no focus guard pill) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {INTERVIEW_PRESETS.map((preset) => {
            const isSelected = selectedPreset === preset.id;
            return (
              <div
                key={preset.id}
                onClick={() => setSelectedPreset(preset.id)}
                className={`group rounded-3xl p-6 border cursor-pointer transition-all duration-200 flex flex-col justify-between space-y-6 relative overflow-hidden ${
                  isSelected
                    ? 'border-indigo-500/50 shadow-xl bg-indigo-500/5 scale-[1.01]'
                    : 'hover:border-white/20 hover:scale-[1.005]'
                }`}
                style={{
                  backgroundColor: isSelected ? undefined : 'var(--ca-surface)',
                  borderColor: isSelected ? undefined : 'var(--ca-border)',
                }}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-bold text-indigo-500 bg-indigo-500/10 border border-indigo-500/20">
                      <Clock size={12} />
                      {preset.durationMinutes} Minutes
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-primary group-hover:text-indigo-400 transition-colors">
                    {preset.title}
                  </h3>
                  <p className="text-xs text-muted leading-relaxed">
                    {preset.description}
                  </p>
                </div>

                {/* Clean Start Round Action without horizontal divider line or focus guard */}
                <div className="flex items-center justify-end pt-1">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLaunchRound(preset.id);
                    }}
                    disabled={isGenerating}
                    className="flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white shadow hover:bg-indigo-500 active:scale-95 transition-all"
                  >
                    <Play size={12} />
                    <span>Start Round</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Interview Attempt History Modal (Opened by clicking Rounds Completed) */}
      <InterviewHistoryModal
        isOpen={isHistoryModalOpen}
        onClose={() => setIsHistoryModalOpen(false)}
        history={history}
      />
    </div>
  );
}
