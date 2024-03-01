import nextAuth from "next-auth";

declare module "next-auth" {
   interface Session {
      user: {
         name: string;
         role: string;
      };
      token: string;
   }
}

declare module "next-auth/jwt" {
   interface JWT {
      user: {
         name: string;
         role: string;
      };
      token: string;
   }
}
