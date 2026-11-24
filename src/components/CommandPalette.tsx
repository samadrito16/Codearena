import { useEffect, useId, useMemo, useRef, useState, type ReactNode } from 'react';
import {
  BarChart3,
  CheckCircle2,
  Code2,
  Compass,
  CornerDownLeft,
  FileText,
  Flame,
  LayoutDashboard,
  Map,
  Moon,
  Search,
  Settings,
  Shield,
  ShieldCheck,
  Sparkles,
  Sun,
  Trophy,
  UserRound,
  Timer,
  X,
  Brain,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useUi } from '../context/UiContext';
import { useLearningPaths, useProblems } from '../hooks/useDataServices';
import { getLocalDateKey, selectDailyChallenge } from '../lib/progress';
import EmptyState from './ui/EmptyState';

type CommandGroup = 'Quick actions' | 'Navigation' | 'Problems' | 'Learning paths';

interface CommandItem {
  id: string;
  group: CommandGroup;
  title: string;
  subtitle: string;
  keywords: string;
  icon: ReactNode;
  badge?: string;
  badgeTone?: 'easy' | 'medium' | 'hard' | 'solved' | 'neutral';
  onSelect: () => void;
}

const GROUP_ORDER: CommandGroup[] = ['Quick actions', 'Navigation', 'Problems', 'Learning paths'];

export default function CommandPalette() {
  const { solvedIds, theme, setTheme, dailyChallengeByDate } = useApp();
  const { data: problems } = useProblems();
  const { data: learningPaths } = useLearningPaths();
  const { commandPaletteOpen, closeCommandPalette, requestNavigate, announce } = useUi();

  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const listboxId = useId();
  const titleId = useId();

  useEffect(() => {
    if (!commandPaletteOpen) return undefined;
    previousFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setQuery('');
    setActiveIndex(0);
    const focusTimer = window.setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
    return () => {
      window.clearTimeout(focusTimer);
      previousFocusRef.current?.focus();
    };
  }, [commandPaletteOpen]);

  const allItems = useMemo<CommandItem[]>(() => {
    const today = new Date();
    const todayKey = getLocalDateKey(today);
    const dailyId = dailyChallengeByDate[todayKey] ?? selectDailyChallenge(problems, today, solvedIds)?.id;
    const nextUnsolved = problems.find((item) => !solvedIds.includes(item.id)) ?? problems[0];

    const quickActions: CommandItem[] = [
      {
        id: 'action-toggle-theme',
        group: 'Quick actions',
        title: `Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`,
        subtitle: 'Toggle display theme across PrismCode',
        keywords: 'theme dark light mode appearance',
        icon: theme === 'dark' ? <Sun size={15}/> : <Moon size={15}/>,
        badge: theme === 'dark' ? 'Dark' : 'Light',
        badgeTone: 'neutral',
        onSelect: () => {
          const next = theme === 'dark' ? 'light' : 'dark';
          setTheme(next);
          announce(`Switched to ${next} mode`);
          closeCommandPalette();
        },
      },
      ...(dailyId ? [{
        id: 'action-today-daily',
        group: 'Quick actions' as const,
        title: 'Open today’s daily challenge',
        subtitle: 'Jump straight into today’s scheduled workspace problem',
        keywords: 'daily challenge today streak',
        icon: <Flame size={15}/>,
        badge: 'Today',
        badgeTone: 'neutral' as const,
        onSelect: () => {
          closeCommandPalette();
          requestNavigate(`/workspace/${dailyId}?daily=${todayKey}`);
        },
      }] : []),
      ...(nextUnsolved ? [{
        id: 'action-next-unsolved',
        group: 'Quick actions' as const,
        title: `Practice next unsolved: ${nextUnsolved.title}`,
        subtitle: `${nextUnsolved.difficulty} · ${nextUnsolved.topics.slice(0, 2).join(', ')}`,
        keywords: `next unsolved practice random ${nextUnsolved.title} ${nextUnsolved.topics.join(' ')}`,
        icon: <Sparkles size={15}/>,
        badge: nextUnsolved.difficulty,
        badgeTone: (nextUnsolved.difficulty === 'Easy' ? 'easy' : nextUnsolved.difficulty === 'Medium' ? 'medium' : 'hard') as CommandItem['badgeTone'],
        onSelect: () => {
          closeCommandPalette();
          requestNavigate(`/workspace/${nextUnsolved.id}`);
        },
      }] : []),
    ];

    const navItems: CommandItem[] = [
      { path: '/dashboard', title: 'Overview', subtitle: 'Dashboard, recommendations, and recent sessions', keywords: 'home dashboard overview', icon: <LayoutDashboard size={15}/> },
      { path: '/mastery', title: 'Pattern Mastery', subtitle: 'Master the 5 core patterns through active blueprint recall', keywords: 'pattern mastery blueprints triggers subgoals recall two pointers sliding window', icon: <Sparkles size={15}/>, badge: '25 Blueprints' },
      { path: '/problems?filter=review_due', title: 'Spaced Repetition Reviews', subtitle: 'Review problems scheduled at 3, 7, and 21 day intervals', keywords: 'spaced repetition review failed slow retention leitner', icon: <Brain size={15}/> },
      { path: '/interview', title: 'Mock Interview', subtitle: 'Simulate 45-min live technical rounds with warmup + anchor pairing', keywords: 'interview mock technical faang timer contest google meta amazon', icon: <Timer size={15}/> },
      { path: '/problems', title: 'Problems', subtitle: 'Search, filter, bookmark, and organize problems', keywords: 'library questions dsa list', icon: <Code2 size={15}/> },
      { path: `/workspace/${problems[0]?.id ?? 'two-sum'}`, title: 'Code editor', subtitle: 'Open the interactive coding workspace', keywords: 'workspace monaco ide code editor', icon: <Compass size={15}/> },
      { path: '/daily-challenges', title: 'Daily challenges', subtitle: 'Today’s daily pick and recent history', keywords: 'daily streak challenge', icon: <Flame size={15}/> },
      { path: '/learning-paths', title: 'Learning paths', subtitle: '8 structured DSA roadmaps', keywords: 'roadmap curriculum modules paths', icon: <Map size={15}/> },
      { path: '/progress', title: 'Your progress', subtitle: 'Heatmap, topic mastery, weekly/monthly summaries, achievements', keywords: 'analytics stats progress heatmap achievements', icon: <BarChart3 size={15}/> },
      { path: '/profile', title: 'Profile', subtitle: 'Edit local display name, bio, avatar, and preview', keywords: 'profile bio avatar account', icon: <UserRound size={15}/> },
      { path: '/leaderboard', title: 'Leaderboard', subtitle: 'Compare standings in the arena', keywords: 'rank leaderboard top performers', icon: <Trophy size={15}/> },
      { path: '/settings', title: 'Settings', subtitle: 'Theme mode and interface color palettes', keywords: 'preferences palette appearance settings', icon: <Settings size={15}/> },
      { path: '/terms', title: 'Terms of Service', subtitle: 'Developer agreement, sandbox rules, and acceptable use', keywords: 'terms legal service acceptable use agreement rules sandbox', icon: <FileText size={15}/> },
      { path: '/privacy', title: 'Privacy Policy', subtitle: 'Data protection, cookies, subprocessors, and user rights', keywords: 'privacy policy gdpr ccpa cookies data protection security', icon: <Shield size={15}/> },
      { path: '/admin', title: 'Admin dashboard', subtitle: 'Create, edit, import, and export local questions', keywords: 'admin editor import export json', icon: <ShieldCheck size={15}/> },
    ].map((item) => ({
      id: `nav-${item.path}`,
      group: 'Navigation' as const,
      title: item.title,
      subtitle: item.subtitle,
      keywords: item.keywords,
      icon: item.icon,
      onSelect: () => {
        closeCommandPalette();
        requestNavigate(item.path);
      },
    }));

    const problemItems: CommandItem[] = problems.map((problem) => {
      const isSolved = solvedIds.includes(problem.id);
      return {
        id: `problem-${problem.id}`,
        group: 'Problems' as const,
        title: problem.title,
        subtitle: `${problem.topics.slice(0, 3).join(' · ')}${problem.acceptance && problem.acceptance !== '—' && problem.acceptance !== '0%' ? ` · ${problem.acceptance} acceptance` : ''}`,
        keywords: `${problem.id} ${problem.title} ${problem.difficulty} ${problem.topics.join(' ')} ${problem.description}`,
        icon: isSolved ? <CheckCircle2 size={15} className="text-emerald-500"/> : <Code2 size={15}/>,
        badge: problem.difficulty,
        badgeTone: problem.difficulty === 'Easy' ? 'easy' : problem.difficulty === 'Medium' ? 'medium' : 'hard',
        onSelect: () => {
          closeCommandPalette();
          requestNavigate(`/workspace/${problem.id}`);
        },
      };
    });

    const pathItems: CommandItem[] = learningPaths.map((path) => ({
      id: `path-${path.id}`,
      group: 'Learning paths' as const,
      title: path.title,
      subtitle: `${path.modules.length} modules · ${path.topics.slice(0, 3).join(', ')}`,
      keywords: `path roadmap ${path.title} ${path.topics.join(' ')} ${path.subtitle} ${path.description}`,
      icon: <Map size={15}/>,
      badge: `Path ${String(path.order).padStart(2, '0')}`,
      badgeTone: 'neutral',
      onSelect: () => {
        closeCommandPalette();
        requestNavigate(`/learning-paths/${path.id}`);
      },
    }));

    return [...quickActions, ...navItems, ...problemItems, ...pathItems];
  }, [announce, closeCommandPalette, dailyChallengeByDate, learningPaths, problems, requestNavigate, setTheme, solvedIds, theme]);

  const filteredItems = useMemo(() => {
    const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
    if (!terms.length) {
      // Show concise default set: Quick actions, Navigation, and first 6 problems.
      const quick = allItems.filter((item) => item.group === 'Quick actions');
      const nav = allItems.filter((item) => item.group === 'Navigation');
      const topProblems = allItems.filter((item) => item.group === 'Problems').slice(0, 6);
      return [...quick, ...nav, ...topProblems];
    }
    return allItems.filter((item) => {
      const haystack = `${item.title} ${item.subtitle} ${item.keywords}`.toLowerCase();
      return terms.every((term) => haystack.includes(term));
    });
  }, [allItems, query]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  useEffect(() => {
    if (!commandPaletteOpen || !listRef.current) return;
    const activeEl = listRef.current.querySelector<HTMLElement>('[data-active="true"]');
    activeEl?.scrollIntoView({ block: 'nearest' });
  }, [activeIndex, commandPaletteOpen, filteredItems.length]);

  if (!commandPaletteOpen) return null;

  const safeIndex = filteredItems.length ? Math.min(activeIndex, filteredItems.length - 1) : -1;
  const activeItem = safeIndex >= 0 ? filteredItems[safeIndex] : null;

  const grouped = GROUP_ORDER
    .map((group) => ({
      group,
      items: filteredItems
        .map((item, flatIndex) => ({ item, flatIndex }))
        .filter(({ item }) => item.group === group),
    }))
    .filter((section) => section.items.length > 0);

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'Escape') {
      event.preventDefault();
      closeCommandPalette();
      return;
    }
    if (!filteredItems.length) return;
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActiveIndex((prev) => (prev + 1) % filteredItems.length);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActiveIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
    } else if (event.key === 'Home') {
      event.preventDefault();
      setActiveIndex(0);
    } else if (event.key === 'End') {
      event.preventDefault();
      setActiveIndex(filteredItems.length - 1);
    } else if (event.key === 'Enter' && activeItem) {
      event.preventDefault();
      activeItem.onSelect();
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-slate-950/60 px-3 pt-[10vh] backdrop-blur-[2px] sm:px-4 ca-modal-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) closeCommandPalette();
      }}
      onKeyDown={handleKeyDown}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="panel-card ca-modal-panel flex max-h-[76vh] w-full max-w-xl flex-col overflow-hidden shadow-2xl"
      >
        <h2 id={titleId} className="sr-only">Command palette</h2>
        <div className="flex items-center gap-2.5 border-b px-4 py-3" style={{ borderColor: 'var(--ca-border)' }}>
          <Search size={16} className="shrink-0 text-muted" aria-hidden="true"/>
          <input
            ref={inputRef}
            type="text"
            role="combobox"
            aria-expanded="true"
            aria-controls={listboxId}
            aria-activedescendant={activeItem ? `cmd-opt-${activeItem.id}` : undefined}
            aria-label="Search pages, problems, learning paths, or actions"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Jump to a page, problem, learning path, or action…"
            className="min-w-0 flex-1 bg-transparent text-sm text-primary placeholder:text-muted focus:outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                inputRef.current?.focus();
              }}
              aria-label="Clear search query"
              className="rounded-lg p-1 text-muted transition hover:bg-black/5 hover:text-primary dark:hover:bg-white/5"
            >
              <X size={14}/>
            </button>
          )}
          <button
            type="button"
            onClick={closeCommandPalette}
            aria-label="Close command palette"
            className="rounded-lg border px-1.5 py-0.5 font-mono text-[10px] font-bold text-muted transition hover:text-primary"
            style={{ borderColor: 'var(--ca-border)' }}
          >
            ESC
          </button>
        </div>

        <div
          ref={listRef}
          id={listboxId}
          role="listbox"
          aria-label="Command palette results"
          className="flex-1 overflow-y-auto p-2"
        >
          {grouped.length ? (
            <div className="space-y-3">
              {grouped.map((section) => (
                <div key={section.group}>
                  <p className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-muted">
                    {section.group}
                  </p>
                  <div className="space-y-0.5">
                    {section.items.map(({ item, flatIndex }) => {
                      const isActive = flatIndex === safeIndex;
                      const badgeStyle = item.badgeTone === 'easy'
                        ? 'difficulty-easy'
                        : item.badgeTone === 'medium'
                          ? 'difficulty-medium'
                          : item.badgeTone === 'hard'
                            ? 'difficulty-hard'
                            : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300';
                      return (
                        <button
                          key={item.id}
                          id={`cmd-opt-${item.id}`}
                          type="button"
                          role="option"
                          aria-selected={isActive}
                          data-active={isActive}
                          onMouseEnter={() => setActiveIndex(flatIndex)}
                          onClick={item.onSelect}
                          className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition ${isActive ? 'cmd-item-active' : 'hover:bg-black/[0.03] dark:hover:bg-white/[0.03]'}`}
                        >
                          <span
                            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border text-muted"
                            style={{ borderColor: 'var(--ca-border)', background: 'var(--ca-surface)' }}
                            aria-hidden="true"
                          >
                            {item.icon}
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-xs font-bold text-primary">{item.title}</span>
                            <span className="mt-0.5 block truncate text-[11px] text-muted">{item.subtitle}</span>
                          </span>
                          {item.badge && (
                            <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold ${badgeStyle}`}>
                              {item.badge}
                            </span>
                          )}
                          {isActive && <CornerDownLeft size={13} className="shrink-0 themed-link" aria-hidden="true"/>}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              compact
              icon={<Search size={18}/>}
              title={`No matches for “${query}”`}
              description="Try searching by problem title, topic (e.g. Array, Tree), difficulty, or page name."
              action={
                <button
                  type="button"
                  onClick={() => {
                    setQuery('');
                    inputRef.current?.focus();
                  }}
                  className="btn-secondary py-1.5 text-xs"
                >
                  Clear search
                </button>
              }
            />
          )}
        </div>

        <div
          className="flex flex-wrap items-center justify-between gap-2 border-t px-4 py-2 text-[10px] text-muted"
          style={{ borderColor: 'var(--ca-border)', background: 'var(--ca-surface-muted)' }}
        >
          <div className="flex flex-wrap items-center gap-3">
            <span><kbd className="ca-kbd">↑↓</kbd> Navigate</span>
            <span><kbd className="ca-kbd">Enter</kbd> Select</span>
            <span><kbd className="ca-kbd">Esc</kbd> Close</span>
          </div>
          <span role="status" aria-live="polite" className="tabular-nums">
            {filteredItems.length} {filteredItems.length === 1 ? 'result' : 'results'}
          </span>
        </div>
      </div>
    </div>
  );
}
