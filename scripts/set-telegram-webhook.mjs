import { readFileSync } from "fs";
import { resolve } from "path";

function loadEnv() {
  try {
    const raw = readFileSync(resolve(process.cwd(), ".env.local"), "utf-8");
    for (const line of raw.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eq = trimmed.indexOf("=");
      if (eq === -1) continue;
      process.env[trimmed.slice(0, eq).trim()] ??= trimmed.slice(eq + 1).trim();
    }
  } catch {
    // use existing env
  }
}

loadEnv();

const token = process.env.TELEGRAM_BOT_TOKEN;
const webhookUrl =
  process.argv[2] ||
  "https://legacy-safety-solutions.vercel.app/api/chat/webhook";

if (!token) {
  console.error("TELEGRAM_BOT_TOKEN missing");
  process.exit(1);
}

const res = await fetch(
  `https://api.telegram.org/bot${token}/setWebhook?url=${encodeURIComponent(webhookUrl)}`
);
const data = await res.json();
console.log(JSON.stringify(data, null, 2));
