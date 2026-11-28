import { useEffect, useRef, useState } from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLearningPaths, useProblems } from '../hooks/useDataServices';
import { CODE_LANGUAGES } from '../lib/codeLanguages';
import type { ResourceStatus } from '../services';

const ROTATION_MS = 10_000;
const TYPING_MS_PER_CHARACTER = 22;
const REDUCED_MOTION = '(prefers-reduced-motion: reduce)';
const CODE_KEYWORD = /^(function|while|return|def|for|in)$/;

const variants = [
  {
    lead: 'Ready to sharpen',
    beforeHighlight: 'your ',
    highlight: 'problem-solving',
    afterHighlight: ' edge?',
    description: 'Every problem is a new opportunity to think deeper, write cleaner code, and become a better engineer.',
    filename: 'solution.ts',
    code: 'function levelUp() {\n  while (curious) {\n    practice();\n    learn();\n    return growth;\n  }\n}',
  },
  {
    lead: 'Build your skills',
    beforeHighlight: 'one ',
    highlight: 'problem',
    afterHighlight: ' at a time.',
    description: 'Start with a small challenge and build a habit you can keep.',
    filename: 'solution.py',
    code: 'def count_steps(steps):\n    total = 0\n    for step in steps:\n        total += step\n    return total',
  },
  {
    lead: 'Find patterns',
    beforeHighlight: 'and ',
    highlight: 'write cleaner code',
    afterHighlight: '.',
    description: 'Spot what repeats, try a simpler approach, and see how your solution changes.',
    filename: 'solution.js',
    code: 'function double(values) {\n  return values.map(\n    value => value * 2\n  );\n}',
  },
] as const;

export default function DashboardHero() {
  const problems = useProblems();
  const learningPaths = useLearningPaths();
  const [reducedMotion, setReducedMotion] = useState(() => window.matchMedia(REDUCED_MOTION).matches);
  const [pageHidden, setPageHidden] = useState(() => document.hidden);
  const [hovered, setHovered] = useState(false);
  const [focusWithin, setFocusWithin] = useState(false);
  const [variantIndex, setVariantIndex] = useState(0);
  const remainingTime = useRef(ROTATION_MS);
  const paused = reducedMotion || pageHidden || hovered || focusWithin;
  const variant = variants[variantIndex];
  const previousIndex = (variantIndex + variants.length - 1) % variants.length;

  useEffect(() => {
    const media = window.matchMedia(REDUCED_MOTION);
    const syncMotion = () => setReducedMotion(media.matches);
    const syncVisibility = () => setPageHidden(document.hidden);
    media.addEventListener('change', syncMotion);
    document.addEventListener('visibilitychange', syncVisibility);
    syncMotion();
    syncVisibility();
    return () => {
      media.removeEventListener('change', syncMotion);
      document.removeEventListener('visibilitychange', syncVisibility);
    };
  }, []);

  useEffect(() => {
    if (paused) return;

    const startedAt = performance.now();
    let advanced = false;
    const timer = window.setTimeout(() => {
      advanced = true;
      remainingTime.current = ROTATION_MS;
      setVariantIndex((current) => (current + 1) % variants.length);
    }, remainingTime.current);

    return () => {
      window.clearTimeout(timer);
      if (!advanced) {
        remainingTime.current = Math.max(0, remainingTime.current - (performance.now() - startedAt));
      }
    };
  }, [paused, variantIndex]);

  return (
    <section
      className="hero-panel relative overflow-hidden rounded-[28px] px-6 py-7 sm:px-8 sm:py-9"
      data-motion-paused={paused}
      onPointerEnter={(event) => { if (event.pointerType !== 'touch') setHovered(true); }}
      onPointerLeave={() => setHovered(false)}
      onFocus={() => setFocusWithin(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setFocusWithin(false);
      }}
    >
      <div className="hero-orb hero-orb-one" aria-hidden="true" />
      <div className="hero-orb hero-orb-two" aria-hidden="true" />
      <div className="relative z-10 max-w-2xl">
        <div className="hero-copy">
          {variants.map((item, index) => {
            const active = index === variantIndex;

            return (
              <div
                key={item.filename}
                data-active={active}
                data-previous={index === previousIndex}
                aria-hidden={!active}
              >
                <h2 className="font-display text-3xl font-bold leading-tight tracking-tight text-white sm:text-[38px]">
                  {item.lead}<br className="hidden sm:block" />{' '}{item.beforeHighlight}
                  <span className="text-indigo-100">{item.highlight}</span>{item.afterHighlight}
                </h2>
                <p className="mt-3 max-w-lg text-sm leading-6 text-white/90">{item.description}</p>
              </div>
            );
          })}
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link to="/problems" className="btn-primary">
            Explore problems <ArrowRight size={16} />
          </Link>
          <Link to="/daily-challenges" className="btn-ghost hero-ghost-button">
            Daily challenges <ArrowUpRight size={15} />
          </Link>
        </div>
        <div className="hero-quickfacts">
          <div className="hero-fact-list" role="group" aria-label="PrismCode practice library overview">
            <HeroFact label="problems in the library" status={problems.status} value={problems.data.length} reducedMotion={reducedMotion} />
            <HeroFact label="guided learning paths" status={learningPaths.status} value={learningPaths.data.length} reducedMotion={reducedMotion} />
            <HeroFact label="supported languages" status="ready" value={CODE_LANGUAGES.length} reducedMotion={reducedMotion} />
          </div>
        </div>
      </div>
      <div className="hero-code-card hidden xl:block" aria-hidden="true">
        <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-3">
          <i className="h-2 w-2 rounded-full bg-rose-400" />
          <i className="h-2 w-2 rounded-full bg-amber-300" />
          <i className="h-2 w-2 rounded-full bg-emerald-400" />
          <span className="ml-2 text-[10px] text-indigo-100/70">{variant.filename}</span>
        </div>
        <TypedCode key={variant.filename} code={variant.code} />
        <div className="mx-5 mb-4 rounded-lg border border-emerald-300/20 bg-emerald-300/10 px-3 py-2 text-[10px] text-emerald-200">
          ✓ Small steps add up · Keep going!
        </div>
      </div>
    </section>
  );
}

function TypedCode({ code }: { code: string }) {
  let typedCharacters = 0;

  return (
    <pre className="hero-code-body px-5 py-4 text-xs leading-6 text-indigo-100">
      {code.split('\n').map((line, index) => {
        const delay = typedCharacters * TYPING_MS_PER_CHARACTER;
        typedCharacters += line.length;

        return (
          <span
            key={index}
            className="hero-code-line"
            style={{
              width: `${line.length}ch`,
              animationDelay: `${delay}ms`,
              animationDuration: `${line.length * TYPING_MS_PER_CHARACTER}ms`,
              animationTimingFunction: `steps(${line.length}, end)`,
            }}
          >
            {line.split(/\b(function|while|return|def|for|in)\b/).map((part, partIndex) => (
              CODE_KEYWORD.test(part) ? <span key={partIndex} className="text-fuchsia-300">{part}</span> : part
            ))}
          </span>
        );
      })}
    </pre>
  );
}

function HeroFact({ label, status, value, reducedMotion }: {
  label: string;
  status: ResourceStatus;
  value: number;
  reducedMotion: boolean;
}) {
  const [animatedValue, setAnimatedValue] = useState(0);

  useEffect(() => {
    if (status !== 'ready' || reducedMotion || value === 0) return;

    setAnimatedValue(0);
    let frame: number;
    const startedAt = performance.now();
    const tick = (now: number) => {
      const progress = Math.min(1, Math.max(0, (now - startedAt) / 550));
      setAnimatedValue(Math.round(value * (1 - (1 - progress) ** 2)));
      if (progress < 1) frame = window.requestAnimationFrame(tick);
    };
    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [status, value, reducedMotion]);

  return (
    <div className="hero-quickfact">
      <span className="hero-quickfact-value tabular-nums" aria-hidden="true">
        <span className="invisible">{status === 'ready' ? value : '—'}</span>
        <span>{status === 'ready' ? (reducedMotion ? value : Math.min(animatedValue, value)) : '—'}</span>
      </span>
      <span className="sr-only">
        {status === 'ready' ? value : status === 'loading' ? 'Loading' : 'Unavailable'}{' '}
      </span>
      <span className="hero-quickfact-label">{label}</span>
    </div>
  );
}
