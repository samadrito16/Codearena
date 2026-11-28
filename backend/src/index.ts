import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { config } from './config.js';
import { db } from './db/database.js';
import { contentDatabase } from './db/prisma.js';
import { attachUser } from './middleware/auth.js';
import { errorHandler } from './middleware/errorHandler.js';
import { apiLimiter } from './middleware/rateLimiter.js';

import authRoutes from './routes/authRoutes.js';
import problemRoutes from './routes/problemRoutes.js';
import editorialRoutes from './routes/editorialRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import userRoutes from './routes/userRoutes.js';
import submissionRoutes from './routes/submissionRoutes.js';
import leaderboardRoutes from './routes/leaderboardRoutes.js';
import certificateRoutes from './routes/certificateRoutes.js';
import publicProfileRoutes from './routes/publicProfileRoutes.js';
import contestRoutes from './routes/contestRoutes.js';
import peerSolutionRoutes from './routes/peerSolutionRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import { placementRouter } from './routes/placementRoutes.js';
import { catalogRouter } from './routes/catalogRoutes.js';
import { adminLearningPathRouter, learningPathRouter } from './routes/learningPathRoutes.js';

const app = express();

// Secure HTTP response headers
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
  })
);

// Keep the platform health check available for direct requests that have no
// Origin header; it exposes no user data and must run before the CORS guard.
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'PrismCode Backend API',
    uptimeSeconds: Math.floor(process.uptime()),
    timestamp: new Date().toISOString(),
  });
});

// Trust proxy for rate limiting only when behind a reverse proxy
if (config.behindProxy || config.isProduction) {
  app.set('trust proxy', 1);
}

// Configure CORS for exact frontend origin with credentials
const allowedOrigins = [
  config.frontendUrl,
  process.env.RENDER_EXTERNAL_URL,
  'http://localhost:5173',
  'http://127.0.0.1:5173',
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) {
        // In development, allow requests without Origin header (e.g. CLI tools / curl)
        // In production, reject requests without valid Origin header to prevent CSRF / abuse
        if (!config.isProduction) {
          callback(null, true);
        } else {
          callback(new Error('Origin header required for API requests.'));
        }
      } else if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`Origin '${origin}' not allowed by CORS.`));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  })
);

app.use(cookieParser());
app.use(express.json({ limit: '1mb' }));

// Attach authenticated session user to request
app.use(attachUser);

// Apply rate limiting to all /api routes
app.use('/api', apiLimiter);

// Mount modular API routers with clean /api path prefixes
app.use('/api/auth', authRoutes);
app.use('/api/problems', problemRoutes);
app.use('/api/editorials', editorialRoutes);
app.use('/api/learning-paths', learningPathRouter);
app.use('/api/admin/learning-paths', adminLearningPathRouter);
app.use('/api/admin', adminRoutes);
app.use('/api/user', userRoutes);
app.use('/api/submissions', submissionRoutes);
app.use('/api/execution', submissionRoutes);
app.use('/api/leaderboard', leaderboardRoutes);
app.use('/api/certificates', certificateRoutes);
app.use('/api/public', publicProfileRoutes);
app.use('/api/contests', contestRoutes);
app.use('/api/review', reviewRoutes);
app.use('/api/catalog', catalogRouter);
app.use('/api/placement', placementRouter);
app.use('/api', peerSolutionRoutes);

// In production, serve the Vite app from the same origin as the API. This keeps
// staging simple: one Render web service can host both the UI and backend.
if (config.isProduction) {
  // The start command runs from backend/, while Vite writes the UI build to
  // the repository-root dist/ directory. Resolve from this module so the path
  // is stable regardless of the process working directory.
  const frontendDist = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../dist');
  app.use(express.static(frontendDist));
  app.get('*', (req, res, next) => {
    if (req.path === '/api' || req.path.startsWith('/api/')) return next();
    res.sendFile(path.join(frontendDist, 'index.html'), (error) => {
      if (error) next(error);
    });
  });
}

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
    const database = contentDatabase();
    if (database) {
      try {
        await database.contentEntry.count();
      } catch {
        throw new Error('PostgreSQL content is unavailable. Check DATABASE_URL and apply the Prisma migrations.');
      }
    }
    await db.init();
    app.listen(config.port, () => {
      console.log(`[PrismCode Backend] Server listening on http://localhost:${config.port}`);
      console.log(`[PrismCode Backend] CORS origin allowed: ${config.frontendUrl}`);
      console.log(`[PrismCode Backend] Execution sandbox: OnlineCompiler.io isolated container`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
}

bootstrap();

export default app;
