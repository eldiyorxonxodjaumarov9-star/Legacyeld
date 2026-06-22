import { NextRequest, NextResponse } from "next/server";
import { extractToken, getUserFromToken } from "@/lib/session-store";

export async function GET(request: NextRequest) {
  const token = extractToken(
    request.headers.get("authorization"),
    request.headers.get("cookie")
  );

  const user = await getUserFromToken(token);

  if (!user) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  return NextResponse.json({ user });
}
