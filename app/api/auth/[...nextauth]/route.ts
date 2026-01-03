import NextAuth, { type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account?.provider === "google") {
        // Google ID token for backend verification
        (token as any).googleIdToken = account.id_token;

        // profile.sub is Google's stable user id
        const sub = (profile as any)?.sub;
        if (sub) token.sub = sub;
      }
      return token;
    },
    async session({ session, token }) {
      (session.user as any).id = token.sub;
      (session as any).googleIdToken = (token as any).googleIdToken;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
