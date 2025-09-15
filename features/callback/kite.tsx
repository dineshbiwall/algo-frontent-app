"use client";
import { Card, CardContent } from "@/components/ui/card";
import { useKiteRequestTokenMutation } from "@/hooks/api/use-kite-request-token-mutation";
import { Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export default function KiteCallback() {
  const searchParams = useSearchParams();
  const { mutateAsync } = useKiteRequestTokenMutation();

  const router = useRouter();

  useEffect(() => {
    const request_token = searchParams.get("request_token");
    if (request_token) {
      mutateAsync({ request_token })
        .then(() => {
          toast.success("Kite account linked successfully!");
          router.push("/");
        })
        .catch((error) => toast.error(error.message));
    }
  }, [searchParams]);

  return (
    <Card className="gap-4">
      <CardContent>
        <div className="flex items-center space-x-2 justify-center">
          <Loader2 className="h-4 w-4 animate-spin" />
          <p className="text-sm text-muted-foreground">
            Linking your account. please wait...
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
