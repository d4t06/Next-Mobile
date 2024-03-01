import { publicRequest } from "@/utils/request";
import NextAuth, { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

const BACKEND_API_ENDPOINT = "http:///localhost:4000/api/auth/login";

export const nextAuthOptions: NextAuthOptions = {
   providers: [
      Credentials({
         type: "credentials",
         credentials: {
            username: {
               label: "User name",
               type: "text",
            },
            password: {
               label: "password",
               type: "password",
            },
         },
         async authorize(credentials, req) {
            if (!credentials?.username || !credentials?.password) {
               return null;
            }

            const { password, username } = credentials;

            const res = await fetch(BACKEND_API_ENDPOINT, {
               method: "POST",
               body: JSON.stringify({
                  username,
                  password,
               }),
               headers: {
                  "Content-type": "application/json",
               },
            });

            if (!res.ok) return null;

            const user = await res.json();

            return user;
         },
      }),
   ],
   pages: {
      signIn: "/signin",
   },
   callbacks: {
      async jwt({ token, user }) {
         // token {iat: '', exp: ''...}
         // user {token: '', user: {name: ''}}
         if (user) return { ...token, ...user };

         return token;
      },

      async session({ token, session }) {
         session.user.name = token.user.name;
         session.user.role = token.user.role;
         session.token = token.token;

         return session;
      },
   },
};

const handler = NextAuth(nextAuthOptions);

export { handler as GET, handler as POST };
