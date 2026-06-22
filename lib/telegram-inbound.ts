import {
  addBotMessage,
  getSessionByTelegramMessage,
  isTelegramMessageProcessed,
  markTelegramMessageProcessed,
} from "@/lib/chat-store";

export type TelegramInboundMessage = {
  message_id: number;
  text?: string;
  from?: { is_bot?: boolean; first_name?: string };
  reply_to_message?: {
    message_id: number;
    text?: string;
  };
  chat?: { id: number };
};

export function extractSessionId(text: string): string | undefined {
  const match = text.match(/Session:\s*(ls-[a-z0-9]+)/i);
  return match?.[1];
}

export function processAdminReply(msg: TelegramInboundMessage): boolean {
  if (!msg.text?.trim() || msg.from?.is_bot) {
    return false;
  }

  if (isTelegramMessageProcessed(msg.message_id)) {
    return false;
  }

  const configuredChatId = process.env.TELEGRAM_CHAT_ID;
  if (configuredChatId && String(msg.chat?.id) !== String(configuredChatId)) {
    return false;
  }

  // Skip bot notification copies
  if (
    msg.text.includes("Website Live Chat") &&
    msg.text.includes("Session:")
  ) {
    return false;
  }

  let sessionId: string | undefined;
  let replyText = msg.text.trim();

  if (msg.reply_to_message) {
    sessionId = getSessionByTelegramMessage(msg.reply_to_message.message_id);

    if (!sessionId && msg.reply_to_message.text) {
      sessionId = extractSessionId(msg.reply_to_message.text);
    }
  }

  if (!sessionId) {
    const directMatch = replyText.match(/^#?(ls-[a-z0-9]+)\s+([\s\S]+)$/i);
    if (directMatch) {
      sessionId = directMatch[1];
      replyText = directMatch[2].trim();
    }
  }

  if (sessionId && replyText) {
    addBotMessage(sessionId, replyText);
    markTelegramMessageProcessed(msg.message_id);
    return true;
  }

  return false;
}

declare global {
  // eslint-disable-next-line no-var
  var __lastTelegramUpdateId: number | undefined;
}

export async function pollTelegramReplies(): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) return;

  const offset = (globalThis.__lastTelegramUpdateId ?? 0) + 1;

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${token}/getUpdates?offset=${offset}&timeout=0&allowed_updates=["message"]`
    );
    const data = await response.json();

    if (!data.ok) {
      return;
    }

    for (const update of data.result ?? []) {
      globalThis.__lastTelegramUpdateId = update.update_id;
      if (update.message) {
        processAdminReply(update.message);
      }
    }
  } catch {
    // ignore polling errors
  }
}
