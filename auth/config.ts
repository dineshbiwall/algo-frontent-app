import { env } from "@/env";
import { User as UserEntity } from "@/types/entities/user.entity";
import { CredentialsSignin, User, type NextAuthConfig } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import { ApiResponse } from "../types/api";

interface SignInResponse extends UserEntity {
  token: string;
}

class InvalidLoginError extends CredentialsSignin {
  code = "Invalid identifier or password";
}

export const options: Omit<NextAuthConfig, "providers"> = {
  session: {
    strategy: "jwt",
  },
  callbacks: {
    jwt: async ({ token, user }: { token: JWT; user?: User }) => {
      if (user) {
        const { accessToken, ..._u } = user;
        token.user = _u as UserEntity;
        token.accessToken = accessToken;
      }
      return token;
    },
    session: ({ session, token }) => {
      if (token.user) {
        session.user = {
          ...token.user,
          emailVerified: null, // or new Date() if email is verified
        };
      }
      session.accessToken = token.accessToken as string;
      return session;
    },
  },
  // pages: {
  //   signIn: AuthRoutes.Login,
  //   error: AuthRoutes.Login,
  //   newUser: AuthRoutes.SignUp,
  //   signOut: AuthRoutes.Logout,
  // },
  events: {
    async signOut(message) {
      try {
        if ("token" in message && message.token) {
          console.log("User signed out:", message.token.user?.email);
        }
      } catch (error) {}
    },
  },
  // debug: true,
};

export const authConfig: NextAuthConfig = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      type: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        try {
          const endpoint = `${env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/login`;

          const response = await fetch(endpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
              ipAddress: "192.168.0.0",
            }),
          });

          if (!response.ok) {
            const error = await response.json();
            throw error; // or handle the error as you prefer
          }

          const { data } =
            (await response.json()) as ApiResponse<SignInResponse>;

          const { token, ...user } = data;

          return { ...user, id: user.id, accessToken: token };
        } catch (error) {
          console.error("Error during sign-in:", error);
          throw new InvalidLoginError();
        }
      },
    }),
  ],
  ...options,
} satisfies NextAuthConfig;
