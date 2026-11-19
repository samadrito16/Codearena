import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

export const config = {
  port: parseInt(process.env.PORT || '8000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  isProduction: process.env.NODE_ENV === 'production',
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173',
  sessionSecret: process.env.SESSION_SECRET || 'codearena_default_session_secret_change_me',
  sessionExpiryDays: parseInt(process.env.SESSION_EXPIRY_DAYS || '7', 10),
  cookieName: 'codearena_session',
  dbPath: path.resolve(process.cwd(), 'data', 'db.json'),
  
  // Email settings
  resendApiKey: process.env.RESEND_API_KEY || '',
  smtp: {
    host: process.env.SMTP_HOST || '',
    port: parseInt(process.env.SMTP_PORT || '587', 10),
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || '',
  },
  fromEmail: process.env.FROM_EMAIL || 'no-reply@codearena.dev',

  // OnlineCompiler.io Code Execution Engine
  onlineCompilerApiKey: process.env.ONLINECOMPILER_API_KEY || '',
  onlineCompilerApiUrl: process.env.ONLINECOMPILER_API_URL || 'https://api.onlinecompiler.io/api/run-code-sync/',

  // Judge / Execution settings
  judge0ApiKey: process.env.JUDGE0_API_KEY || '',
  judge0ApiUrl: process.env.JUDGE0_API_URL || 'https://judge0-ce.p.rapidapi.com',

  // Gemini AI assistant settings
  geminiApiKey: process.env.GEMINI_API_KEY || '',

  // Clerk authentication settings
  clerkPublishableKey: process.env.CLERK_PUBLISHABLE_KEY || '',
  clerkSecretKey: process.env.CLERK_SECRET_KEY || '',
};
