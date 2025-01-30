import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function middleware(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value;

    const protectedRoutes = ["/", "/usermanagement"];

    if (protectedRoutes.includes(request.nextUrl.pathname)) {
      if (!token) {
        return NextResponse.redirect(new URL("/login", request.url));
      }
      await axios.get(`${request.nextUrl.origin}/api/auth`, {
        headers: { Authorization: token },
      });
    }

    return NextResponse.next();
  } catch (err) {
    console.log(err)
  }
}

export const config = {
  matcher: ["/", "/dashboard/:path*", "/usermanagement/:path*"],
};
