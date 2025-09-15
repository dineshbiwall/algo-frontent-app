import { env } from "@/env";
import { useLinkTelegramMutation } from "@/hooks/api/use-link-telegram-mutation";
import { useMyProfileQuery } from "@/hooks/api/use-my-profile-query";
import { IconChecks } from "@tabler/icons-react";
import { LoginButton, TelegramAuthData } from "@telegram-auth/react";
import { Loader2 } from "lucide-react";
import { Fragment } from "react";
import { toast } from "sonner";

export default function TelegramButton({
  showSuccessToast,
}: {
  showSuccessToast: boolean;
}) {
  const { mutateAsync, isPending } = useLinkTelegramMutation();
  const { data: profile, status, refetch } = useMyProfileQuery();

  const handleAuthCallback = async (payload: TelegramAuthData) => {
    try {
      const { message } = await mutateAsync(payload);
      await refetch();
      toast.success(message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Fragment>
      {isPending || status === "pending" ? (
        <Loader2 className="animate-spin" size={30} />
      ) : (
        <Fragment>
          {profile?.telegram ? (
            <Fragment>
              {showSuccessToast ? (
                <div className="rounded-md bg-green-50 p-4">
                  <div className="flex items-start">
                    <IconChecks className="text-green-800" />
                    <div className="ml-3">
                      <p className="text-sm font-medium text-green-800">
                        Telegram linked
                      </p>
                      <p className="mt-1 text-sm text-green-700">
                        You have successfully linked your Telegram account
                        {profile?.telegram?.username
                          ? ` (@${profile.telegram.username})`
                          : ""}
                        .
                      </p>
                    </div>
                  </div>
                </div>
              ) : null}
            </Fragment>
          ) : (
            <LoginButton
              botUsername={env.NEXT_PUBLIC_TG_BOT}
              buttonSize="large"
              cornerRadius={5}
              showAvatar={true}
              lang="en"
              onAuthCallback={handleAuthCallback}
            />
          )}
        </Fragment>
      )}
    </Fragment>
  );
}
