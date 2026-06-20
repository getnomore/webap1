import SlotCard from './SlotCard.jsx';

export default function TopSlots({ slots }) {
  if (!slots || slots.length === 0) return null;
  return (
    <section className="card">
      <h2 className="card-title">Top Upload Windows</h2>
      <p className="card-subtitle">Best ranked time slots by engagement score</p>
      <div className="slots-list">
        {slots.map(slot => (
          <SlotCard key={slot.rank} slot={slot} />
        ))}
      </div>
    </section>
  );
}
