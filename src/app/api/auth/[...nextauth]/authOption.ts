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
            process.env.NEXT_PUBLIC_API_ENDPOINT ||
            "https://nest-mobile-production.up.railway.app/api"
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
    maxAge: 60 * 60 * 24 * 28,
  },

  pages: {
    signIn: "/signin",
  },
  callbacks: {
    // token for persist auth
    // user is the response from login method
    // session is payload when call update()
    async jwt({ token, user: loginPayload, trigger, session }) {
      // console.log(
      //   ">>> jwt, login payload:",
      //   loginPayload,
      //   "\ntoken: ",
      //   token,
      //   "\nsession: ",
      //   session,
      //   "\ntrigger: ",
      //   trigger,
      // );

      switch (trigger) {
        case "signIn":
          return {
            user: {
              // username: loginPayload.user.username,
              // role: loginPayload.user.role,

              ...loginPayload.user,
            },
            refreshToken: loginPayload.refresh_token,
            token: loginPayload.token,
          };

        case "update": {
          Object.assign(token, session);
          break;
        }
      }

      return token;
    },

    // for client side
    async session({ token, session }) {
      // console.log(
      //   ">>> session, token: ",
      //   token,
      //   "\nsession: ",
      //   session,
      //   "\nnew session: ",
      //   newSession,
      //   "\ntrigger: ",
      //   trigger,
      // );

      Object.assign(session, token);

      return session;
    },
  },
};
