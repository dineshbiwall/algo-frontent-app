import TelegramButton from "@/components/telegram";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useCreatePlanMutation } from "@/hooks/api/use-create-plan-mutation";
import { useKiteUrlQuery } from "@/hooks/api/use-kite-url-query";
import { openRazorpayCheckout } from "@/lib/razorpay";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { Fragment } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useVerifyPaymentMutation } from "../../hooks/api/use-verify-payment-mutation";
import Balance from "./components/balance";

const uploadFormSchema = z.object({
  plan: z.enum(["999", "1999", "3999"], {
    required_error: "Please select a plan",
  }),
});

type UploadForm = z.infer<typeof uploadFormSchema>;

export default function UserDashboard() {
  const { data, status, refetch } = useKiteUrlQuery();
  const { mutateAsync: createPlan } = useCreatePlanMutation();
  const { mutateAsync: verifyPayment, isPending: isVerifyingPayment } =
    useVerifyPaymentMutation();

  const uploadForm = useForm<UploadForm>({
    resolver: zodResolver(uploadFormSchema),
    defaultValues: {
      plan: "999",
    },
  });

  const onSubmitUpload = async (values: UploadForm) => {
    try {
      const response = await createPlan({ price: Number(values.plan) });
      await openRazorpayCheckout({
        amount: response.data.amount,
        currency: response.data.currency,
        order_id: response.data.id,
        name: "Algomax Capital",
        description: `Plan ₹${values.plan}`,
        handler: async (response) => {
          try {
            // Verify payment on backend and create user plan
            await verifyPayment({
              orderId: response.razorpay_order_id,
              paymentId: response.razorpay_payment_id,
              signature: response.razorpay_signature,
            });
            toast.success("Payment successful! Your plan has been activated.");
            refetch();
          } catch (error) {
            toast.error(
              error instanceof Error
                ? error.message
                : "Payment verification failed",
            );
          }
        },
        prefill: {
          name: "User",
        },
        theme: {
          color: "#3399cc",
        },
        modal: {
          ondismiss: () => {
            toast.info("Payment cancelled");
          },
        },
      });

      uploadForm.reset();
    } catch (error) {
      toast.error("Failed to purchase plan. Please try again.");
    }
  };

  if (status === "pending") {
    return (
      <Fragment>
        <div className="flex justify-center py-20">
          <Loader2 size="35" className="h-4 w-4 animate-spin" />
        </div>
      </Fragment>
    );
  }

  if (!data) return <Fragment />;

  return (
    <>
      <div className="mb-4 flex items-center justify-between space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">
          Welcome to Algomax Capital!
        </h1>
      </div>

      {data.configAdded && data.plan ? (
        <Fragment>
          {data.hasTokens ? (
            <Fragment>
              <div className="flex flex-col gap-4">
                <TelegramButton showSuccessToast={false} />
                <Balance />
              </div>
            </Fragment>
          ) : (
            <Fragment>
              <div className="flex flex-col items-center justify-center space-y-2">
                <p className="text-sm text-muted-foreground">
                  You have not logged in to Kite yet. Please log in to start
                  using Kite.
                </p>
                <Link href={data.loginUrl}>
                  <Button className="mt-2">Login with Kite</Button>
                </Link>
              </div>
            </Fragment>
          )}
        </Fragment>
      ) : (
        <Fragment>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="flex flex-col">
              <h2 className="text-xl font-semibold text-primary pb-5">
                Please selet plan and make a payment.
              </h2>

              <Form {...uploadForm}>
                <form
                  onSubmit={uploadForm.handleSubmit(onSubmitUpload)}
                  className="flex items-center justify-center w-full flex-col gap-4"
                >
                  <FormField
                    control={uploadForm.control}
                    name="plan"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Select Plan</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="grid grid-cols-1 gap-4"
                          >
                            <div className="flex items-start space-x-3 border rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800">
                              <RadioGroupItem value="999" id="plan-999" />
                              <div className="grid gap-1.5 leading-none flex-1">
                                <label
                                  htmlFor="plan-999"
                                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                                >
                                  ₹999/month - 7 days access to the platform
                                </label>
                                <p className="text-xs text-muted-foreground">
                                  Access to the platform for 7 days
                                </p>
                              </div>
                            </div>
                            <div className="flex items-start space-x-3 border rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800">
                              <RadioGroupItem value="1999" id="plan-1999" />
                              <div className="grid gap-1.5 leading-none flex-1">
                                <label
                                  htmlFor="plan-1999"
                                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                                >
                                  ₹1,999/month - 15 days access to the platform
                                </label>
                                <p className="text-xs text-muted-foreground">
                                  Access to the platform for 15 days
                                </p>
                              </div>
                            </div>
                            <div className="flex items-start space-x-3 border rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800">
                              <RadioGroupItem value="3999" id="plan-3999" />
                              <div className="grid gap-1.5 leading-none flex-1">
                                <label
                                  htmlFor="plan-3999"
                                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                                >
                                  ₹3,999/month - 30 days access to the platform
                                </label>
                                <p className="text-xs text-muted-foreground">
                                  Access to the platform for 30 days
                                </p>
                              </div>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full">
                    {uploadForm.formState.isSubmitting || isVerifyingPayment
                      ? "Purchasing..."
                      : "Purchase Plan"}
                  </Button>
                </form>
              </Form>
            </div>
            <div className="flex flex-col space-y-2"></div>
          </div>
        </Fragment>
      )}
    </>
  );
}
