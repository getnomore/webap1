// All backend data bundled into the frontend for static hosting

function seededRandom(seed) {
  let s = seed;
  return function () {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return (s >>> 0) / 0xffffffff;
  };
}

function buildMatrix({ peakDays = [], peakHours = [], secondaryHours = [], weekendDays = [], weekendHours = [], peakScore = 90, highScore = 70, midScore = 45, lowScore = 20 }, seed = 42) {
  const rand = seededRandom(seed);
  const matrix = Array.from({ length: 7 }, () => Array(24).fill(lowScore));
  for (let d = 0; d < 7; d++) {
    for (const [start, end] of secondaryHours) {
      for (let h = start; h < end; h++) matrix[d][h] = midScore;
    }
  }
  for (const d of peakDays) {
    for (const [start, end] of secondaryHours) {
      for (let h = start; h < end; h++) matrix[d][h] = highScore;
    }
    for (const [start, end] of peakHours) {
      for (let h = start; h < end; h++) matrix[d][h] = peakScore;
    }
  }
  for (const d of weekendDays) {
    for (const [start, end] of weekendHours) {
      for (let h = start; h < end; h++) matrix[d][h] = peakScore;
    }
  }
  for (let d = 0; d < 7; d++) {
    for (let h = 0; h < 24; h++) {
      const jitter = Math.round((rand() - 0.5) * 10);
      matrix[d][h] = Math.max(5, Math.min(100, matrix[d][h] + jitter));
    }
  }
  return matrix;
}

export const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export const AUDIENCES = [
  { id: 'global', label: 'Global', description: 'Worldwide average audience' },
  { id: 'india', label: 'India', description: 'Indian audience (IST)' },
  { id: 'us', label: 'United States', description: 'US audience (EST/PST blended)' },
  { id: 'teen', label: 'Teens (13–17)', description: 'Teenage audience' },
  { id: 'adult', label: 'Adults (25–45)', description: 'Working adult audience' }
];

export const TIMEZONES = [
  { id: 'UTC', label: 'UTC / GMT', offset: 0 },
  { id: 'America/New_York', label: 'Eastern (EST/EDT)', offset: -5 },
  { id: 'America/Chicago', label: 'Central (CST/CDT)', offset: -6 },
  { id: 'America/Los_Angeles', label: 'Pacific (PST/PDT)', offset: -8 },
  { id: 'Asia/Kolkata', label: 'India (IST)', offset: 5.5 },
  { id: 'Europe/London', label: 'UK (GMT/BST)', offset: 0 },
  { id: 'Europe/Paris', label: 'Central Europe (CET/CEST)', offset: 1 },
  { id: 'Asia/Tokyo', label: 'Japan (JST)', offset: 9 },
  { id: 'Asia/Singapore', label: 'Singapore (SGT)', offset: 8 },
  { id: 'Australia/Sydney', label: 'Australia Eastern (AEST)', offset: 10 }
];

export const AUDIENCE_MATRICES = {
  global: buildMatrix({ peakDays: [2,4,5,6], peakHours: [[6,9],[12,15],[19,23]], secondaryHours: [[10,12],[16,19]], peakScore: 90, highScore: 70, midScore: 45, lowScore: 20 }, 101),
  india:  buildMatrix({ peakDays: [2,4,5,6], peakHours: [[19,22]], secondaryHours: [[6,9],[12,14]], peakScore: 95, highScore: 65, midScore: 40, lowScore: 15 }, 202),
  us:     buildMatrix({ peakDays: [1,2,4,5,6], peakHours: [[19,23]], secondaryHours: [[12,15]], peakScore: 92, highScore: 65, midScore: 40, lowScore: 18 }, 303),
  teen:   buildMatrix({ peakDays: [0,1,2,3,4], peakHours: [[15,18]], secondaryHours: [[19,22]], weekendDays: [5,6], weekendHours: [[10,12],[19,23]], peakScore: 93, highScore: 68, midScore: 38, lowScore: 15 }, 404),
  adult:  buildMatrix({ peakDays: [2,3,4,5,6], peakHours: [[19,23]], secondaryHours: [[6,7],[12,13]], peakScore: 88, highScore: 62, midScore: 40, lowScore: 18 }, 505)
};

export const TIPS = [
  { id: 1, icon: '⏰', title: 'Upload 1–2 hours before your peak window', body: "YouTube's algorithm needs time to index and begin distributing your Short. Uploading at 5:30 PM for a 7 PM peak gives the system runway.", source: 'YouTube Creator Academy, 2023', audiences: ['global','india','us','teen','adult'] },
  { id: 2, icon: '📅', title: 'Consistency beats perfect timing', body: 'Uploading 3–5 Shorts per week consistently outperforms sporadic uploads at ideal times. The algorithm rewards predictable publishing schedules.', source: 'TubeFilter Creator Report, 2024', audiences: ['global','india','us','teen','adult'] },
  { id: 3, icon: '📊', title: 'Check your own Analytics first', body: "Your channel's 'When your viewers are on YouTube' tab (Studio → Analytics → Audience) overrides any general guideline.", source: 'YouTube Help Center', audiences: ['global','india','us','teen','adult'] },
  { id: 4, icon: '🌟', title: 'Saturday is the single highest-engagement day', body: 'Across all audience types, Saturday shows the highest average engagement per Short. Viewers have leisure time and are actively browsing.', source: 'Social Insider Benchmarks, 2024', audiences: ['global','us','adult'] },
  { id: 5, icon: '🎒', title: 'Target teens 3–6 PM weekdays (school dismissal window)', body: 'Teens spike on mobile immediately after school. This window is especially powerful Mon–Fri during the school year.', source: 'Sprout Social Index, 2024', audiences: ['teen'] },
  { id: 6, icon: '🇮🇳', title: "India's 7–10 PM IST is the golden window", body: 'India has one of the largest YouTube Shorts viewer bases. The 7–10 PM post-dinner window sees engagement 40% above daily average.', source: 'DataReportal India 2024', audiences: ['india'] },
  { id: 7, icon: '🌅', title: 'Morning uploads (6–9 AM) build all-day momentum', body: 'A Short uploaded at 6–7 AM has the entire day to accumulate views. Early engagement signals help the algorithm push it during peak evening hours.', source: 'Hootsuite Social Trends 2024', audiences: ['global','us','adult'] },
  { id: 8, icon: '🎮', title: 'Teen weekend peak: 10 AM–12 PM and 7–11 PM', body: 'On weekends, teens browse in two bursts — mid-morning before plans solidify, then evening after activities.', source: 'Sprout Social Index, 2024', audiences: ['teen'] }
];

function formatHourLabel(h) {
  if (h === 0) return '12 AM';
  if (h === 12) return '12 PM';
  if (h < 12) return `${h} AM`;
  return `${h - 12} PM`;
}

function scoreToTier(score) {
  if (score >= 90) return 'peak';
  if (score >= 76) return 'great';
  if (score >= 61) return 'good';
  if (score >= 41) return 'moderate';
  if (score >= 21) return 'low';
  return 'very-low';
}

function shiftMatrix(matrix, offsetHours) {
  const shift = ((Math.round(offsetHours) % 24) + 24) % 24;
  if (shift === 0) return matrix;
  return matrix.map(row => [...row.slice(shift), ...row.slice(0, shift)]);
}

export function getHeatmap(audience, timezoneId) {
  const tz = TIMEZONES.find(t => t.id === timezoneId) || TIMEZONES[0];
  const matrix = shiftMatrix(AUDIENCE_MATRICES[audience], tz.offset);
  return { days: DAYS, hourLabels: Array.from({ length: 24 }, (_, h) => formatHourLabel(h)), matrix };
}

export function getTopSlots(audience, timezoneId, limit = 5) {
  const tz = TIMEZONES.find(t => t.id === timezoneId) || TIMEZONES[0];
  const matrix = shiftMatrix(AUDIENCE_MATRICES[audience], tz.offset);
  const slots = [];
  for (let d = 0; d < 7; d++) {
    for (let h = 0; h < 24; h++) {
      slots.push({ dayIndex: d, day: DAYS[d], hour: h, score: matrix[d][h] });
    }
  }
  slots.sort((a, b) => b.score - a.score);
  return slots.slice(0, limit).map((s, i) => ({
    rank: i + 1, day: s.day, hour: s.hour,
    hourLabel: formatHourLabel(s.hour), score: s.score,
    label: `${s.day} ${formatHourLabel(s.hour)}`
  }));
}

export function getDayBreakdown(audience, timezoneId, day) {
  const tz = TIMEZONES.find(t => t.id === timezoneId) || TIMEZONES[0];
  const matrix = shiftMatrix(AUDIENCE_MATRICES[audience], tz.offset);
  const dayIndex = DAYS.indexOf(day);
  return matrix[dayIndex].map((score, h) => ({
    hour: h, label: formatHourLabel(h), score, tier: scoreToTier(score)
  }));
}

export function getTips(audience) {
  return TIPS.filter(t => t.audiences.includes(audience));
}
