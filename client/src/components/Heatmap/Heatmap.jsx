import HeatmapCell from './HeatmapCell.jsx';

const HOUR_LABELS = [
  '12 AM','1 AM','2 AM','3 AM','4 AM','5 AM','6 AM','7 AM','8 AM','9 AM','10 AM','11 AM',
  '12 PM','1 PM','2 PM','3 PM','4 PM','5 PM','6 PM','7 PM','8 PM','9 PM','10 PM','11 PM'
];

export default function Heatmap({ data, selectedDay, onDaySelect }) {
  if (!data) return null;
  const { days, matrix } = data;

  return (
    <section className="card">
      <h2 className="card-title">Weekly Engagement Heatmap</h2>
      <p className="card-subtitle">Click a day column to explore it in detail</p>

      <div className="heatmap-legend">
        {[
          { color: '#1a1a2e', label: 'Very Low' },
          { color: '#16213e', label: 'Low' },
          { color: '#0f3460', label: 'Moderate' },
          { color: '#e94560', label: 'Good' },
          { color: '#f5a623', label: 'Great' },
          { color: '#00d4aa', label: 'Peak' }
        ].map(item => (
          <span key={item.label} className="legend-item">
            <span className="legend-swatch" style={{ backgroundColor: item.color }} />
            {item.label}
          </span>
        ))}
      </div>

      <div className="heatmap-scroll">
        <div className="heatmap-grid" style={{ gridTemplateColumns: `56px repeat(${days.length}, 1fr)` }}>
          {/* Corner */}
          <div className="heatmap-corner" />

          {/* Day headers */}
          {days.map((day, d) => (
            <button
              key={day}
              className={`heatmap-day-header ${selectedDay === day ? 'active' : ''}`}
              onClick={() => onDaySelect(selectedDay === day ? null : day)}
            >
              {day.slice(0, 3)}
            </button>
          ))}

          {/* Rows: hour label + cells */}
          {HOUR_LABELS.map((label, h) => (
            <>
              <div key={`label-${h}`} className="heatmap-hour-label">{label}</div>
              {days.map((day, d) => (
                <HeatmapCell
                  key={`${d}-${h}`}
                  score={matrix[d][h]}
                  tooltip={`${day} ${label} — Score: ${matrix[d][h]}`}
                />
              ))}
            </>
          ))}
        </div>
      </div>
    </section>
  );
}
