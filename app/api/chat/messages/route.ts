import { NextRequest, NextResponse } from "next/server";
import { getAllSessionMessages, getMessagesSince } from "@/lib/chat-store";
import { pollTelegramReplies } from "@/lib/telegram-inbound";

export async function GET(request: NextRequest) {
  const sessionId = request.nextUrl.searchParams.get("sessionId");
  const sinceParam = request.nextUrl.searchParams.get("since");

  if (!sessionId?.trim()) {
    return NextResponse.json({ error: "Session ID required." }, { status: 400 });
  }

  // Local dev: Telegram javoblarini getUpdates orqali olish (webhook shart emas)
  await pollTelegramReplies();

  const since = sinceParam ? Number(sinceParam) : 0;

  const messages =
    since > 0
      ? getMessagesSince(sessionId.trim(), since)
      : getAllSessionMessages(sessionId.trim());

  return NextResponse.json({ messages });
}
