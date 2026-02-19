import { NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Skip middleware for verify-email route

  if (pathname.startsWith("/verify-email")) {
    return NextResponse.next();
  }

  // Check for session token in cookies

  const sessionToken = request.cookies.get("__Secure-better-auth.session_token");

  //* User is not authenticated at all

  if (!sessionToken) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.search = ""; // optional: clean query
    return NextResponse.redirect(url);
  }

  // Allow access if session exists

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin-dashboard/:path*"],
};



// import { NextRequest, NextResponse } from "next/server";

// export async function middleware(request: NextRequest) {
//   const pathname = request.nextUrl.pathname;

//   if (pathname.startsWith("/verify-email")) {
//     return NextResponse.next();
//   }

//   const sessionToken =
//     request.cookies.get("__Secure-better-auth.session_token") ??
//     request.cookies.get("better-auth.session_token"); // fallback (local/dev)

//     console.log("Session token in middleware:", sessionToken);
//   if (!sessionToken) {
//     return NextResponse.redirect(new URL("/login", request.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/dashboard/:path*", "/admin-dashboard/:path*"],
// };