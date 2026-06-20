// Seeded pseudo-random number generator for deterministic jitter
function seededRandom(seed) {
  let s = seed;
  return function () {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return (s >>> 0) / 0xffffffff;
  };
}

function buildMatrix({ peakDays = [], peakHours = [], secondaryHours = [], weekendDays = [], weekendHours = [], peakScore = 90, highScore = 70, midScore = 45, lowScore = 20 }, seed = 42) {
  const rand = seededRandom(seed);
  // Initialize 7 days × 24 hours
  const matrix = Array.from({ length: 7 }, () => Array(24).fill(lowScore));

  // Apply secondary hours to all days
  for (let d = 0; d < 7; d++) {
    for (const [start, end] of secondaryHours) {
      for (let h = start; h < end; h++) {
        matrix[d][h] = midScore;
      }
    }
  }

  // Apply peak hours to peak days
  for (const d of peakDays) {
    for (const [start, end] of secondaryHours) {
      for (let h = start; h < end; h++) {
        matrix[d][h] = highScore;
      }
    }
    for (const [start, end] of peakHours) {
      for (let h = start; h < end; h++) {
        matrix[d][h] = peakScore;
      }
    }
  }

  // Apply weekend-specific hours
  for (const d of weekendDays) {
    for (const [start, end] of weekendHours) {
      for (let h = start; h < end; h++) {
        matrix[d][h] = peakScore;
      }
    }
  }

  // Add deterministic jitter ±5
  for (let d = 0; d < 7; d++) {
    for (let h = 0; h < 24; h++) {
      const jitter = Math.round((rand() - 0.5) * 10);
      matrix[d][h] = Math.max(5, Math.min(100, matrix[d][h] + jitter));
    }
  }

  return matrix;
}

const audienceProfiles = {
  global: {
    label: 'Global',
    description: 'Worldwide average audience',
    matrix: buildMatrix({
      peakDays: [2, 4, 5, 6],
      peakHours: [[6, 9], [12, 15], [19, 23]],
      secondaryHours: [[10, 12], [16, 19]],
      peakScore: 90, highScore: 70, midScore: 45, lowScore: 20
    }, 101)
  },
  india: {
    label: 'India',
    description: 'Indian audience (IST)',
    matrix: buildMatrix({
      peakDays: [2, 4, 5, 6],
      peakHours: [[19, 22]],
      secondaryHours: [[6, 9], [12, 14]],
      peakScore: 95, highScore: 65, midScore: 40, lowScore: 15
    }, 202)
  },
  us: {
    label: 'United States',
    description: 'US audience (EST/PST blended)',
    matrix: buildMatrix({
      peakDays: [1, 2, 4, 5, 6],
      peakHours: [[19, 23]],
      secondaryHours: [[12, 15]],
      peakScore: 92, highScore: 65, midScore: 40, lowScore: 18
    }, 303)
  },
  teen: {
    label: 'Teens (13–17)',
    description: 'Teenage audience',
    matrix: buildMatrix({
      peakDays: [0, 1, 2, 3, 4],
      peakHours: [[15, 18]],
      secondaryHours: [[19, 22]],
      weekendDays: [5, 6],
      weekendHours: [[10, 12], [19, 23]],
      peakScore: 93, highScore: 68, midScore: 38, lowScore: 15
    }, 404)
  },
  adult: {
    label: 'Adults (25–45)',
    description: 'Working adult audience',
    matrix: buildMatrix({
      peakDays: [2, 3, 4, 5, 6],
      peakHours: [[19, 23]],
      secondaryHours: [[6, 7], [12, 13]],
      peakScore: 88, highScore: 62, midScore: 40, lowScore: 18
    }, 505)
  }
};

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

function getTopSlots(audience, limit = 5) {
  const profile = audienceProfiles[audience];
  if (!profile) return [];
  const slots = [];
  for (let d = 0; d < 7; d++) {
    for (let h = 0; h < 24; h++) {
      slots.push({ dayIndex: d, day: DAYS[d], hour: h, score: profile.matrix[d][h] });
    }
  }
  slots.sort((a, b) => b.score - a.score);
  return slots.slice(0, limit);
}

module.exports = { audienceProfiles, DAYS, getTopSlots };
