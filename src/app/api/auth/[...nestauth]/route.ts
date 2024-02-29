import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export default NextAuth({
   session: {
      strategy: "jwt",
   },
   providers: [
      Credentials({
         type: "credentials",
         credentials: {},
         async authorize(credentials, req) {
            console.log(">>> check credential", credentials);
            return null;
         },
      }),
   ],
   pages: {
    signIn: '/auth/signin',
    newUser: '/auth/signup'
   }
});
