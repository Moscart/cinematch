import type { NextAuthConfig } from "next-auth";
import { NextResponse } from "next/server";

export const authConfig = {
  pages: {
    signIn: "/auth/login",
    signOut: "/auth/logout",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/admin");
      if (isLoggedIn && nextUrl.pathname === "/auth/login") {
        return NextResponse.redirect(new URL("/admin", nextUrl));
      }
      if (
        !isLoggedIn &&
        (nextUrl.pathname === "/auth/logout" || isOnDashboard)
      ) {
        return false;
      }
      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
