import { frontendChallenges } from './frontendChallenges';
import { backendChallenges } from './backendChallenges';
import { sqlChallenges } from './sqlChallenges';
import { PracticalChallenge } from '../../types/practicalCoding';

/**
 * Aggregated Canonical Role-Specific Practical Challenges
 * Total: 15 Challenges
 * - Frontend UI / DOM (7 challenges)
 * - Backend APIs & Middlewares (4 challenges)
 * - SQL & Data Pipelines (4 challenges)
 */
export const PRACTICAL_CHALLENGES: PracticalChallenge[] = [
  ...frontendChallenges,
  ...backendChallenges,
  ...sqlChallenges,
];
