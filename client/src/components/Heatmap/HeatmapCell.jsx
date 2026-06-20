function scoreToColor(score) {
  if (score >= 90) return '#00d4aa';
  if (score >= 76) return '#f5a623';
  if (score >= 61) return '#e94560';
  if (score >= 41) return '#0f3460';
  if (score >= 21) return '#16213e';
  return '#1a1a2e';
}

export default function HeatmapCell({ score, tooltip }) {
  return (
    <div
      className="heatmap-cell"
      style={{ backgroundColor: scoreToColor(score) }}
      title={tooltip}
    />
  );
}
