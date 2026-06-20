export default function TipCard({ tip }) {
  return (
    <div className="tip-card">
      <div className="tip-icon">{tip.icon}</div>
      <div className="tip-content">
        <h3 className="tip-title">{tip.title}</h3>
        <p className="tip-body">{tip.body}</p>
        <span className="tip-source">Source: {tip.source}</span>
      </div>
    </div>
  );
}
