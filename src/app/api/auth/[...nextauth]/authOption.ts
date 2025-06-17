import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

// const CLIENT_TOKEN_EXPIRE = 60 * 60; //1h

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
            process.env.NEXT_PUBLIC_API_ENDPOINT || "https://nest-mobile.vercel.app/api"
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

        const payload = await res.json();

        return payload;
      },
    }),
  ],
  session: {
    // default
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 28
  },

  pages: {
    signIn: "/signin",
  },
  callbacks: {
    async jwt({ token, user: loginPayload }) {
      if (loginPayload) {
        // console.log("jwt, check login payload", loginPayload);
        return {
          user: {
            name: loginPayload.user.name,
            role: loginPayload.user.role,
          },
          refreshToken: loginPayload.refresh_token,
          token: loginPayload.token,
        };
      }

      // console.log("jwt, check token", token);

      return token;
    },

    // for client side
    async session({ token, session }) {
      session.user.name = "asfsadfadsf";
      session.user.role = token.user.role;
      session.token = token.token;
      session.refreshToken = token.refreshToken;

      return session;
    },
  },
};
