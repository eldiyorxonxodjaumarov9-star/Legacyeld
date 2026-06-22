import { NextRequest, NextResponse } from "next/server";
import { processAdminReply } from "@/lib/telegram-inbound";

interface TelegramUpdate {
  message?: Parameters<typeof processAdminReply>[0];
}

export async function POST(request: NextRequest) {
  const webhookSecret = process.env.TELEGRAM_WEBHOOK_SECRET;
  const headerSecret = request.headers.get("x-telegram-bot-api-secret-token");

  if (webhookSecret && headerSecret !== webhookSecret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let update: TelegramUpdate;

  try {
    update = await request.json();
  } catch {
    return NextResponse.json({ ok: true });
  }

  if (update.message) {
    processAdminReply(update.message);
  }

  return NextResponse.json({ ok: true });
}
