"use client";

import { PasswordInput } from "@/components/password-input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useUpdateUserKiteKeyMutation } from "@/hooks/api/use-update-user-kite-key-mutation";
import { User } from "@/types/entities/user.entity";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { getQueryKey } from "../../../lib/react-query";

const formSchema = z.object({
  apiKey: z
    .string()
    .min(1, "API Key is required.")
    .transform((pwd) => pwd.trim()),
  apiSecret: z
    .string()
    .min(1, "API Secret is required.")
    .transform((pwd) => pwd.trim()),
});
type UserForm = z.infer<typeof formSchema>;

interface Props {
  currentRow?: User;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function UserKeyDialog({ currentRow, open, onOpenChange }: Props) {
  const queryClient = useQueryClient();
  const form = useForm<UserForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      apiKey: currentRow?.kiteConfig?.apiKey || "",
      apiSecret: currentRow?.kiteConfig?.apiSecret || "",
    },
  });

  const { mutateAsync, isPending } = useUpdateUserKiteKeyMutation();

  const onSubmit = async (values: UserForm) => {
    try {
      const { message } = await mutateAsync({
        apiKey: values.apiKey,
        apiSecret: values.apiSecret,
        id: currentRow?.id || "",
      });
      toast.success(message);
      form.reset();
      onOpenChange(false);
      queryClient.refetchQueries({
        queryKey: [getQueryKey("USERS")],
      });
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(state) => {
        form.reset();
        onOpenChange(state);
      }}
    >
      <DialogContent className="sm:max-w-lg">
        <DialogHeader className="text-left">
          <DialogTitle>User API Key</DialogTitle>
          <DialogDescription>
            Update the api key here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="-mr-4 w-full overflow-y-auto py-1 pr-4">
          <Form {...form}>
            <form
              id="user-form"
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 p-0.5"
            >
              <FormField
                control={form.control}
                name="apiKey"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1">
                    <FormLabel className="col-span-2 text-right">
                      API Key
                    </FormLabel>
                    <FormControl>
                      <PasswordInput
                        placeholder="Api Key"
                        className="col-span-4"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="col-span-4 col-start-3" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="apiSecret"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1">
                    <FormLabel className="col-span-2 text-right">
                      API Secret
                    </FormLabel>
                    <FormControl>
                      <PasswordInput
                        placeholder="Api Secret"
                        className="col-span-4"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="col-span-4 col-start-3" />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
        <DialogFooter>
          <Button type="submit" form="user-form" disabled={isPending}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
