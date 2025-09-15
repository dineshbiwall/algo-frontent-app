"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { signOut } from "next-auth/react";
import { useEffect } from "react";

export default function SignOut() {
  useEffect(() => {
    (() => {
      signOut({
        redirect: true,
        callbackUrl: "/auth/login",
      });
    })();
  }, []);

  return (
    <Card className="gap-4">
      <CardContent>
        <div className="flex items-center space-x-2 justify-center">
          <Loader2 className="h-4 w-4 animate-spin" />
          <p className="text-sm text-muted-foreground">Logging out...</p>
        </div>
      </CardContent>
    </Card>
  );
}
