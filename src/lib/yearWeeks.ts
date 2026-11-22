/**
 * ISO 8601 Year and Week calculation utilities.
 * Each week runs from Monday (day 0) to Sunday (day 6).
 */

export interface DayInfo {
  date: Date;
  dateKey: string; // YYYY-MM-DD
  dayOfWeek: number; // 0 = Mon, 6 = Sun
  dayOfMonth: number;
  monthIndex: number; // 0 = Jan, 11 = Dec
  isToday: boolean;
  isPast: boolean;
  isFuture: boolean;
}

export interface YearWeek {
  weekNumber: number; // 1 to 52 or 53
  year: number;
  startDate: Date; // Monday
  endDate: Date; // Sunday
  days: DayInfo[]; // Exactly 7 days (Mon-Sun)
  isCurrentWeek: boolean;
  isPastWeek: boolean;
}

export interface MonthRow {
  monthIndex: number;
  name: string; // "JAN", "FEB", etc.
  weeks: YearWeek[];
}

export interface QuarterData {
  id: 'Q1' | 'Q2' | 'Q3' | 'Q4';
  label: string; // "Q1 · Jan to Mar"
  months: MonthRow[];
  isCurrentQuarter: boolean;
}

/** Formats date into local YYYY-MM-DD key */
export function toDateKey(d: Date): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Returns Monday of ISO week 1 for a given year.
 * Jan 4 is always in ISO week 1.
 */
function getFirstMondayOfYear(year: number): Date {
  const jan4 = new Date(year, 0, 4);
  const dayOfWeek = (jan4.getDay() + 6) % 7; // 0 = Mon, 6 = Sun
  const monday = new Date(year, 0, 4 - dayOfWeek);
  monday.setHours(0, 0, 0, 0);
  return monday;
}

/**
 * Total ISO weeks in a given year (52 or 53).
 */
export function getTotalWeeksInYear(year: number): number {
  // Check December 28 - always in the last ISO week
  const dec28 = new Date(year, 11, 28);
  const dayOfWeek = (dec28.getDay() + 6) % 7;
  const dec28Monday = new Date(year, 11, 28 - dayOfWeek);
  const firstMonday = getFirstMondayOfYear(year);
  const diffDays = Math.round((dec28Monday.getTime() - firstMonday.getTime()) / 86_400_000);
  return Math.floor(diffDays / 7) + 1;
}

/**
 * Returns ISO week number for a given date.
 */
export function getISOWeekNumber(d: Date): number {
  const target = new Date(d.valueOf());
  const dayNr = (d.getDay() + 6) % 7;
  target.setDate(target.getDate() - dayNr + 3);
  const firstThursday = target.valueOf();
  target.setMonth(0, 1);
  if (target.getDay() !== 4) {
    target.setMonth(0, 1 + ((4 - target.getDay() + 7) % 7));
  }
  return 1 + Math.ceil((firstThursday - target.valueOf()) / 604_800_000);
}

/**
 * Generates all YearWeek objects for a given year.
 */
export function generateYearWeeks(year: number, today = new Date()): YearWeek[] {
  const totalWeeks = getTotalWeeksInYear(year);
  const firstMonday = getFirstMondayOfYear(year);
  const todayKey = toDateKey(today);
  const todayTime = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();

  const weeks: YearWeek[] = [];

  for (let w = 1; w <= totalWeeks; w++) {
    const monday = new Date(firstMonday.getTime() + (w - 1) * 7 * 86_400_000);
    const sunday = new Date(monday.getTime() + 6 * 86_400_000);

    const days: DayInfo[] = [];
    let isCurrentWeek = false;
    let isPastWeek = true;

    for (let d = 0; d < 7; d++) {
      const dayDate = new Date(monday.getTime() + d * 86_400_000);
      dayDate.setHours(0, 0, 0, 0);
      const dateKey = toDateKey(dayDate);
      const isToday = dateKey === todayKey;
      if (isToday) isCurrentWeek = true;
      if (dayDate.getTime() >= todayTime) isPastWeek = false;

      days.push({
        date: dayDate,
        dateKey,
        dayOfWeek: d,
        dayOfMonth: dayDate.getDate(),
        monthIndex: dayDate.getMonth(),
        isToday,
        isPast: dayDate.getTime() < todayTime,
        isFuture: dayDate.getTime() > todayTime,
      });
    }

    weeks.push({
      weekNumber: w,
      year,
      startDate: monday,
      endDate: sunday,
      days,
      isCurrentWeek,
      isPastWeek,
    });
  }

  return weeks;
}

const MONTH_NAMES = [
  'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN',
  'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC',
];

/**
 * Generates the 4 quarters with 3 month rows each, mapping weeks
 * exactly as styled in the reference dashboard (5-4-4, 5-4-4, 5-4-4, 5-4-4/5).
 */
export function generateQuarters(year: number, today = new Date()): QuarterData[] {
  const allWeeks = generateYearWeeks(year, today);
  const totalWeeks = allWeeks.length;
  const currentMonth = today.getFullYear() === year ? today.getMonth() : -1;
  const currentQuarterIndex = currentMonth >= 0 ? Math.floor(currentMonth / 3) : -1;

  // Month-by-month week ranges matching reference design:
  // Q1: JAN (1-5), FEB (6-9), MAR (10-13) -> 5, 4, 4
  // Q2: APR (14-18), MAY (19-22), JUN (23-26) -> 5, 4, 4
  // Q3: JUL (27-31), AUG (32-35), SEP (36-39) -> 5, 4, 4
  // Q4: OCT (40-44), NOV (45-48), DEC (49-52/53) -> 5, 4, 4 or 5
  const monthWeekRanges: [number, number][] = [
    [1, 5],    // JAN
    [6, 9],    // FEB
    [10, 13],  // MAR
    [14, 18],  // APR
    [19, 22],  // MAY
    [23, 26],  // JUN
    [27, 31],  // JUL
    [32, 35],  // AUG
    [36, 39],  // SEP
    [40, 44],  // OCT
    [45, 48],  // NOV
    [49, totalWeeks], // DEC (up to 52 or 53)
  ];

  const quartersConfig: { id: 'Q1' | 'Q2' | 'Q3' | 'Q4'; label: string; months: number[] }[] = [
    { id: 'Q1', label: 'Q1 · Jan to Mar', months: [0, 1, 2] },
    { id: 'Q2', label: 'Q2 · Apr to Jun', months: [3, 4, 5] },
    { id: 'Q3', label: 'Q3 · Jul to Sep', months: [6, 7, 8] },
    { id: 'Q4', label: 'Q4 · Oct to Dec', months: [9, 10, 11] },
  ];

  return quartersConfig.map((q, qIdx) => {
    const monthRows: MonthRow[] = q.months.map((mIdx) => {
      const [startW, endW] = monthWeekRanges[mIdx];
      const weeks = allWeeks.filter((w) => w.weekNumber >= startW && w.weekNumber <= endW);
      return {
        monthIndex: mIdx,
        name: MONTH_NAMES[mIdx],
        weeks,
      };
    });

    return {
      id: q.id,
      label: q.label,
      months: monthRows,
      isCurrentQuarter: qIdx === currentQuarterIndex,
    };
  });
}

/**
 * Returns summary statistics for the year progress.
 */
export function getYearProgressStats(year: number, today = new Date()) {
  const totalWeeks = getTotalWeeksInYear(year);
  const currentWeekNumber = today.getFullYear() === year ? getISOWeekNumber(today) : 1;
  const isPastYear = today.getFullYear() > year;
  const isFutureYear = today.getFullYear() < year;

  const effectiveWeek = isPastYear ? totalWeeks : isFutureYear ? 0 : Math.min(currentWeekNumber, totalWeeks);

  const startOfYear = new Date(year, 0, 1);
  const endOfYear = new Date(year, 11, 31);
  const totalDays = Math.round((endOfYear.getTime() - startOfYear.getTime()) / 86_400_000) + 1;

  let daysPassed = 0;
  if (isPastYear) {
    daysPassed = totalDays;
  } else if (!isFutureYear) {
    const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    daysPassed = Math.max(0, Math.round((startOfToday.getTime() - startOfYear.getTime()) / 86_400_000) + 1);
  }

  const daysLeft = Math.max(0, totalDays - daysPassed);
  const percentGone = Math.min(100, Math.max(0, Math.round((daysPassed / totalDays) * 100)));

  return {
    totalWeeks,
    currentWeekNumber: effectiveWeek,
    daysPassed,
    daysLeft,
    percentGone,
  };
}
