const express = require('express');
const router = express.Router();
const { audienceProfiles, DAYS, getTopSlots } = require('../data/timingData');
const { getTipsForAudience } = require('../data/tipsData');

const VALID_AUDIENCES = ['global', 'india', 'us', 'teen', 'adult'];

const TIMEZONES = [
  { id: 'UTC', label: 'UTC / GMT' },
  { id: 'America/New_York', label: 'Eastern (EST/EDT)' },
  { id: 'America/Chicago', label: 'Central (CST/CDT)' },
  { id: 'America/Los_Angeles', label: 'Pacific (PST/PDT)' },
  { id: 'Asia/Kolkata', label: 'India (IST)' },
  { id: 'Europe/London', label: 'UK (GMT/BST)' },
  { id: 'Europe/Paris', label: 'Central Europe (CET/CEST)' },
  { id: 'Asia/Tokyo', label: 'Japan (JST)' },
  { id: 'Asia/Singapore', label: 'Singapore (SGT)' },
  { id: 'Australia/Sydney', label: 'Australia Eastern (AEST)' }
];

function getUtcOffsetHours(timezone) {
  const date = new Date();
  const utcDate = new Date(date.toLocaleString('en-US', { timeZone: 'UTC' }));
  const tzDate = new Date(date.toLocaleString('en-US', { timeZone: timezone }));
  return (tzDate - utcDate) / (1000 * 60 * 60);
}

function shiftMatrixByTimezone(matrix, timezone) {
  const offset = Math.round(getUtcOffsetHours(timezone));
  if (offset === 0) return matrix;
  return matrix.map(dayRow => {
    const shift = ((offset % 24) + 24) % 24;
    return [...dayRow.slice(shift), ...dayRow.slice(0, shift)];
  });
}

function formatHourLabel(hour) {
  if (hour === 0) return '12 AM';
  if (hour === 12) return '12 PM';
  if (hour < 12) return `${hour} AM`;
  return `${hour - 12} PM`;
}

function scoreToTier(score) {
  if (score >= 90) return 'peak';
  if (score >= 76) return 'great';
  if (score >= 61) return 'good';
  if (score >= 41) return 'moderate';
  if (score >= 21) return 'low';
  return 'very-low';
}

router.get('/audiences', (req, res) => {
  const audiences = VALID_AUDIENCES.map(id => ({
    id,
    label: audienceProfiles[id].label,
    description: audienceProfiles[id].description
  }));
  res.json({ audiences });
});

router.get('/timezones', (req, res) => {
  res.json({ timezones: TIMEZONES });
});

router.get('/heatmap', (req, res) => {
  const audience = req.query.audience || 'global';
  const timezone = req.query.timezone || 'UTC';

  if (!VALID_AUDIENCES.includes(audience)) {
    return res.status(400).json({ error: 'Invalid audience' });
  }

  const profile = audienceProfiles[audience];
  const shiftedMatrix = shiftMatrixByTimezone(profile.matrix, timezone);
  const hourLabels = Array.from({ length: 24 }, (_, h) => formatHourLabel(h));

  res.json({
    audience,
    timezone,
    days: DAYS,
    hours: Array.from({ length: 24 }, (_, i) => i),
    hourLabels,
    matrix: shiftedMatrix
  });
});

router.get('/top-slots', (req, res) => {
  const audience = req.query.audience || 'global';
  const timezone = req.query.timezone || 'UTC';
  const limit = Math.min(parseInt(req.query.limit) || 5, 10);

  if (!VALID_AUDIENCES.includes(audience)) {
    return res.status(400).json({ error: 'Invalid audience' });
  }

  const profile = audienceProfiles[audience];
  const shiftedMatrix = shiftMatrixByTimezone(profile.matrix, timezone);

  const slots = [];
  for (let d = 0; d < 7; d++) {
    for (let h = 0; h < 24; h++) {
      slots.push({ dayIndex: d, day: DAYS[d], hour: h, score: shiftedMatrix[d][h] });
    }
  }
  slots.sort((a, b) => b.score - a.score);
  const top = slots.slice(0, limit).map((s, i) => ({
    rank: i + 1,
    day: s.day,
    hour: s.hour,
    hourLabel: formatHourLabel(s.hour),
    score: s.score,
    label: `${s.day} ${formatHourLabel(s.hour)}`
  }));

  res.json({ slots: top });
});

router.get('/day-breakdown', (req, res) => {
  const audience = req.query.audience || 'global';
  const timezone = req.query.timezone || 'UTC';
  const day = req.query.day;

  if (!VALID_AUDIENCES.includes(audience)) {
    return res.status(400).json({ error: 'Invalid audience' });
  }

  const dayIndex = DAYS.indexOf(day);
  if (dayIndex === -1) {
    return res.status(400).json({ error: 'Invalid day. Use Monday–Sunday.' });
  }

  const profile = audienceProfiles[audience];
  const shiftedMatrix = shiftMatrixByTimezone(profile.matrix, timezone);
  const dayRow = shiftedMatrix[dayIndex];

  const hours = dayRow.map((score, h) => ({
    hour: h,
    label: formatHourLabel(h),
    score,
    tier: scoreToTier(score)
  }));

  res.json({ day, hours });
});

router.get('/tips', (req, res) => {
  const audience = req.query.audience || 'global';
  if (!VALID_AUDIENCES.includes(audience)) {
    return res.status(400).json({ error: 'Invalid audience' });
  }
  res.json({ tips: getTipsForAudience(audience) });
});

module.exports = router;
