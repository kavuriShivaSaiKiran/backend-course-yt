import 'dotenv/config';
import postgres from '@prisma/orm-postgres/runtime';
import contractJson from './contract.json' with { type: 'json' };
import { queryLogger } from './logger.js';

const logLevels = process.env.NODE_ENV === 'production' 
  ? ['error'] 
  : ['query', 'warn', 'error'];
  
// Initialize the Prisma 8 runtime using your pooled Neon connection
export const db = postgres({
  contractJson,
  url: process.env['DATABASE_URL'],
  middleware: [...queryLogger(logLevels)]
});

export async function gracefulShutdown(signal, err = null) {
  if (err) console.error(`[${signal}] Error:`, err);
  else console.log(`\n[${signal}] Initiating shutdown...`);

  try {
    console.log('Closing database connection...');
    await db.close();
    console.log('Database disconnected successfully.');
    process.exit(err ? 1 : 0);
  } catch (closeError) {
    console.error('Failed to close database cleanly:', closeError);
    process.exit(1);
  }
}