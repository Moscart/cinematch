import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const admin = await prisma.admin.findFirst({
          where: {
            email: credentials.email as string,
          },
        });

        if (!admin) {
          return null;
        }

        const passwordsMatch = await bcrypt.compare(
          credentials.password,
          admin.password
        );
        if (!passwordsMatch) {
          return null;
        }

        return admin;
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
  },
});
