import { frontendChallenges } from './frontendChallenges';
import { backendChallenges } from './backendChallenges';
import { sqlChallenges } from './sqlChallenges';
import sections from '../../../backend/src/data/questionSections.json';
import { PracticalChallenge } from '../../types/practicalCoding';

// Only challenges in the published manifest are available in the workspace.
export const PRACTICAL_CHALLENGES: PracticalChallenge[] = [
  ...frontendChallenges,
  ...backendChallenges,
  ...sqlChallenges,
].filter(challenge => sections.practical.some(entry => entry.id === challenge.id));
