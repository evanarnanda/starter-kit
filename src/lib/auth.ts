import { encodeBase32LowerCaseNoPadding, encodeHexLowerCase } from "@oslojs/encoding";
import { type User, type Session, sessionTable, userTable } from "../db/schemas/auth";
import { sha256 } from "@oslojs/crypto/sha2";
import { db } from "./db";
import { eq } from "drizzle-orm";

export function generateIdFromEntropySize(size: number): string {
	const buffer = crypto.getRandomValues(new Uint8Array(size));
	return encodeBase32LowerCaseNoPadding(buffer);
}


export function generateSessionToken(): string {
  const bytes = new Uint8Array(20);
  crypto.getRandomValues(bytes);
  const token = encodeBase32LowerCaseNoPadding(bytes);
  return token;
}

export async function createSession(token: string, userId: string): Promise<Session> {
  
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
  const session: Session = {
    id: sessionId,
    userId,
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)
  };
  
  await db.insert(sessionTable).values(session);
  
  return session;
}

export async function validateSessionToken(token: string): Promise<SessionValidationResult> {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));

  const result = await db
  .select({ user: userTable, session: sessionTable })
  .from(sessionTable)
  .innerJoin(userTable, eq(sessionTable.userId, userTable.id))
  .where(eq(sessionTable.id, sessionId));

  if (result.length === 0) {
    return { session: null, user: null };
  }

  const { user, session } = result[0];

  if (Date.now() >= session.expiresAt.getTime()) {
    await db.delete(sessionTable).where(eq(sessionTable.id, sessionId));
    return { session: null, user: null };
  }

  if (Date.now() >= session.expiresAt.getTime() - 1000 * 60 * 60 * 24 * 15) { 
    session.expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);
    await db
        .update(sessionTable)
        .set({
          expiresAt: session.expiresAt
        })
        .where(eq(sessionTable.id, sessionId));
  }
  return { session, user };
}

export type SessionValidationResult = 
    { session: Session; user: User } | 
    { session: null; user: null };

export async function invalidateSession(sessionId: string): Promise<SessionInvalidationResult> {
  const result = await db.delete(sessionTable).where(eq(sessionTable.id, sessionId)).returning({ deletedId: sessionTable.id });
  if (result.length === 0) {
    return { deletedId: null };
  }
  return { deletedId: result[0].deletedId };
}

export type SessionInvalidationResult =
  { deletedId: string } | 
  { deletedId: null };