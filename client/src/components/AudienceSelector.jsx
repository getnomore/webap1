export default function AudienceSelector({ audiences, selected, onChange }) {
  return (
    <div className="selector-group">
      <label className="selector-label">Target Audience</label>
      <select
        className="selector-input"
        value={selected}
        onChange={e => onChange(e.target.value)}
      >
        {audiences.map(a => (
          <option key={a.id} value={a.id}>{a.label}</option>
        ))}
      </select>
    </div>
  );
}
