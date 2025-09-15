"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useMyProfileQuery } from "@/hooks/api/use-my-profile-query";
import { useUpdateProfileMutation } from "@/hooks/api/use-update-profile-mutation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const profileSchema = z.object({
  name: z.string().min(1, "Please enter your name."),
  email: z.string().email("Please enter a valid email address."),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const defaultValues: Partial<ProfileFormValues> = {
  name: "",
  email: "",
};

export default function ProfileSettingsPage() {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues,
  });

  const { mutateAsync, isPending } = useUpdateProfileMutation();
  const { data: me, isLoading } = useMyProfileQuery();

  useEffect(() => {
    if (me) form.reset({ name: me.name ?? "", email: me.email ?? "" });
  }, [me, form]);

  async function onSubmit(data: ProfileFormValues) {
    await mutateAsync(data);
  }

  return (
    <div>
      <h2 className="text-2xl font-bold">Profile</h2>
      <p className="text-muted-foreground mb-6">
        Update your name and email address.
      </p>

      {isLoading ? (
        <div className="max-w-lg">
          <Skeleton className="h-8 w-1/3 mb-4" />
          <Skeleton className="h-12 w-full mb-3" />
          <Skeleton className="h-12 w-full mb-3" />
        </div>
      ) : (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 max-w-lg"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="you@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isPending}>
              Update profile
            </Button>
          </form>
        </Form>
      )}
    </div>
  );
}
