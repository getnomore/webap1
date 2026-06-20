export default function TimezoneSelector({ timezones, selected, onChange }) {
  return (
    <div className="selector-group">
      <label className="selector-label">Timezone</label>
      <select
        className="selector-input"
        value={selected}
        onChange={e => onChange(e.target.value)}
      >
        {timezones.map(tz => (
          <option key={tz.id} value={tz.id}>{tz.label}</option>
        ))}
      </select>
    </div>
  );
}
