import nextAuth from "next-auth";

declare module "next-auth" {
  // client session
  interface Session {
    user: {
      name: string;
      role: string;
    };
    token: string;
    refreshToken: string;
  }

  // login payload
  interface User {
    refresh_token: string;
    token: string;
    user: {
      name: string;
      role: string;
    };
  }
}

// extend token parameter in session callback
declare module "next-auth/jwt" {
  interface JWT {
    refreshToken: string;
    token: string;
    user: {
      name: string;
      role: string;
    };
  }
}
