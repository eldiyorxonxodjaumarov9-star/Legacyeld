import { promises as fs } from "fs";
import path from "path";
import type { User } from "@/lib/types/user";

const DATA_DIR = path.join(process.cwd(), "data");
const USERS_FILE = path.join(DATA_DIR, "users.json");

async function ensureDataFile(): Promise<User[]> {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    const raw = await fs.readFile(USERS_FILE, "utf-8");
    return JSON.parse(raw) as User[];
  } catch {
    await fs.writeFile(USERS_FILE, "[]", "utf-8");
    return [];
  }
}

async function saveUsers(users: User[]): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2), "utf-8");
}

export async function findUserByEmail(
  email: string
): Promise<User | undefined> {
  const users = await ensureDataFile();
  return users.find((u) => u.email.toLowerCase() === email.toLowerCase());
}

export async function findUserById(id: string): Promise<User | undefined> {
  const users = await ensureDataFile();
  return users.find((u) => u.id === id);
}

export async function createUser(
  data: Omit<User, "id" | "createdAt">
): Promise<User> {
  const users = await ensureDataFile();

  if (users.some((u) => u.email.toLowerCase() === data.email.toLowerCase())) {
    throw new Error("EMAIL_EXISTS");
  }

  const user: User = {
    id: `usr_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    ...data,
    email: data.email.toLowerCase(),
    createdAt: new Date().toISOString(),
  };

  users.push(user);
  await saveUsers(users);
  return user;
}
