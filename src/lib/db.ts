import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { env } from "../../env";

import * as authSchemas from '../db/schemas/auth';

console.log(env.DATABASE_URL)

const pool = new Pool({
  connectionString: env.DATABASE_URL,
});

export const db = drizzle(pool, {
  logger: true,
  schema: {
    ...authSchemas,
  },
});
 