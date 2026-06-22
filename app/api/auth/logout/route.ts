import { NextRequest, NextResponse } from "next/server";
import { deleteSession, extractToken } from "@/lib/session-store";

export async function POST(request: NextRequest) {
  const token = extractToken(
    request.headers.get("authorization"),
    request.headers.get("cookie")
  );

  if (token) {
    deleteSession(token);
  }

  return NextResponse.json({ success: true });
}
