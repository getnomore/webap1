const tips = [
  {
    id: 1,
    category: 'timing',
    icon: '⏰',
    title: 'Upload 1–2 hours before your peak window',
    body: "YouTube's algorithm needs time to index and begin distributing your Short. Uploading at 5:30 PM for a 7 PM peak gives the system runway to surface your content.",
    source: 'YouTube Creator Academy, 2023',
    audiences: ['global', 'india', 'us', 'teen', 'adult']
  },
  {
    id: 2,
    category: 'consistency',
    icon: '📅',
    title: 'Consistency beats perfect timing',
    body: 'Uploading 3–5 Shorts per week consistently outperforms sporadic uploads at ideal times. The algorithm rewards predictable publishing schedules.',
    source: 'TubeFilter Creator Report, 2024',
    audiences: ['global', 'india', 'us', 'teen', 'adult']
  },
  {
    id: 3,
    category: 'audience',
    icon: '📊',
    title: 'Check your own Analytics first',
    body: "Your channel's own 'When your viewers are on YouTube' tab (Studio → Analytics → Audience) overrides any general guideline. Your real data always wins.",
    source: 'YouTube Help Center',
    audiences: ['global', 'india', 'us', 'teen', 'adult']
  },
  {
    id: 4,
    category: 'weekend',
    icon: '🌟',
    title: 'Saturday is the single highest-engagement day',
    body: 'Across all audience types, Saturday shows the highest average engagement per Short. Viewers have leisure time and are actively browsing feeds.',
    source: 'Social Insider Benchmarks, 2024',
    audiences: ['global', 'us', 'adult']
  },
  {
    id: 5,
    category: 'teen',
    icon: '🎒',
    title: 'Target teens 3–6 PM weekdays (school dismissal window)',
    body: 'Teens spike on mobile immediately after school. This window is especially powerful Mon–Fri during the school year (Sep–Jun).',
    source: 'Sprout Social Index, 2024',
    audiences: ['teen']
  },
  {
    id: 6,
    category: 'region',
    icon: '🇮🇳',
    title: "India's 7–10 PM IST is the golden window",
    body: 'India has one of the largest YouTube Shorts viewer bases. The 7–10 PM post-dinner window sees engagement 40% above the daily average.',
    source: 'DataReportal India 2024',
    audiences: ['india']
  },
  {
    id: 7,
    category: 'timing',
    icon: '🌅',
    title: 'Morning uploads (6–9 AM) build all-day momentum',
    body: 'A Short uploaded at 6–7 AM has the entire day to accumulate views. Early engagement signals help the algorithm push it during peak evening hours.',
    source: 'Hootsuite Social Trends 2024',
    audiences: ['global', 'us', 'adult']
  },
  {
    id: 8,
    category: 'weekend',
    icon: '🎮',
    title: 'Teen weekend peak: 10 AM–12 PM and 7–11 PM',
    body: 'On weekends, teens browse in two bursts — mid-morning before plans solidify, then evening after activities. Both windows outperform weekday after-school slots.',
    source: 'Sprout Social Index, 2024',
    audiences: ['teen']
  }
];

function getTipsForAudience(audience) {
  return tips.filter(t => t.audiences.includes(audience));
}

module.exports = { tips, getTipsForAudience };
