import { PasswordInput } from "@/components/password-input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useUpdateKiteKeysMutation } from "@/hooks/api/use-update-kite-keys-mutation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  apiKey: z
    .string()
    .min(1, "API Key is required.")
    .transform((s) => s.trim()),
  apiSecret: z
    .string()
    .min(1, "API Secret is required.")
    .transform((s) => s.trim()),
});
type KiteForm = z.infer<typeof formSchema>;

export default function KiteConfigForm({
  onSuccess,
}: {
  onSuccess?: (message?: string) => void;
}) {
  const { mutateAsync, isPending } = useUpdateKiteKeysMutation();

  const form = useForm<KiteForm>({
    resolver: zodResolver(formSchema),
    defaultValues: { apiKey: "", apiSecret: "" },
  });

  const onSubmit = async (values: KiteForm) => {
    try {
      const { message } = await mutateAsync(values);
      toast.success(message);
      form.reset();
      onSuccess?.(message);
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  return (
    <div>
      <Form {...form}>
        <form
          id="kite-config-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 max-w-lg"
        >
          <FormField
            control={form.control}
            name="apiKey"
            render={({ field }) => (
              <FormItem>
                <FormLabel>API Key</FormLabel>
                <FormControl>
                  <PasswordInput
                    placeholder="Enter your Kite API Key"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="apiSecret"
            render={({ field }) => (
              <FormItem>
                <FormLabel>API Secret</FormLabel>
                <FormControl>
                  <PasswordInput
                    placeholder="Enter your Kite API Secret"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" form="kite-config-form" disabled={isPending}>
            Save API Credentials
          </Button>
        </form>
      </Form>
    </div>
  );
}
