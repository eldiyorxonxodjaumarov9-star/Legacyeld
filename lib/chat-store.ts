export type ChatMessage = {
  id: string;
  sessionId: string;
  text: string;
  from: "user" | "bot";
  createdAt: number;
};

type ChatStore = {
  messages: ChatMessage[];
  telegramToSession: Map<number, string>;
  processedTelegramIds: Set<number>;
};

declare global {
  // eslint-disable-next-line no-var
  var __legacyChatStore: ChatStore | undefined;
}

function getStore(): ChatStore {
  if (!globalThis.__legacyChatStore) {
    globalThis.__legacyChatStore = {
      messages: [],
      telegramToSession: new Map(),
      processedTelegramIds: new Set(),
    };
  }
  return globalThis.__legacyChatStore;
}

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function addUserMessage(sessionId: string, text: string): ChatMessage {
  const store = getStore();
  const message: ChatMessage = {
    id: generateId(),
    sessionId,
    text,
    from: "user",
    createdAt: Date.now(),
  };
  store.messages.push(message);
  if (store.messages.length > 500) {
    store.messages = store.messages.slice(-500);
  }
  return message;
}

export function addBotMessage(sessionId: string, text: string): ChatMessage {
  const store = getStore();
  const message: ChatMessage = {
    id: generateId(),
    sessionId,
    text,
    from: "bot",
    createdAt: Date.now(),
  };
  store.messages.push(message);
  return message;
}

export function linkTelegramMessage(
  telegramMessageId: number,
  sessionId: string
): void {
  getStore().telegramToSession.set(telegramMessageId, sessionId);
}

export function getSessionByTelegramMessage(
  telegramMessageId: number
): string | undefined {
  return getStore().telegramToSession.get(telegramMessageId);
}

export function getMessagesSince(
  sessionId: string,
  since: number
): ChatMessage[] {
  return getStore().messages.filter(
    (m) => m.sessionId === sessionId && m.createdAt > since
  );
}

export function getAllSessionMessages(sessionId: string): ChatMessage[] {
  return getStore().messages.filter((m) => m.sessionId === sessionId);
}

export function isTelegramMessageProcessed(messageId: number): boolean {
  return getStore().processedTelegramIds.has(messageId);
}

export function markTelegramMessageProcessed(messageId: number): void {
  const store = getStore();
  store.processedTelegramIds.add(messageId);
  if (store.processedTelegramIds.size > 1000) {
    const arr = [...store.processedTelegramIds].slice(-500);
    store.processedTelegramIds = new Set(arr);
  }
}
