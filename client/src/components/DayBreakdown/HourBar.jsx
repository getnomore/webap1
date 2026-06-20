const TIER_COLORS = {
  peak: '#00d4aa',
  great: '#f5a623',
  good: '#e94560',
  moderate: '#0f3460',
  low: '#16213e',
  'very-low': '#1a1a2e'
};

export default function HourBar({ hour }) {
  const color = TIER_COLORS[hour.tier] || '#1a1a2e';
  return (
    <div className="hour-bar-row">
      <span className="hour-bar-label">{hour.label}</span>
      <div className="hour-bar-track">
        <div
          className="hour-bar-fill"
          style={{ width: `${hour.score}%`, backgroundColor: color }}
        />
      </div>
      <span className="hour-bar-score">{hour.score}</span>
    </div>
  );
}
