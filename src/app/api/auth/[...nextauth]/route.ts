import { publicRequest } from "@/utils/request";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

const LOGIN_URL = "/auth/login";

const handler = NextAuth({
   session: {
      strategy: "jwt",
   },
   providers: [
      Credentials({
         type: "credentials",
         credentials: {
            token: {},
         },
         authorize(credentials, req) {
            // if (!credentials?.token) {
            //    return null;
            // }

            return { id: "tset", name: 'nguyen huu dat', email: 'aslkasljd' };
         },
      }),
   ],
   pages: {
      signIn: "/signin",
   },
});

export { handler as GET, handler as POST };
