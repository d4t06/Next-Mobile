import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

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
               }
            );

            if (!res.ok) return null;

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

   callbacks: {
      async jwt({ token, user }) {
         if (user) return { ...token, ...user };
         return token;
      },

      // if use role in client component
      async session({ token, session, user }) {
         session.user.name = token.user.name;
         session.user.role = token.user.role;
         session.token = token.token;

         return session;
      },
   },
};
