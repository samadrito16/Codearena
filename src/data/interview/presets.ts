import { InterviewPreset } from '../../types/interview';

export const INTERVIEW_PRESETS: InterviewPreset[] = [
  {
    id: 'faang_standard',
    title: 'FAANG Standard Round',
    subtitle: '45-Min Standard Technical Interview',
    durationMinutes: 45,
    problem1Difficulty: 'Medium',
    problem2Difficulty: 'Medium',
    description: 'Simulates a standard 45-minute technical screen at Google, Meta, or Uber. Pairs two Medium-tier algorithmic challenges sharing complementary patterns.',
  },
  {
    id: 'senior_technical',
    title: 'Senior Technical Round',
    subtitle: '45-Min Senior Algorithmic Interview',
    durationMinutes: 45,
    problem1Difficulty: 'Medium',
    problem2Difficulty: 'Hard',
    description: 'Designed for L5+ / Senior candidates. Tests fast pacing on a Medium problem to leave headroom for a complex Hard anchor problem.',
  },
  {
    id: 'bar_raiser',
    title: 'Bar Raiser / Onsite Round',
    subtitle: '60-Min In-Depth Interview',
    durationMinutes: 60,
    problem1Difficulty: 'Medium',
    problem2Difficulty: 'Hard',
    description: 'A rigorous 60-minute deep-dive round with extensive edge cases and scalability constraints modeled after Amazon and Stripe onsite rounds.',
  },
];

export function getPresetById(id: string): InterviewPreset {
  return INTERVIEW_PRESETS.find((p) => p.id === id) || INTERVIEW_PRESETS[0];
}
