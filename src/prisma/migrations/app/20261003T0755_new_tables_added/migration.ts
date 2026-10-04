#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/717a8ea04b39a80cd02f819b593b3fb524a9f6c9f90b6a7820892813627d9842/contract';
import endContract from '../../snapshots/717a8ea04b39a80cd02f819b593b3fb524a9f6c9f90b6a7820892813627d9842/contract.json' with { type: 'json' };
import {
  Migration,
  MigrationCLI,
  checkExpression,
  col,
  fn,
  lit,
  primaryKey,
} from '@prisma/orm-postgres/migration';

export default class M extends Migration<never, End> {
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.createSchema({ schema: 'public' }),
      this.createTable({
        schema: 'public',
        table: 'movie',
        columns: [
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('createdBy', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('genres', 'text[]', {
            notNull: true,
            default: lit([]),
            codecRef: { codecId: 'pg/text@1', many: true },
          }),
          col('id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('overview', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('posterUrl', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('releaseYear', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('runtime', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
          col('title', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [
          primaryKey(['id']),
          checkExpression(
            'movie_genres_elem_not_null_6dc02271',
            'array_position("genres", NULL) IS NULL',
          ),
        ],
      }),
      this.createTable({
        schema: 'public',
        table: 'user',
        columns: [
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('email', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('name', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('password', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'watchListItem',
        columns: [
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('movieId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('notes', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('rating', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
          col('status', 'text', {
            notNull: true,
            default: lit('PLANNED'),
            codecRef: { codecId: 'pg/text@1' },
          }),
          col('updatedAt', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('userId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [
          primaryKey(['id']),
          checkExpression(
            'watchListItem_status_check_96b071fd',
            "\"status\" IN ('PLANNED', 'WATCHING', 'COMPLETED', 'DROPPED')",
          ),
        ],
      }),
      this.addUnique({
        schema: 'public',
        table: 'user',
        constraint: 'user_email_key',
        columns: ['email'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'movie',
        index: 'movie_createdBy_idx_ba0f792f',
        columns: ['createdBy'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'watchListItem',
        index: 'watchListItem_movieId_idx_8cb9f9db',
        columns: ['movieId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'watchListItem',
        index: 'watchListItem_userId_idx_a489d58a',
        columns: ['userId'],
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'movie',
        foreignKey: {
          name: 'movie_createdBy_fkey',
          columns: ['createdBy'],
          references: { schema: 'public', table: 'user', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'watchListItem',
        foreignKey: {
          name: 'watchListItem_userId_fkey',
          columns: ['userId'],
          references: { schema: 'public', table: 'user', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'watchListItem',
        foreignKey: {
          name: 'watchListItem_movieId_fkey',
          columns: ['movieId'],
          references: { schema: 'public', table: 'movie', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
