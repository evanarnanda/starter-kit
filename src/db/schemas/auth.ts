import pg from 'pg';
import { integer, pgTable, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core';
import { password } from 'bun';
import { InferSelectModel } from 'drizzle-orm';

export const userTable = pgTable('user', {
  id: serial('id').primaryKey(),
  email: varchar('email').unique().notNull(),
  password: varchar('password'),
})

export const sessionTable = pgTable('session', {
  id: text('id').primaryKey(),
  userId: integer('user_id')
  .notNull()
  .references(() => userTable.id),
  expiresAt: timestamp('expires_at', {
    withTimezone: true,
    mode: 'date'
  }).notNull(),
});


export type User = InferSelectModel<typeof userTable>;
export type Session = InferSelectModel<typeof sessionTable>;