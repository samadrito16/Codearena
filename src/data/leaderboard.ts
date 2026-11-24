import type { CollegeLeaderboardEntry, Contest } from '../types/contest';

export interface LeaderboardEntry {
  name: string;
  handle: string;
  score: number;
  solved: number;
  streak: number;
  initials: string;
  color: string;
  university?: string;
}

/**
 * Global individual leaderboard fixtures with college affiliations.
 */
export const sampleLeaderboard: LeaderboardEntry[] = [
  { name: 'Maya Chen', handle: '@mayacodes', score: 2840, solved: 186, streak: 28, initials: 'MC', color: 'from-violet-500 to-fuchsia-500', university: 'Stanford University' },
  { name: 'Aarav Sharma', handle: '@aarav_iitb', score: 2790, solved: 181, streak: 24, initials: 'AS', color: 'from-indigo-500 to-blue-500', university: 'IIT Bombay' },
  { name: 'Rohan Deshmukh', handle: '@rohan_bits', score: 2715, solved: 174, streak: 19, initials: 'RD', color: 'from-cyan-500 to-blue-500', university: 'BITS Pilani' },
  { name: 'Priya Verma', handle: '@priya_dtu', score: 2650, solved: 168, streak: 16, initials: 'PV', color: 'from-emerald-500 to-teal-500', university: 'Delhi Technological University (DTU)' },
  { name: 'Sofia Patel', handle: '@sofiapatel', score: 2590, solved: 163, streak: 14, initials: 'SP', color: 'from-amber-500 to-orange-500', university: 'IIT Delhi' },
  { name: 'Karthik Raja', handle: '@karthik_nitt', score: 2520, solved: 156, streak: 12, initials: 'KR', color: 'from-rose-500 to-pink-500', university: 'NIT Trichy' },
  { name: 'Noah Williams', handle: '@noahw', score: 2480, solved: 151, streak: 11, initials: 'NW', color: 'from-emerald-500 to-teal-500', university: 'UC Berkeley' },
  { name: 'Aditya Sen', handle: '@aditya_iiith', score: 2390, solved: 145, streak: 10, initials: 'AS', color: 'from-purple-500 to-indigo-500', university: 'IIIT Hyderabad' },
  { name: 'Sneha Patel', handle: '@sneha_vit', score: 2260, solved: 138, streak: 9, initials: 'SP', color: 'from-cyan-500 to-teal-500', university: 'Vellore Institute of Technology (VIT)' },
  { name: 'You', handle: '@you', score: 1820, solved: 72, streak: 6, initials: 'YO', color: 'from-pink-500 to-rose-500', university: 'IIT Bombay' },
];

/**
 * Campus Cup (Inter-College Rankings) fixture.
 */
export const sampleCollegeLeaderboard: CollegeLeaderboardEntry[] = [
  {
    rank: 1,
    collegeName: 'IIT Bombay',
    totalPoints: 4850,
    totalSolved: 312,
    studentCount: 24,
    topStudent: { name: 'Aarav Sharma', handle: '@aarav_iitb', points: 640, avatarColor: 'indigo' },
  },
  {
    rank: 2,
    collegeName: 'BITS Pilani',
    totalPoints: 4320,
    totalSolved: 285,
    studentCount: 19,
    topStudent: { name: 'Rohan Deshmukh', handle: '@rohan_bits', points: 590, avatarColor: 'emerald' },
  },
  {
    rank: 3,
    collegeName: 'Delhi Technological University (DTU)',
    totalPoints: 3980,
    totalSolved: 254,
    studentCount: 18,
    topStudent: { name: 'Priya Verma', handle: '@priya_dtu', points: 510, avatarColor: 'cyan' },
  },
  {
    rank: 4,
    collegeName: 'NIT Trichy',
    totalPoints: 3410,
    totalSolved: 220,
    studentCount: 15,
    topStudent: { name: 'Karthik Raja', handle: '@karthik_nitt', points: 480, avatarColor: 'amber' },
  },
  {
    rank: 5,
    collegeName: 'IIIT Hyderabad',
    totalPoints: 3260,
    totalSolved: 215,
    studentCount: 12,
    topStudent: { name: 'Aditya Sen', handle: '@aditya_iiith', points: 530, avatarColor: 'rose' },
  },
  {
    rank: 6,
    collegeName: 'Stanford University',
    totalPoints: 2950,
    totalSolved: 192,
    studentCount: 10,
    topStudent: { name: 'Maya Chen', handle: '@mayacodes', points: 580, avatarColor: 'violet' },
  },
  {
    rank: 7,
    collegeName: 'UC Berkeley',
    totalPoints: 2740,
    totalSolved: 178,
    studentCount: 9,
    topStudent: { name: 'Daniel Kim', handle: '@dan_cal', points: 460, avatarColor: 'indigo' },
  },
  {
    rank: 8,
    collegeName: 'Vellore Institute of Technology (VIT)',
    totalPoints: 2490,
    totalSolved: 165,
    studentCount: 14,
    topStudent: { name: 'Sneha Patel', handle: '@sneha_vit', points: 420, avatarColor: 'emerald' },
  },
];

/**
 * Static fallback contests fixture.
 */
export const sampleContests: Contest[] = [
  {
    id: 'weekly-contest-42',
    slug: 'weekly-contest-42',
    title: 'Weekly Contest 42',
    description: 'Weekly 2-day competition open every Saturday and Sunday. 4 graded challenges under live proctored conditions.',
    startTime: '2026-11-28T00:00:00.000Z',
    endTime: '2026-11-29T23:59:59.000Z',
    durationMinutes: 2880,
    status: 'upcoming',
    problems: [
      { id: 'wc42-q1', problemId: 'two-sum', title: 'Two Sum', difficulty: 'Easy', points: 300, solvedCount: 0 },
      { id: 'wc42-q2', problemId: 'longest-substring', title: 'Longest Substring Without Repeating Characters', difficulty: 'Medium', points: 400, solvedCount: 0 },
      { id: 'wc42-q3', problemId: 'container-water', title: 'Container With Most Water', difficulty: 'Medium', points: 500, solvedCount: 0 },
      { id: 'wc42-q4', problemId: 'median-arrays', title: 'Median of Two Sorted Arrays', difficulty: 'Hard', points: 600, solvedCount: 0 },
    ],
  },
  {
    id: 'weekly-contest-41',
    slug: 'weekly-contest-41',
    title: 'Weekly Contest 41',
    description: 'Weekly 2-day competition held Saturday and Sunday featuring balanced string parsing, tree traversal, and dynamic programming.',
    startTime: '2026-11-21T00:00:00.000Z',
    endTime: '2026-11-22T23:59:59.000Z',
    durationMinutes: 2880,
    status: 'completed',
    problems: [
      { id: 'wc41-q1', problemId: 'valid-parentheses', title: 'Valid Parentheses', difficulty: 'Easy', points: 300, solvedCount: 312 },
      { id: 'wc41-q2', problemId: 'binary-tree-level-order', title: 'Binary Tree Level Order Traversal', difficulty: 'Medium', points: 400, solvedCount: 218 },
      { id: 'wc41-q3', problemId: 'climbing-stairs', title: 'Climbing Stairs', difficulty: 'Easy', points: 400, solvedCount: 194 },
      { id: 'wc41-q4', problemId: 'median-arrays', title: 'Median of Two Sorted Arrays', difficulty: 'Hard', points: 600, solvedCount: 86 },
    ],
  },
  {
    id: 'weekly-contest-40',
    slug: 'weekly-contest-40',
    title: 'Weekly Contest 40',
    description: 'Weekly 2-day competition held Saturday and Sunday celebrating 40 weeks of continuous campus competition and high-velocity problem solving.',
    startTime: '2026-11-14T00:00:00.000Z',
    endTime: '2026-11-15T23:59:59.000Z',
    durationMinutes: 2880,
    status: 'completed',
    problems: [
      { id: 'wc40-q1', problemId: 'reverse-linked-list', title: 'Reverse Linked List', difficulty: 'Easy', points: 300, solvedCount: 298 },
      { id: 'wc40-q2', problemId: 'two-sum', title: 'Two Sum', difficulty: 'Easy', points: 300, solvedCount: 284 },
      { id: 'wc40-q3', problemId: 'longest-substring', title: 'Longest Substring Without Repeating Characters', difficulty: 'Medium', points: 500, solvedCount: 164 },
      { id: 'wc40-q4', problemId: 'container-water', title: 'Container With Most Water', difficulty: 'Medium', points: 600, solvedCount: 112 },
    ],
  },
];
