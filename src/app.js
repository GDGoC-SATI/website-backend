import { handleRealtimeStream } from './utils/realtimeService.js';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import { connectDB } from './config/db.js';
import { errorHandler } from './middleware/errorHandler.js';

// Route Imports
import authRoutes from './routes/authRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import teamRoutes from './routes/teamRoutes.js';
import alumniRoutes from './routes/alumniRoutes.js';
import galleryRoutes from './routes/galleryRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import statsRoutes from './routes/statsRoutes.js';
import sectionRoutes from './routes/sectionRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = express();

// Security & Middleware
app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(
  cors({
    origin: '*',
    credentials: true,
  })
);
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// Ensure database connection for requests (serverless-friendly)
app.use(async (req, res, next) => {
  // Allow health checks or root status even if DB is still initializing
  if (req.path === '/' || req.path === '/api/health') {
    return next();
  }
  try {
    await connectDB();
    next();
  } catch (err) {
    console.error('[DB Middleware Error]:', err.message);
    res.status(503).json({
      error: 'Database connection failed',
      message: 'Please ensure MONGODB_URI is set and MongoDB Atlas IP access list allows access from anywhere (0.0.0.0/0).',
      details: err.message,
    });
  }
});

// Root route
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'GDG on Campus SATI Backend API is live!',
    health: '/api/health',
    timestamp: new Date().toISOString(),
  });
});

// Health check route
app.get('/api/health', async (req, res) => {
  try {
    await connectDB();
    res.status(200).json({
      status: 'OK',
      message: 'GDG on Campus SATI Backend API is running smoothly',
      database: 'Connected',
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    res.status(200).json({
      status: 'DEGRADED',
      message: 'Server is running, but database connection failed',
      databaseError: err.message,
      timestamp: new Date().toISOString(),
    });
  }
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/team', teamRoutes);
app.use('/api/alumni', alumniRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/sections', sectionRoutes);

// Real-Time Server-Sent Events (SSE) Stream
app.get('/api/realtime/stream', handleRealtimeStream);

// Catch 404 for unknown endpoints
app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: `Cannot ${req.method} ${req.originalUrl}`,
  });
});

// Error Handler Middleware
app.use(errorHandler);

export default app;
