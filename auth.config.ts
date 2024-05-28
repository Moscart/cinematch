import type { NextAuthConfig } from "next-auth";
import credentials from "next-auth/providers/credentials";
import { NextResponse } from "next/server";

export const authConfig = {
  pages: {
    signIn: "/admin/login",
    signOut: "/admin/logout",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/admin");
      if (isLoggedIn && nextUrl.pathname === "/admin/login") {
        return NextResponse.redirect(new URL("/admin", nextUrl));
      }
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return NextResponse.redirect(new URL("/admin", nextUrl));
      }
      return true;
    },
  },
  providers: [credentials({})],
} satisfies NextAuthConfig;
