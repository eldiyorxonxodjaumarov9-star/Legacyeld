import { NextRequest, NextResponse } from "next/server";

interface ContactPayload {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function formatTelegramMessage(data: ContactPayload): string {
  return [
    "📩 <b>New Contact Form Submission</b>",
    "",
    `<b>Name:</b> ${escapeHtml(data.firstName)} ${escapeHtml(data.lastName)}`,
    `<b>Email:</b> ${escapeHtml(data.email)}`,
    "",
    "<b>Message:</b>",
    escapeHtml(data.message),
    "",
    `<i>Legacy Safety Solutions — ${new Date().toLocaleString("en-US", { timeZone: "America/Los_Angeles" })}</i>`,
  ].join("\n");
}

export async function POST(request: NextRequest) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.error("Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID");
    return NextResponse.json(
      { error: "Telegram bot is not configured." },
      { status: 500 }
    );
  }

  let body: ContactPayload;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { firstName, lastName, email, message } = body;

  if (!firstName?.trim() || !lastName?.trim() || !email?.trim() || !message?.trim()) {
    return NextResponse.json(
      { error: "All fields are required." },
      { status: 400 }
    );
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
  }

  const telegramUrl = `https://api.telegram.org/bot${token}/sendMessage`;

  try {
    const response = await fetch(telegramUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: String(chatId),
        text: formatTelegramMessage({
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email: email.trim(),
          message: message.trim(),
        }),
        parse_mode: "HTML",
      }),
    });

    const result = await response.json();

    if (!response.ok || !result.ok) {
      console.error("Telegram API error:", result);
      return NextResponse.json(
        { error: "Failed to send message. Please try again." },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Telegram send error:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 }
    );
  }
}
