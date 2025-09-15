import { create } from "zustand";

interface OAuthProfile {
  id: string;
  accessToken?: string;
  accessTokenExpires?: number;
  refreshToken?: string;
}

export interface AuthStore {
  token: string | null;
  auth: OAuthProfile | null;
  userId: string | null;
  setToken: (token: string | null) => void;
  setAuth: (auth: OAuthProfile) => void;
  setUserId: (userId: string | null) => void;
}

export const useAuth = create<AuthStore>((set) => ({
  token: null,
  auth: null,
  userId: null,
  setToken: (token: string | null) => set({ token }),
  setAuth: (auth: OAuthProfile) => set({ auth }),
  setUserId: (userId: string | null) => set({ userId }),
}));
