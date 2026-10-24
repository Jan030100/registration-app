import 'dotenv/config';

function readEnv(key: string, fallback?: string): string {
  const value = process.env[key] ?? fallback;
  if (value === undefined) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
}

export const env = {
  port: Number(readEnv('PORT', '3001')),
  corsOrigin: readEnv('CORS_ORIGIN', 'http://localhost:5173'),
  databaseUrl: readEnv('DATABASE_URL', 'file:./prisma/dev.db'),
  nodeEnv: readEnv('NODE_ENV', 'development'),
} as const;