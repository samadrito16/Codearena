import { useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  BarChart2,
  Calendar,
  Code2,
  Compass,
  Flame,
  GraduationCap,
  Layers,
  Sparkles,
  Terminal,
  Trophy,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { platformRoadmapCards, type RoadmapCardData } from '../data/platformRoadmap';
import { useLearningPaths, useProblems } from '../hooks/useDataServices';
import SlidingTopicsTicker from '../components/SlidingTopicsTicker';
import {
  DailyChallengeCard,
  ContinueWhereYouLeftOff,
} from '../components/OverviewSections';

export default function Dashboard() {
  const { data: problems } = useProblems();
  const { data: learningPaths } = useLearningPaths();

  return (
    <div className="space-y-12 dashboard-page pb-20 animate-in fade-in">
      {/* ─────────────────────────────────────────────────────────────
          1. HERO PANEL (TOPMOST TILE PRESERVED AS REQUESTED)
      ────────────────────────────────────────────────────────────── */}
      <section className="hero-panel relative overflow-hidden rounded-[28px] px-6 py-7 sm:px-8 sm:py-9">
        <div className="hero-orb hero-orb-one" />
        <div className="hero-orb hero-orb-two" />
        <div className="relative z-10 max-w-2xl">
          <h2 className="font-display text-3xl font-bold leading-tight tracking-tight text-white sm:text-[38px]">
            Ready to sharpen<br className="hidden sm:block" /> your{' '}
            <span className="text-indigo-100">problem-solving</span> edge?
          </h2>
          <p className="mt-3 max-w-lg text-sm leading-6 text-white/90">
            Every problem is a new opportunity to think deeper, write cleaner code, and become a better engineer.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/problems" className="btn-primary">
              Explore problems <ArrowRight size={16} />
            </Link>
            <Link to="/daily-challenges" className="btn-ghost hero-ghost-button">
              Daily challenges <ArrowUpRight size={15} />
            </Link>
          </div>
          <div className="hero-quickfacts" aria-label="Prismcode practice library overview">
            <div className="hero-quickfact">
              <span className="hero-quickfact-value animate-count-in tabular-nums">
                {problems.length || '100+'}
              </span>
              <span className="hero-quickfact-label">problems in the library</span>
            </div>
            <div className="hero-quickfact">
              <span className="hero-quickfact-value animate-count-in tabular-nums" style={{ animationDelay: '.08s' }}>
                {learningPaths.length || '7'}
              </span>
              <span className="hero-quickfact-label">guided learning paths</span>
            </div>
            <div className="hero-quickfact">
              <span className="hero-quickfact-value animate-count-in tabular-nums" style={{ animationDelay: '.16s' }}>
                05
              </span>
              <span className="hero-quickfact-label">supported languages</span>
            </div>
          </div>
        </div>
        <div className="hero-code-card hidden xl:block">
          <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-3">
            <i className="h-2 w-2 rounded-full bg-rose-400" />
            <i className="h-2 w-2 rounded-full bg-amber-300" />
            <i className="h-2 w-2 rounded-full bg-emerald-400" />
            <span className="ml-2 text-[10px] text-indigo-100/50">solution.ts</span>
          </div>
          <pre className="px-5 py-4 text-xs leading-6 text-indigo-100">
            <span className="text-fuchsia-300">function</span> <span className="text-emerald-200">levelUp</span>() {'{'}{`\n`}  <span className="text-fuchsia-300">while</span> (curious) {'{'}{`\n`}    practice();{`\n`}    learn();{`\n`}    <span className="text-fuchsia-300">return</span> growth;{`\n`}  {'}'}{`\n`}{'}'}
          </pre>
          <div className="mx-5 mb-4 rounded-lg border border-emerald-300/20 bg-emerald-300/10 px-3 py-2 text-[10px] text-emerald-200">
            ✓ Small steps add up · Keep going!
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          2. DUAL SLIDING TOPIC LINES (TICKER)
      ────────────────────────────────────────────────────────────── */}
      <SlidingTopicsTicker />

      {/* ─────────────────────────────────────────────────────────────
          3. OVERVIEW: DAILY CHALLENGE & RESUME
      ────────────────────────────────────────────────────────────── */}
      <div className="space-y-10 sm:space-y-12">
        <DailyChallengeCard />
        <ContinueWhereYouLeftOff />
      </div>

      {/* ─────────────────────────────────────────────────────────────
          4. PLATFORM MASTERY ROADMAP (CURVED ALTERNATING ZIGZAG)
      ────────────────────────────────────────────────────────────── */}
      <section className="relative px-2 sm:px-4 pt-6">
        {/* Ambient Top Glow */}
        <div
          className="pointer-events-none absolute -top-16 left-1/2 -translate-x-1/2 h-96 w-full max-w-4xl opacity-35 blur-3xl -z-10"
          style={{
            background:
              'radial-gradient(ellipse 65% 55% at 50% 30%, rgba(245, 158, 11, 0.22), transparent 75%)',
          }}
        />

        {/* Ambient Floating Hexagons on Large Screens */}
        <div className="pointer-events-none absolute left-0 top-1/4 -z-10 opacity-30 select-none hidden 2xl:block">
          <HexagonCluster />
        </div>
        <div className="pointer-events-none absolute right-0 top-2/3 -z-10 opacity-30 select-none hidden 2xl:block">
          <HexagonCluster />
        </div>

        {/* Centered Heading */}
        <div className="text-center mb-14 sm:mb-20">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-primary">
            What you'll{' '}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-500 via-orange-400 to-amber-300">
              Master on PrismCode
            </span>
          </h2>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-muted max-w-2xl mx-auto leading-relaxed">
            A <span className="font-semibold text-primary">Structured</span>, hands-on
            ecosystem engineered to take you from{' '}
            <span className="font-semibold text-primary">Foundational Mechanics</span> to
            interview-ready algorithmic mastery.
          </p>
        </div>

        {/* Alternating Cards List with Looping Doodle Arrows */}
        <div className="mx-auto flex flex-col gap-12 sm:gap-16 max-w-6xl">
          {platformRoadmapCards.map((card, index) => (
            <AnimatedRoadmapCard
              key={card.id}
              card={card}
              index={index}
              hasNext={index < platformRoadmapCards.length - 1}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

/**
 * Animated Card component with scroll-driven reveal (scale + translateY + opacity).
 */
function AnimatedRoadmapCard({
  card,
  index,
  hasNext,
}: {
  card: RoadmapCardData;
  index: number;
  hasNext: boolean;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const isLeft = index % 2 === 0;

  return (
    <div
      ref={cardRef}
      className={`flex w-full transition-all duration-700 ease-out ${
        isLeft ? 'sm:justify-start' : 'sm:justify-end'
      } ${
        isVisible
          ? 'opacity-100 translate-y-0 scale-100'
          : 'opacity-0 translate-y-8 scale-[0.95]'
      }`}
    >
      <div
        className="group relative w-full max-w-2xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 backdrop-blur-md transition-all duration-300 hover:shadow-2xl border"
        style={{
          backgroundColor: 'color-mix(in srgb, var(--ca-surface) 93%, black 7%)',
          borderColor: 'var(--ca-border)',
        }}
      >
        {/* Top Card Badge & Icon Row */}
        <div className="flex items-center justify-between gap-3 mb-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-600 dark:text-amber-400 border border-amber-500/20">
            {getCardIcon(card.id)}
            <span>{card.badge}</span>
          </span>

          <span className="font-mono text-[11px] font-semibold text-muted/60">
            0{index + 1}
          </span>
        </div>

        {/* Card Title & Description */}
        <div>
          <h3 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-primary group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-colors">
            {card.title}
          </h3>
          <p className="mt-2 text-xs sm:text-sm leading-relaxed text-muted">
            {card.description}
          </p>
        </div>

        {/* Subsections with Bullet Points */}
        <div className="mt-6 space-y-5">
          {card.sections.map((section) => (
            <div key={section.title} className="space-y-2.5">
              <h4 className="font-display text-sm sm:text-base font-semibold text-primary/95 flex items-center gap-2">
                {section.title}
              </h4>
              <div className="space-y-2 pl-1 sm:pl-2">
                {section.bullets.map((bullet, bIdx) => (
                  <div key={bIdx} className="flex items-start gap-2.5">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rotate-45 rounded-[1px] bg-amber-500 dark:bg-orange-300" />
                    <span className="text-xs sm:text-sm text-muted leading-relaxed">
                      {bullet}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Card Bottom CTA Link */}
        <div className="mt-5 flex items-center justify-end">
          <Link
            to={card.link}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline group-hover:translate-x-1 transition-transform"
          >
            {card.linkText} <ArrowRight size={13} />
          </Link>
        </div>

        {/* Looping Hand-drawn Doodle Arrow connecting to the next card */}
        {hasNext && (
          <DoodleArrow direction={isLeft ? 'right' : 'left'} />
        )}
      </div>
    </div>
  );
}

function getCardIcon(id: string) {
  switch (id) {
    case 'placement-simulator':
      return <GraduationCap size={14} />;
    case 'problem-arena':
      return <Code2 size={14} />;
    case 'pattern-mastery':
      return <Sparkles size={14} />;
    case 'learning-paths':
      return <Compass size={14} />;
    case 'cloud-ide':
      return <Terminal size={14} />;
    case 'daily-challenges':
      return <Flame size={14} />;
    case 'competitive-benchmarks':
      return <Trophy size={14} />;
    case 'progress-analytics':
      return <BarChart2 size={14} />;
    default:
      return <Layers size={14} />;
  }
}

/**
 * Hand-drawn curved doodle arrow SVG mirroring the ChaiCode curriculum layout.
 */
function DoodleArrow({ direction }: { direction: 'right' | 'left' }) {
  if (direction === 'right') {
    return (
      <svg
        width="127"
        height="101"
        viewBox="0 0 127 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="absolute -z-10 scale-125 hidden sm:block -right-28 sm:-right-36 -bottom-10 pointer-events-none select-none text-amber-500/70 dark:text-orange-200/75 stroke-current"
      >
        <path
          d="M1 4.656C25.464-.157 44.325-3.219 63.045 15.501c8.935 8.935 11.105 21.004 4.8 32.355C56.369 68.512 34.619 37.4 50.6 27.412c29.297-18.312 55.395 18.13 59.556 43.555 1.212 7.41.453 7.604.844 15.032.339 6.444 3.187-2.652 4-5 1.215-5-1.872 7.752-.4 3.5 2.092-6.044 4.244-8.435 3.4-4.5-1.6 6.996-3.5 12.796-13.5 3.296-2.037-1.93 10.5-4.8 12.5-5.3 5.775-.68-12.502 7.3-7.1 6.981 7.4-4.5-1.882 7.246-.004-2.741-3.218 1.609-.286-.923-3.5.505-5.296 2.354 5.49.25 6.104-.24 1.785-1.428 5.724 3.4 1 5.5-1.216.54-8.578-5.172-6.964-5.172 5.097 0 13.201-10.578 8.4.822-1.5 3.563.754 5.354-2.436 5.167-1.085-.064-13.844-8.374-2.344-4.917"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  return (
    <svg
      width="127"
      height="101"
      viewBox="0 0 127 101"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="absolute -z-10 scale-125 hidden sm:block -left-28 sm:-left-36 -bottom-10 -scale-x-125 pointer-events-none select-none text-amber-500/70 dark:text-orange-200/75 stroke-current"
    >
      <path
        d="M1 4.656C25.464-.157 44.325-3.219 63.045 15.501c8.935 8.935 11.105 21.004 4.8 32.355C56.369 68.512 34.619 37.4 50.6 27.412c29.297-18.312 55.395 18.13 59.556 43.555 1.212 7.41.453 7.604.844 15.032.339 6.444 3.187-2.652 4-5 1.215-5-1.872 7.752-.4 3.5 2.092-6.044 4.244-8.435 3.4-4.5-1.6 6.996-3.5 12.796-13.5 3.296-2.037-1.93 10.5-4.8 12.5-5.3 5.775-.68-12.502 7.3-7.1 6.981 7.4-4.5-1.882 7.246-.004-2.741-3.218 1.609-.286-.923-3.5.505-5.296 2.354 5.49.25 6.104-.24 1.785-1.428 5.724 3.4 1 5.5-1.216.54-8.578-5.172-6.964-5.172 5.097 0 13.201-10.578 8.4.822-1.5 3.563.754 5.354-2.436 5.167-1.085-.064-13.844-8.374-2.344-4.917"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * Decorative hexagon cluster SVG matching the ambient side art in ChaiCode.
 */
function HexagonCluster() {
  return (
    <svg
      width="160"
      height="260"
      viewBox="0 0 160 260"
      fill="currentColor"
      className="text-amber-500/[0.05] dark:text-orange-400/[0.05]"
      aria-hidden="true"
    >
      <polygon points="45,15 75,32 75,67 45,84 15,67 15,32" />
      <polygon points="105,47 135,64 135,99 105,116 75,99 75,64" />
      <polygon points="45,79 75,96 75,131 45,148 15,131 15,96" />
      <polygon points="105,111 135,128 135,163 105,180 75,163 75,128" />
      <polygon points="45,143 75,160 75,195 45,212 15,195 15,160" />
      <polygon points="105,175 135,192 135,227 105,244 75,227 75,192" />
    </svg>
  );
}

export function DifficultyBadge({ difficulty }: { difficulty: string }) {
  const cls =
    difficulty === 'Easy'
      ? 'difficulty-easy'
      : difficulty === 'Medium'
      ? 'difficulty-medium'
      : 'difficulty-hard';
  return <span className={`difficulty-badge ${cls}`}>{difficulty}</span>;
}
