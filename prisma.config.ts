import 'dotenv/config';
import { definePrismaConfig } from 'prisma/config';
import { defineConfig as ormConfig } from '@prisma/orm-postgres/config';

export default definePrismaConfig({
  skills: { check: false },
  orm: ormConfig({
    contract: './src/prisma/contract.prisma',
    db: {
      // Use your direct URL here so the CLI commands pick it up natively
      connection: process.env['DIRECT_URL'] || process.env['DATABASE_URL']!,
    },
    migrations: {
      dir: './src/prisma/migrations',
    },
  }),
});