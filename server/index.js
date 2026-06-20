const express = require('express');
const cors = require('cors');
const path = require('path');
const timingRoutes = require('./routes/timingRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: ['http://localhost:3000', 'http://localhost:5173'] }));
app.use(express.json());
app.use('/api/timing', timingRoutes);

// Serve built client in production
const distPath = path.join(__dirname, '../client/dist');
app.use(express.static(distPath));
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
