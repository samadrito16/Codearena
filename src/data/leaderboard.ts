export interface LeaderboardEntry {
  name: string;
  handle: string;
  score: number;
  solved: number;
  streak: number;
  initials: string;
  color: string;
}

/**
 * Sample static leaderboard fixture isolated from problem definitions so it can be
 * replaced by a backend leaderboard API response without modifying UI layout code.
 */
export const sampleLeaderboard: LeaderboardEntry[] = [
  { name: 'Maya Chen', handle: '@mayacodes', score: 2840, solved: 186, streak: 28, initials: 'MC', color: 'from-violet-500 to-fuchsia-500' },
  { name: 'Arjun Mehta', handle: '@arjun.dev', score: 2715, solved: 174, streak: 19, initials: 'AM', color: 'from-cyan-500 to-blue-500' },
  { name: 'Sofia Patel', handle: '@sofiapatel', score: 2590, solved: 163, streak: 14, initials: 'SP', color: 'from-amber-500 to-orange-500' },
  { name: 'Noah Williams', handle: '@noahw', score: 2480, solved: 151, streak: 11, initials: 'NW', color: 'from-emerald-500 to-teal-500' },
  { name: 'You', handle: '@you', score: 1820, solved: 72, streak: 6, initials: 'YO', color: 'from-pink-500 to-rose-500' },
];
