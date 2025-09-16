const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { createServer } = require('http');
const { Server } = require('socket.io');
const cron = require('node-cron');
require('dotenv').config();

// Import routes
const trafficRoutes = require('./routes/traffic.routes');
const emergencyRoutes = require('./routes/emergency.routes');
const intersectionRoutes = require('./routes/intersection.routes');
const analyticsRoutes = require('./routes/analytics.routes');
const alertRoutes = require('./routes/alert.routes');

// Import services
const TrafficAnalysisService = require('./services/trafficAnalysis.service');
const EmergencyResponseService = require('./services/emergencyResponse.service');

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true
  }
});

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/mach10_trafficops', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected successfully'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Routes
app.use('/api/traffic', trafficRoutes);
app.use('/api/emergency', emergencyRoutes);
app.use('/api/intersections', intersectionRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/alerts', alertRoutes);

// Socket.IO Real-time Events
io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  socket.on('join_intersection', (intersectionId) => {
    socket.join(`intersection_${intersectionId}`);
  });

  socket.on('emergency_vehicle_detected', async (data) => {
    // Trigger green wave for emergency vehicle
    const response = await EmergencyResponseService.activateGreenWave(data);
    io.emit('green_wave_activated', response);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// Scheduled Tasks
// Update traffic metrics every 30 seconds
cron.schedule('*/30 * * * * *', async () => {
  const metrics = await TrafficAnalysisService.calculateMetrics();
  io.emit('metrics_update', metrics);
});

// Check pollution levels every 5 minutes
cron.schedule('*/5 * * * *', async () => {
  const pollutionData = await TrafficAnalysisService.checkPollutionHotspots();
  if (pollutionData.alerts.length > 0) {
    io.emit('pollution_alert', pollutionData);
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => {
  console.log(`🚀 MACH-10 TrafficOps+ Server running on port ${PORT}`);
});

module.exports = { app, io };
