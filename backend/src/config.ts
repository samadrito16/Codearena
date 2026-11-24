import dotenv from 'dotenv';
import path from 'path';

dotenv.config();
// Ensure backend/.env is also loaded when running from project root
dotenv.config({ path: path.resolve(process.cwd(), 'backend', '.env') });

const nodeEnv = process.env.NODE_ENV || 'development';
const isProduction = nodeEnv === 'production';
const sessionSecret = process.env.SESSION_SECRET || 'prismcode_default_session_secret_change_me';

if (isProduction && (sessionSecret.includes('change_me') || sessionSecret.length < 32)) {
  throw new Error('[Security Exception] A high-entropy SESSION_SECRET of at least 32 characters must be set in production.');
}

export const config = {
  port: parseInt(process.env.PORT || '8000', 10),
  nodeEnv,
  isProduction,
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173',
  sessionSecret,
  sessionExpiryDays: parseInt(process.env.SESSION_EXPIRY_DAYS || '7', 10),
  cookieName: 'prismcode_session',
  dbPath: process.env.DB_PATH || (process.cwd().endsWith('backend') ? path.resolve(process.cwd(), 'data', 'db.json') : path.resolve(process.cwd(), 'backend', 'data', 'db.json')),
  
  // Security sandbox switches
  allowUnsafeLocalExecution: process.env.ALLOW_UNSAFE_LOCAL_EXECUTION === 'true',
  enableDevTokens: process.env.ENABLE_DEV_TOKENS === 'true',
  behindProxy: process.env.BEHIND_PROXY === 'true',
  adminSeedPassword: process.env.ADMIN_SEED_PASSWORD || '',

  // Email settings
  resendApiKey: process.env.RESEND_API_KEY || '',
  smtp: {
    host: process.env.SMTP_HOST || '',
    port: parseInt(process.env.SMTP_PORT || '587', 10),
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || '',
  },
  fromEmail: process.env.FROM_EMAIL || 'no-reply@prismcode.dev',

  // OnlineCompiler.io Code Execution Engine
  onlineCompilerApiKey: process.env.ONLINECOMPILER_API_KEY || '',
  onlineCompilerApiUrl: process.env.ONLINECOMPILER_API_URL || 'https://api.onlinecompiler.io/api/run-code-sync/',

  // Daily Free Tier Execution Quotas (per calendar day UTC)
  dailyExecutionLimitFree: parseInt(process.env.DAILY_EXECUTION_LIMIT_FREE || process.env.MAX_DAILY_RUNS_PER_USER || '50', 10),
  dailyExecutionLimitGuest: parseInt(process.env.DAILY_EXECUTION_LIMIT_GUEST || '20', 10),
  dailyExecutionLimitPro: parseInt(process.env.DAILY_EXECUTION_LIMIT_PRO || '250', 10),
  dailyExecutionLimitPremium: parseInt(process.env.DAILY_EXECUTION_LIMIT_PREMIUM || '1000', 10),

  // Judge / Execution settings
  judge0ApiKey: process.env.JUDGE0_API_KEY || '',
  judge0ApiUrl: process.env.JUDGE0_API_URL || 'https://judge0-ce.p.rapidapi.com',

  // Gemini AI assistant settings
  geminiApiKey: process.env.GEMINI_API_KEY || '',

  // Clerk authentication settings
  clerkPublishableKey: process.env.CLERK_PUBLISHABLE_KEY || '',
  clerkSecretKey: process.env.CLERK_SECRET_KEY || '',
};
