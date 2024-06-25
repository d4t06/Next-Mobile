import NextAuth from "next-auth";
import { nextAuthOptions } from "./authOption";

const handler = NextAuth(nextAuthOptions);

export { handler as GET, handler as POST };
