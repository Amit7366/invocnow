// src/types/next-auth.d.ts

import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    googleIdToken?: string;
    user: {
      id?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    googleIdToken?: string;
  }
}


// import NextAuth from "next-auth";

// declare module "next-auth" {
//   interface Session {
//     accessToken?: string;
//     user?: {
//       id?: string;
//       email?: string | null;
//       name?: string | null;
//       image?: string | null;
//       role?: string;
//     };
//   }
// }

// declare module "next-auth/jwt" {
//   interface JWT {
//     accessToken?: string;
//     user?: any;
//   }
// }
