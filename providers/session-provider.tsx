"use client";
import { useAuth } from "@/stores/use-auth-store";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type ReactNode, useEffect } from "react";

interface Props {
  children: ReactNode;
  session?: Session | null;
}

function AuthSessionProvider({ children, session }: Props) {
  const { setToken, setUserId } = useAuth();

  useEffect(() => {
    if (session?.accessToken) {
      setToken(session.accessToken);
    } else {
      setToken(null);
    }

    if (session?.user?.id) {
      setUserId(session.user.id);
    } else {
      setUserId(null);
    }
  }, [setToken, setUserId, session]);

  return (
    <SessionProvider session={session} refetchOnWindowFocus={false}>
      {children}
    </SessionProvider>
  );
}

export default AuthSessionProvider;
