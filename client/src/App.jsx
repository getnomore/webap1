import { useState, useEffect } from 'react';
import Header from './components/Header.jsx';
import AudienceSelector from './components/AudienceSelector.jsx';
import TimezoneSelector from './components/TimezoneSelector.jsx';
import Heatmap from './components/Heatmap/Heatmap.jsx';
import TopSlots from './components/TopSlots/TopSlots.jsx';
import DayBreakdown from './components/DayBreakdown/DayBreakdown.jsx';
import Tips from './components/Tips/Tips.jsx';
import { AUDIENCES, TIMEZONES, getHeatmap, getTopSlots, getTips } from './data/staticData.js';

export default function App() {
  const [selectedAudience, setSelectedAudience] = useState('global');
  const [selectedTimezone, setSelectedTimezone] = useState('UTC');
  const [selectedDay, setSelectedDay] = useState(null);
  const [heatmapData, setHeatmapData] = useState(null);
  const [topSlots, setTopSlots] = useState([]);
  const [tips, setTips] = useState([]);

  useEffect(() => {
    setHeatmapData(getHeatmap(selectedAudience, selectedTimezone));
    setTopSlots(getTopSlots(selectedAudience, selectedTimezone, 5));
    setTips(getTips(selectedAudience));
    setSelectedDay(null);
  }, [selectedAudience, selectedTimezone]);

  return (
    <div className="app">
      <Header />

      <div className="controls-bar">
        <AudienceSelector
          audiences={AUDIENCES}
          selected={selectedAudience}
          onChange={setSelectedAudience}
        />
        <TimezoneSelector
          timezones={TIMEZONES}
          selected={selectedTimezone}
          onChange={setSelectedTimezone}
        />
      </div>

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
    </div>
  );
}
