import { useState, useEffect } from 'react';
import HourBar from './HourBar.jsx';
import { getDayBreakdown } from '../../data/staticData.js';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export default function DayBreakdown({ audience, timezone, selectedDay, onDaySelect }) {
  const [activeDay, setActiveDay] = useState(selectedDay || 'Saturday');
  const [breakdown, setBreakdown] = useState([]);

  useEffect(() => {
    if (selectedDay) setActiveDay(selectedDay);
  }, [selectedDay]);

  useEffect(() => {
    setBreakdown(getDayBreakdown(audience, timezone, activeDay));
  }, [audience, timezone, activeDay]);

  function handleDayClick(day) {
    setActiveDay(day);
    onDaySelect(day);
  }

  return (
    <section className="card">
      <h2 className="card-title">Day Breakdown</h2>
      <p className="card-subtitle">Hour-by-hour engagement for a selected day</p>

      <div className="day-tabs">
        {DAYS.map(day => (
          <button
            key={day}
            className={`day-tab ${activeDay === day ? 'active' : ''}`}
            onClick={() => handleDayClick(day)}
          >
            {day.slice(0, 3)}
          </button>
        ))}
      </div>

      <div className="hour-bars">
        {breakdown.map(h => (
          <HourBar key={h.hour} hour={h} />
        ))}
      </div>
    </section>
  );
}
