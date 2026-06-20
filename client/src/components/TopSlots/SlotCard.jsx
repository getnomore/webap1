const RANK_COLORS = ['#f5c518', '#c0c0c0', '#cd7f32', '#00d4aa', '#e94560'];

export default function SlotCard({ slot }) {
  const rankColor = RANK_COLORS[slot.rank - 1] || '#666';
  return (
    <div className="slot-card">
      <div className="slot-rank" style={{ backgroundColor: rankColor }}>#{slot.rank}</div>
      <div className="slot-info">
        <div className="slot-label">{slot.label}</div>
        <div className="slot-bar-wrap">
          <div className="slot-bar" style={{ width: `${slot.score}%` }} />
        </div>
      </div>
      <div className="slot-score">{slot.score}</div>
    </div>
  );
}
