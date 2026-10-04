// src/prisma/logger.js
import { lints } from '@prisma/orm-postgres/family-runtime';

export function queryLogger(levels = ['query', 'error']) {
  const middlewareStack = [];

  // 1. If 'warn' is in the levels array, add Prisma's built-in linter first
  if (levels.includes('warn')) {
    middlewareStack.push(lints());
  }

  // 2. Add your custom query logger to the stack
  middlewareStack.push({
    name: 'query-logger',

    // Log reads before they hit the database
    async beforeQuery(plan) {
      if (levels.includes('query')) {
        console.log(`[Prisma Query] ${plan.sql}`);
      }
    },

    // Catch read failures
    async afterQuery(plan, result) {
      if (!result.completed && levels.includes('error')) {
        console.error(`[Prisma Error] Query failed · ${plan.sql}`);
      }
    },

    // Log writes before execution
    async beforeExecute(plan) {
      if (levels.includes('query')) {
        console.log(`[Prisma Write] ${plan.sql}`);
      }
    },

    // Catch write failures
    async afterExecute(plan, result) {
      if (!result.completed && levels.includes('error')) {
        console.error(`[Prisma Error] Execution failed · ${plan.sql}`);
      }
    },
  });

  // Return the array containing the active middleware
  return middlewareStack;
}