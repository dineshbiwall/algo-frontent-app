import { type User as UserEntity } from "@/types/entities/user.entity";

declare module "next-auth/jwt" {
  interface JWT {
    user: UserEntity;
    auth?: AdapterUser;
    refreshToken?: string;
    id: string;
    accessToken?: string;
    accessTokenExpires?: number;
    customToken?: string;
  }
}
declare module "next-auth" {
  interface Session {
    user: UserEntity;
    auth?: AdapterUser;
    refreshToken?: string;
    accessToken?: string;
    accessTokenExpires?: number;
    customToken?: string;
  }

  interface User {
    user?: UserEntity;
    refreshToken?: string;
    accessToken?: string;
    accessTokenExpires?: number;
    customToken?: string;
  }
}
