import { NextRequest, NextResponse } from "next/server";
import { auth } from "./auth";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const user = await auth();
  if (!user) {
    return NextResponse.redirect(
      new URL("/auth/login", request.nextUrl.origin),
    );
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Single matcher that excludes all the routes you don't want middleware to run on
    "/((?!_next/|api/auth/|auth/login|auth/register|favicon\\.ico|notification-sw\\.js).*)",
  ],
};
