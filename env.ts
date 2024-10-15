import { z } from 'zod'

const envSchema = z.object({
  PORT: z.coerce.number().min(1000).default(3000),
  NODE_ENV: z.enum(
    [
      'development',
      'test',
      'production',
    ]
  ).default('development'),
  DATABASE_URL: z.string().default('postgres://user:password@localhost:5432/your_db'),
})
const envServer = envSchema.safeParse({
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  DATABASE_URL: process.env.DATABASE_URL,
});

if (!envServer.success) {
  console.error(envServer.error.issues);
  throw new Error('There is an error with the server environment variables');
  process.exit(1);
}

export const env = envServer.data;