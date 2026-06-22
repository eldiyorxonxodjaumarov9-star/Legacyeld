import { NextRequest, NextResponse } from "next/server";
import {
  addUserMessage,
  linkTelegramMessage,
} from "@/lib/chat-store";
import { extractToken, getUserFromToken } from "@/lib/session-store";

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export async function POST(request: NextRequest) {
  const authToken = extractToken(
    request.headers.get("authorization"),
    request.headers.get("cookie")
  );
  const user = await getUserFromToken(authToken);

  if (!user) {
    return NextResponse.json(
      { error: "Please register or sign in to use chat." },
      { status: 401 }
    );
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    return NextResponse.json(
      { error: "Telegram bot is not configured." },
      { status: 500 }
    );
  }

  let body: { sessionId?: string; message?: string };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const { sessionId, message } = body;

  if (!sessionId?.trim() || !message?.trim()) {
    return NextResponse.json(
      { error: "Session ID and message are required." },
      { status: 400 }
    );
  }

  const trimmed = message.trim();
  if (trimmed.length > 2000) {
    return NextResponse.json({ error: "Message too long." }, { status: 400 });
  }

  const chatMessage = addUserMessage(sessionId.trim(), trimmed);

  const userName = `${user.firstName} ${user.lastName}`.trim();

  const telegramText = [
    "💬 <b>Website Live Chat</b>",
    "",
    `👤 <b>Name:</b> ${escapeHtml(userName)}`,
    `📧 <b>Email:</b> ${escapeHtml(user.email)}`,
    `🆔 <b>Session:</b> <code>${escapeHtml(sessionId.trim())}</code>`,
    "",
    `<b>Message:</b> ${escapeHtml(trimmed)}`,
    "",
    "<i>↩️ Reply to this message to answer the client</i>",
  ].join("\n");

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: String(chatId),
          text: telegramText,
          parse_mode: "HTML",
        }),
      }
    );

    const result = await response.json();

    if (!response.ok || !result.ok) {
      console.error("Telegram chat send error:", result);
      return NextResponse.json(
        { error: "Failed to send message." },
        { status: 502 }
      );
    }

    if (result.result?.message_id) {
      linkTelegramMessage(result.result.message_id, sessionId.trim());
    }

    return NextResponse.json({
      success: true,
      message: chatMessage,
    });
  } catch (error) {
    console.error("Chat send error:", error);
    return NextResponse.json(
      { error: "Failed to send message." },
      { status: 500 }
    );
  }
}
