import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

const CLIENT_TOKEN_EXPIRE = 60 * 60; //1h

export const nextAuthOptions: NextAuthOptions = {
  providers: [
    Credentials({
      type: "credentials",
      credentials: {
        username: {},
        password: {},
      },
      async authorize(credentials, req) {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        const { password, username } = credentials;

        const res = await fetch(
          `${
            process.env.NEXT_PUBLIC_API_ENDPOINT ||
            "https://nest-mobile.vercel.app/api"
          }/auth/login`,
          {
            method: "POST",
            body: JSON.stringify({
              username,
              password,
            }),
            headers: {
              "Content-type": "application/json",
            },
          },
        );

        if (!res.ok) throw new Error("");

        const user = await res.json();

        return user;
      },
    }),
  ],
  session: {
    // default
    strategy: "jwt",
    maxAge: 86400 * 2, //2day
  },

  pages: {
    signIn: "/signin",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user)
        return {
          user: {
            name: user.user.name,
            role: user.user.role,
          },
          token: user.token,
          error: "",
          tokenExpired: Date.now() + CLIENT_TOKEN_EXPIRE * 1000,
        };

      if (token.tokenExpired > Date.now()) return { ...token, error: "" };

      return { ...token, error: "Token Expired" };
    },

    // if use role in client component
    async session({ token, session }) {
      session.user.name = token.user.name;
      session.user.role = token.user.role;
      session.token = token.token;
      session.error = token.error;

      return session;
    },
  },
};
