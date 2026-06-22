import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { createUser } from "@/lib/users-store";
import { createSession } from "@/lib/session-store";
import { toPublicUser } from "@/lib/types/user";

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

async function notifyTelegramRegistration(data: {
  firstName: string;
  lastName: string;
  email: string;
  message?: string;
}) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return;

  const text = [
    "🆕 <b>New User Registration</b>",
    "",
    `<b>Name:</b> ${escapeHtml(data.firstName)} ${escapeHtml(data.lastName)}`,
    `<b>Email:</b> ${escapeHtml(data.email)}`,
    data.message
      ? `<b>Message:</b> ${escapeHtml(data.message)}`
      : "",
  ]
    .filter(Boolean)
    .join("\n");

  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: "HTML",
    }),
  }).catch(() => {});
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, password, message } = body;

    if (!firstName?.trim() || !lastName?.trim() || !email?.trim() || !password) {
      return NextResponse.json(
        { error: "First name, last name, email and password are required." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters." },
        { status: 400 }
      );
    }

    const passwordHash = await bcrypt.hash(password, 10);

    let user;
    try {
      user = await createUser({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        passwordHash,
        message: message?.trim() || undefined,
      });
    } catch (err) {
      if (err instanceof Error && err.message === "EMAIL_EXISTS") {
        return NextResponse.json(
          { error: "This email is already registered. Please sign in." },
          { status: 409 }
        );
      }
      throw err;
    }

    await notifyTelegramRegistration({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      message: user.message,
    });

    const sessionToken = createSession(user.id);

    return NextResponse.json({
      user: toPublicUser(user),
      token: sessionToken,
    });
  } catch (error) {
    console.error("Register error:", error);
    return NextResponse.json(
      { error: "Registration failed. Please try again." },
      { status: 500 }
    );
  }
}
