import TipCard from './TipCard.jsx';

export default function Tips({ tips }) {
  if (!tips || tips.length === 0) return null;
  return (
    <section className="card">
      <h2 className="card-title">Research-Backed Tips</h2>
      <p className="card-subtitle">Strategies to maximize your Shorts engagement</p>
      <div className="tips-grid">
        {tips.map(tip => (
          <TipCard key={tip.id} tip={tip} />
        ))}
      </div>
    </section>
  );
}
