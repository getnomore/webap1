import { useState, useEffect } from 'react';
import Header from './components/Header.jsx';
import AudienceSelector from './components/AudienceSelector.jsx';
import TimezoneSelector from './components/TimezoneSelector.jsx';
import Heatmap from './components/Heatmap/Heatmap.jsx';
import TopSlots from './components/TopSlots/TopSlots.jsx';
import DayBreakdown from './components/DayBreakdown/DayBreakdown.jsx';
import Tips from './components/Tips/Tips.jsx';
import {
  fetchAudiences, fetchTimezones, fetchHeatmap, fetchTopSlots, fetchTips
} from './api/timingApi.js';

export default function App() {
  const [audiences, setAudiences] = useState([]);
  const [timezones, setTimezones] = useState([]);
  const [selectedAudience, setSelectedAudience] = useState('global');
  const [selectedTimezone, setSelectedTimezone] = useState('UTC');
  const [selectedDay, setSelectedDay] = useState(null);
  const [heatmapData, setHeatmapData] = useState(null);
  const [topSlots, setTopSlots] = useState([]);
  const [tips, setTips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load static lists once
  useEffect(() => {
    Promise.all([fetchAudiences(), fetchTimezones()])
      .then(([a, tz]) => {
        setAudiences(a.audiences);
        setTimezones(tz.timezones);
      })
      .catch(e => setError(e.message));
  }, []);

  // Reload data when audience or timezone changes
  useEffect(() => {
    setLoading(true);
    setError(null);
    Promise.all([
      fetchHeatmap(selectedAudience, selectedTimezone),
      fetchTopSlots(selectedAudience, selectedTimezone, 5),
      fetchTips(selectedAudience)
    ])
      .then(([hm, ts, tp]) => {
        setHeatmapData(hm);
        setTopSlots(ts.slots);
        setTips(tp.tips);
        setLoading(false);
      })
      .catch(e => {
        setError(e.message);
        setLoading(false);
      });
  }, [selectedAudience, selectedTimezone]);

  return (
    <div className="app">
      <Header />

      <div className="controls-bar">
        <AudienceSelector
          audiences={audiences}
          selected={selectedAudience}
          onChange={v => { setSelectedAudience(v); setSelectedDay(null); }}
        />
        <TimezoneSelector
          timezones={timezones}
          selected={selectedTimezone}
          onChange={v => { setSelectedTimezone(v); setSelectedDay(null); }}
        />
        {loading && <span className="loading-badge">Loading...</span>}
      </div>

      {error && <div className="error-banner">Error: {error}</div>}

      {!loading && !error && (
        <main className="main-content">
          <div className="top-row">
            <Heatmap
              data={heatmapData}
              selectedDay={selectedDay}
              onDaySelect={setSelectedDay}
            />
            <TopSlots slots={topSlots} />
          </div>

          <DayBreakdown
            audience={selectedAudience}
            timezone={selectedTimezone}
            selectedDay={selectedDay}
            onDaySelect={setSelectedDay}
          />

          <Tips tips={tips} />
        </main>
      )}
    </div>
  );
}
