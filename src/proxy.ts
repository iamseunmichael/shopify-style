import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

const publicRoutes = [
  "/api/auth/login",
  "/api/auth/register"
];

export function proxy(req: NextRequest) {

  const { pathname } = req.nextUrl;

  // Allow public auth routes
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  const token = req.cookies.get("token")?.value;

  // Protect API routes
  if (pathname.startsWith("/api")) {

    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized Access" },
        { status: 401 }
      );
    }

    try {
      jwt.verify(token, process.env.JWT_SECRET!);
    } catch {
      return NextResponse.json(
        { error: "Invalid Token" },
        { status: 401 }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*"],
};