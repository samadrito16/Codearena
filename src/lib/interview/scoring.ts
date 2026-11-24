import { ActiveInterviewRound, InterviewScorecard, InterviewVerdict } from '../../types/interview';

export function computeInterviewScorecard(round: ActiveInterviewRound): InterviewScorecard {
  const p1 = round.problem1State;
  const p2 = round.problem2State;

  const p1Total = p1.totalCount || 1;
  const p2Total = p2.totalCount || 1;
  const p1Ratio = Math.min(1, p1.passedCount / p1Total);
  const p2Ratio = Math.min(1, p2.passedCount / p2Total);

  // Time metrics (in minutes)
  const totalAllocatedMinutes = round.durationMinutes;
  const idealP1Mins = Math.round(totalAllocatedMinutes * 0.4); // e.g. 18m in 45m round
  const idealP2Mins = totalAllocatedMinutes - idealP1Mins;     // e.g. 27m in 45m round

  const p1Minutes = Math.round((p1.timeSpentSeconds / 60) * 10) / 10;
  const p2Minutes = Math.round((p2.timeSpentSeconds / 60) * 10) / 10;
  const totalSpentSeconds = p1.timeSpentSeconds + p2.timeSpentSeconds;

  // Pacing evaluation
  let pacingRating: 'Optimal Pacing' | 'Problem 1 Delayed' | 'Problem 2 Starved' | 'Balanced' = 'Balanced';
  if (p1Minutes <= idealP1Mins + 2 && p2Minutes <= idealP2Mins) {
    pacingRating = 'Optimal Pacing';
  } else if (p1Minutes > idealP1Mins + 5) {
    pacingRating = 'Problem 1 Delayed';
  } else if (p2Minutes > idealP2Mins + 5) {
    pacingRating = 'Problem 2 Starved';
  }

  // Raw score computation
  // Problem 1 (Medium) is 45% weight, Problem 2 (Medium/Hard) is 55% weight
  let rawScore = p1Ratio * 45 + p2Ratio * 55;

  // Integrity deduction: 3 pts per tab switch (max 15 pts)
  const tabPenalty = Math.min(15, round.tabSwitches * 3);
  rawScore = Math.max(0, rawScore - tabPenalty);

  // Time bonus: up to 5 bonus points if both solved with > 5 minutes remaining
  if (p1.isSolved && p2.isSolved && round.remainingSeconds >= 300) {
    rawScore = Math.min(100, rawScore + 5);
  }

  const overallScore = Math.round(rawScore);

  // Verdict calculation
  let verdict: InterviewVerdict = 'NO HIRE';
  if (p1.isSolved && p2.isSolved) {
    if (round.tabSwitches === 0 && round.remainingSeconds >= 180 && p1.attemptsCount <= 3 && p2.attemptsCount <= 4) {
      verdict = 'STRONG HIRE';
    } else {
      verdict = 'HIRE';
    }
  } else if (p1.isSolved && p2Ratio >= 0.4) {
    verdict = 'LEAN HIRE';
  } else if (p1Ratio >= 0.8 && p2Ratio >= 0.2) {
    verdict = 'LEAN HIRE';
  }

  // Percentile: hidden until sufficient real candidate cohort data is collected
  const percentile = undefined;

  // Integrity Rating
  let integrityRating = 'Pristine (0 infractions)';
  const totalInfractions = round.tabSwitches + (round.fullscreenExits || 0);
  if (round.autoSubmitReason) {
    integrityRating = `Terminated: ${round.autoSubmitReason}`;
  } else if (totalInfractions > 2) {
    integrityRating = `Infraction (${round.tabSwitches} tab switches, ${round.fullscreenExits || 0} fullscreen exits)`;
  } else if (totalInfractions > 0) {
    integrityRating = `Caution (${round.tabSwitches} tab switches, ${round.fullscreenExits || 0} fullscreen exits)`;
  }

  // Recommendations generator
  const recommendations: string[] = [];
  if (!p1.isSolved) {
    recommendations.push(`Strengthen ${round.problem1.topics[0] || 'core'} foundations to solve Medium warmups with high reliability.`);
  }
  if (!p2.isSolved && p1.isSolved) {
    recommendations.push(`Focus on high-yield ${round.problem2.topics[0] || 'advanced'} anchor problems and optimal complexity reductions.`);
  }
  if (p1Minutes > idealP1Mins + 4) {
    recommendations.push(`Improve warmup speed: you spent ${p1Minutes}m on Problem 1 (target ≤ ${idealP1Mins}m), leaving limited headroom for Problem 2.`);
  }
  if (round.tabSwitches > 0) {
    recommendations.push(`Eliminate tab switching (${round.tabSwitches} detected) to build authentic mental recall under live interview pressure.`);
  }
  if (p1.attemptsCount > 3 || p2.attemptsCount > 3) {
    recommendations.push(`Dry-run code on edge cases before running: you averaged multiple submission iterations before passing.`);
  }
  if (recommendations.length === 0) {
    recommendations.push(`Exceptional performance! Code execution speed, pacing, and interview integrity all match L5 / Senior standards.`);
  }

  return {
    roundId: round.id,
    title: round.title,
    verdict,
    overallScore,
    percentile,
    durationMinutes: round.durationMinutes,
    totalTimeSpentSeconds: totalSpentSeconds,
    timeAllocation: {
      problem1Minutes: p1Minutes,
      problem2Minutes: p2Minutes,
      idealProblem1Minutes: idealP1Mins,
      idealProblem2Minutes: idealP2Mins,
      pacingRating,
    },
    correctness: {
      problem1Passed: p1.passedCount,
      problem1Total: p1Total,
      problem2Passed: p2.passedCount,
      problem2Total: p2Total,
      totalPassedRatio: (p1.passedCount + p2.passedCount) / (p1Total + p2Total),
    },
    efficiency: {
      problem1RuntimeMs: p1.runtimeMs,
      problem2RuntimeMs: p2.runtimeMs,
      runtimePercentile: undefined,
      memoryPercentile: undefined,
      efficiencyVerdict: p1.isSolved && p2.isSolved ? 'Optimal Big-O Complexity Met' : 'Sub-optimal or Incomplete Test Run',
    },
    integrity: {
      tabSwitches: round.tabSwitches,
      fullscreenExits: round.fullscreenExits || 0,
      rating: integrityRating,
    },
    recommendations,
    completedAt: Date.now(),
    autoSubmitReason: round.autoSubmitReason,
  };
}
