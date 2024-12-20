import nextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      name: string;
      role: string;
    };
    token: string;
    error: string
  }

  interface User {
    token: string;
    user: {
      name: string;
      role: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: {
      name: string;
      role: string;
    };
    token: string;
    error: string;
    tokenExpired: number;
  }
}
