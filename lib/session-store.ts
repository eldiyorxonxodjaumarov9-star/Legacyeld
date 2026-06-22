import { randomBytes } from "crypto";
import type { PublicUser } from "@/lib/types/user";
import { findUserById } from "@/lib/users-store";

type Session = {
  userId: string;
  createdAt: number;
};

declare global {
  // eslint-disable-next-line no-var
  var __legacySessions: Map<string, Session> | undefined;
}

function getSessions(): Map<string, Session> {
  if (!globalThis.__legacySessions) {
    globalThis.__legacySessions = new Map();
  }
  return globalThis.__legacySessions;
}

export function createSession(userId: string): string {
  const token = randomBytes(32).toString("hex");
  getSessions().set(token, { userId, createdAt: Date.now() });
  return token;
}

export function deleteSession(token: string): void {
  getSessions().delete(token);
}

export async function getUserFromToken(
  token: string | null | undefined
): Promise<PublicUser | null> {
  if (!token) return null;

  const session = getSessions().get(token);
  if (!session) return null;

  const user = await findUserById(session.userId);
  if (!user) {
    getSessions().delete(token);
    return null;
  }

  const { passwordHash: _, ...publicUser } = user;
  return publicUser;
}

export function extractToken(
  authHeader: string | null,
  cookieHeader: string | null
): string | null {
  if (authHeader?.startsWith("Bearer ")) {
    return authHeader.slice(7);
  }
  if (cookieHeader) {
    const match = cookieHeader.match(/legacy-auth=([^;]+)/);
    if (match) return match[1];
  }
  return null;
}
