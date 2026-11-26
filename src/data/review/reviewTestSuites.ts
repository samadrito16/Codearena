import { ReviewTestSuite } from '../../types/review';
import { JS_REVIEW_SUITES } from './jsSuites';
import { PYTHON_REVIEW_SUITES } from './pythonSuites';

export const REVIEW_TEST_SUITES: Record<string, ReviewTestSuite> = {
  ...JS_REVIEW_SUITES,
  ...PYTHON_REVIEW_SUITES,
};

export function getReviewTestSuite(scenarioId: string): ReviewTestSuite | undefined {
  return REVIEW_TEST_SUITES[scenarioId];
}
