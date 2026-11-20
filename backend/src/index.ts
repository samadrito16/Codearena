import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { config } from './config.js';
import { db } from './db/database.js';
import { attachUser } from './middleware/auth.js';
import { errorHandler } from './middleware/errorHandler.js';
import { apiLimiter } from './middleware/rateLimiter.js';

import authRoutes from './routes/authRoutes.js';
import problemRoutes from './routes/problemRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import userRoutes from './routes/userRoutes.js';
import submissionRoutes from './routes/submissionRoutes.js';
import leaderboardRoutes from './routes/leaderboardRoutes.js';

const app = express();

// Trust proxy for rate limiting behind reverse proxies
app.set('trust proxy', 1);

// Configure CORS for exact frontend origin with credentials
const allowedOrigins = [
  config.frontendUrl,
  'http://localhost:5173',
  'http://127.0.0.1:5173',
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, or same-origin)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(null, false);
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  })
);

app.use(cookieParser());
app.use(express.json({ limit: '2mb' }));

// Attach authenticated session user to request
app.use(attachUser);

// Apply rate limiting to all /api routes
app.use('/api', apiLimiter);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'PrismCode Backend API',
    company: 'Refract Labs',
    uptimeSeconds: Math.floor(process.uptime()),
    timestamp: new Date().toISOString(),
  });
});

// Mount modular API routers with common path prefixes
app.use('/api/auth', authRoutes);
app.use('/api', authRoutes);
app.use('/auth', authRoutes);

app.use('/api/problems', problemRoutes);
app.use('/problems', problemRoutes);

app.use('/api/admin', adminRoutes);
app.use('/admin', adminRoutes);

app.use('/api/user', userRoutes);
app.use('/user', userRoutes);

app.use('/api/submissions', submissionRoutes);
app.use('/submissions', submissionRoutes);

app.use('/api/leaderboard', leaderboardRoutes);
app.use('/leaderboard', leaderboardRoutes);

// 404 handler for unknown routes
app.use((req, res) => {
  res.status(404).json({
    error: {
      code: 'NOT_FOUND',
      message: `API route '${req.method} ${req.originalUrl}' not found.`,
    },
  });
});

// Centralized error handling middleware
app.use(errorHandler);

// Start server after initializing database
async function bootstrap() {
  try {
    await db.init();
    app.listen(config.port, () => {
      console.log(`[PrismCode Backend] Server listening on http://localhost:${config.port}`);
      console.log(`[PrismCode Backend] CORS origin allowed: ${config.frontendUrl}`);
      console.log(`[PrismCode Backend] Default Admin Account: admin@prismcode.com / Admin123!`);
      console.log(`[PrismCode Backend] Default User Account:  alex@example.com / Alex123!`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
}

bootstrap();

export default app;
