import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Maximize2, ShieldAlert } from 'lucide-react';
import { generateInterviewRound } from '../data/interview/roundGenerator';
import { computeInterviewScorecard } from '../lib/interview/scoring';
import {
  exitFullscreenSafe,
  getStoredActiveRound,
  saveInterviewHistoryItem,
  saveStoredActiveRound,
  useInterviewSession,
} from '../lib/interview/progress';
import { ActiveInterviewRound } from '../types/interview';
import InterviewHUD from '../components/interview/InterviewHUD';
import FocusGuardBanner from '../components/interview/FocusGuardBanner';
import ProblemBrief from '../components/interview/ProblemBrief';
import InterviewCodeRunner from '../components/interview/InterviewCodeRunner';
import InterviewScorecardView from '../components/interview/InterviewScorecardView';

export default function InterviewStudio() {
  const { roundId } = useParams<{ roundId: string }>();
  const navigate = useNavigate();

  const [isFullscreenActive, setIsFullscreenActive] = useState<boolean>(() => {
    return typeof document !== 'undefined' ? Boolean(document.fullscreenElement) : false;
  });
  const [isBriefCollapsed, setIsBriefCollapsed] = useState(false);

  // Load existing round or create new
  const initialRound = useMemo(() => {
    const existing = getStoredActiveRound();
    if (existing && existing.id === roundId) {
      return existing;
    }
    const fresh = generateInterviewRound('faang_standard');
    saveStoredActiveRound(fresh);
    return fresh;
  }, [roundId]);

  const {
    round,
    activeScorecard,
    tabSwitchAlert,
    fullscreenExitAlert,
    dismissTabSwitchAlert,
    dismissFullscreenExitAlert,
    switchProblem,
    updateCode,
    recordSubmission,
    submitInterview,
  } = useInterviewSession(initialRound);

  const roundRef = useRef(round);
  roundRef.current = round;

  // Intercept navigation keys (Ctrl+K, Cmd+K, Alt+Arrows) to lock down the interview
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === 'k' || e.key === 'K')) {
        e.preventDefault();
        e.stopPropagation();
      }
      if (e.altKey && (e.key === 'ArrowLeft' || e.key === 'ArrowRight')) {
        e.preventDefault();
        e.stopPropagation();
      }
    };
    window.addEventListener('keydown', handleKeyDown, true);
    return () => window.removeEventListener('keydown', handleKeyDown, true);
  }, []);

  // Lockdown: if candidate unmounts/navigates away internally while round is still active, auto-submit
  useEffect(() => {
    return () => {
      const current = roundRef.current;
      if (current && !current.isCompleted) {
        exitFullscreenSafe();
        const finished: ActiveInterviewRound = {
          ...current,
          isCompleted: true,
          submittedAt: Date.now(),
          autoSubmitReason: 'Auto-submitted: Attempted navigation away from interview',
        };
        const scorecard = computeInterviewScorecard(finished);
        saveInterviewHistoryItem(scorecard);
        saveStoredActiveRound(null);
      }
    };
  }, []);

  // Monitor fullscreen element state
  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreenActive(Boolean(document.fullscreenElement));
    };

    document.addEventListener('fullscreenchange', handleFsChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFsChange);
    };
  }, []);

  // Request fullscreen on start/mount
  useEffect(() => {
    if (typeof document !== 'undefined' && !document.fullscreenElement && !round?.isCompleted) {
      document.documentElement.requestFullscreen().catch(() => {
        // Will show fallback overlay if browser requires user gesture
        setIsFullscreenActive(false);
      });
    }
  }, [round?.id, round?.isCompleted]);

  const handleEnterFullscreen = () => {
    if (typeof document !== 'undefined' && document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen().then(() => {
        setIsFullscreenActive(true);
        dismissFullscreenExitAlert();
      }).catch(() => {});
    }
  };

  // If completed or scorecard exists, render Scorecard View (in normal screen)
  if (activeScorecard && round) {
    return (
      <div className="w-full">
        <InterviewScorecardView
          scorecard={activeScorecard}
          round={round}
          onRetake={() => {
            const fresh = generateInterviewRound(round.presetId);
            saveStoredActiveRound(fresh);
            handleEnterFullscreen();
            navigate(`/interview/${fresh.id}`);
          }}
          onBackToHub={() => navigate('/interview')}
        />
      </div>
    );
  }

  if (!round) {
    return (
      <div className="flex h-[70vh] items-center justify-center text-muted text-sm">
        Initializing mock interview round...
      </div>
    );
  }

  const currentProblem = round.currentProblemIndex === 0 ? round.problem1 : round.problem2;
  const currentState =
    round.currentProblemIndex === 0 ? round.problem1State : round.problem2State;

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-background">
      {/* Fallback Entry Prompt if browser blocked auto-fullscreen without gesture */}
      {!isFullscreenActive && !round.isCompleted && (round.fullscreenExits || 0) === 0 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in select-none">
          <div
            className="w-full max-w-md rounded-3xl p-7 shadow-2xl border space-y-5 text-center"
            style={{ backgroundColor: 'var(--ca-surface)', borderColor: 'var(--ca-border)' }}
          >
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-500/15 text-indigo-400 border border-indigo-500/25">
              <Maximize2 size={26} />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-primary">Enter Fullscreen Mode</h3>
              <p className="text-xs text-muted leading-relaxed">
                Mock technical interviews run in distraction-free full-screen mode to accurately simulate live coding conditions.
              </p>
            </div>
            <button
              type="button"
              onClick={handleEnterFullscreen}
              className="w-full flex items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-5 py-3 text-xs font-bold text-white shadow-lg hover:bg-indigo-500 active:scale-95 transition-all"
            >
              <Maximize2 size={15} />
              <span>Enter Fullscreen & Begin</span>
            </button>
          </div>
        </div>
      )}

      {/* Top HUD (Clean: timer on top-right, no focus option, clean problem tabs, brief collapse toggle) */}
      <InterviewHUD
        round={round}
        onSwitchProblem={switchProblem}
        onSubmitInterview={() => {
          exitFullscreenSafe();
          submitInterview();
        }}
        isBriefCollapsed={isBriefCollapsed}
        onToggleBriefCollapse={() => setIsBriefCollapsed((prev) => !prev)}
      />

      {/* Tab Switch Alert Banner */}
      {tabSwitchAlert && (
        <FocusGuardBanner
          tabSwitches={tabSwitchAlert}
          onDismiss={dismissTabSwitchAlert}
        />
      )}

      {/* Full-Width Split Workspace Layout with Collapsible Problem Brief */}
      <div className="flex h-full w-full overflow-hidden">
        {/* Left Column: Distraction-Free Problem Statement (Collapsible) */}
        {!isBriefCollapsed && (
          <div
            className="w-full lg:w-[42%] h-full overflow-hidden border-r shrink-0 transition-all duration-300"
            style={{ borderColor: 'var(--ca-border)' }}
          >
            <ProblemBrief
              problem={currentProblem}
              isSolved={currentState.isSolved}
              onCollapse={() => setIsBriefCollapsed(true)}
            />
          </div>
        )}

        {/* Right Column: Identical Monaco Code Runner (Expands to 100% full-width when collapsed) */}
        <div className="flex-1 h-full overflow-hidden w-full">
          <InterviewCodeRunner
            problem={currentProblem}
            code={currentState.code}
            language={currentState.language}
            isSolved={currentState.isSolved}
            onCodeChange={(code, lang) => updateCode(code, lang)}
            onSubmissionResult={recordSubmission}
            isBriefCollapsed={isBriefCollapsed}
            onToggleBriefCollapse={() => setIsBriefCollapsed((prev) => !prev)}
          />
        </div>
      </div>
    </div>
  );
}
