import pg from 'pg';
import { integer, pgTable, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core';
import { InferSelectModel, max } from 'drizzle-orm';

export const userTable = pgTable('user', {
  id: varchar('id', { length: 36 }).primaryKey(),
  email: varchar('email').unique().notNull(),
  password: varchar('password'),
})

export const sessionTable = pgTable('session', {
  id: varchar('id', { length: 64 }).primaryKey(),
  userId: varchar('user_id', { length: 36 })
  .notNull()
  .references(() => userTable.id),
  expiresAt: timestamp('expires_at', {
    withTimezone: true,
    mode: 'date'
  }).notNull(),
});


export type User = InferSelectModel<typeof userTable>;
export type Session = InferSelectModel<typeof sessionTable>;