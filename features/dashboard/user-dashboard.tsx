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
import { ModuleTypeEnum } from "@/enums/utils.enum";
import { useCreatePaymentMutation } from "@/hooks/api/use-create-payment-mutation";
import { useKiteUrlQuery } from "@/hooks/api/use-kite-url-query";
import { uploadThing } from "@/lib/uploadthing";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconCloudUpload, IconInfoTriangleFilled } from "@tabler/icons-react";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { QRCodeCanvas } from "qrcode.react";
import { Fragment, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import Balance from "./components/balance";

const uploadFormSchema = z.object({
  paymentReceipt: z
    .instanceof(File, { message: "Please select a file to upload" })
    .refine(
      (file) => file.size <= 5 * 1024 * 1024,
      "File size must be less than 5MB",
    )
    .refine(
      (file) => ["image/png", "image/jpeg", "image/jpg"].includes(file.type),
      "Only PNG, JPG, and JPEG files are allowed",
    ),
  plan: z.enum(["4999", "5999"], {
    required_error: "Please select a plan",
  }),
});

type UploadForm = z.infer<typeof uploadFormSchema>;

export default function UserDashboard() {
  const { data, status } = useKiteUrlQuery();
  const { mutateAsync: createPaymentReceipt } = useCreatePaymentMutation();

  const uploadForm = useForm<UploadForm>({
    resolver: zodResolver(uploadFormSchema),
    defaultValues: {
      plan: "4999",
    },
  });

  const selectedPlan = uploadForm.watch("plan");

  const onDrop = useCallback(
    (files: File[]) => {
      if (files.length === 0) return;
      const file = files[0];
      uploadForm.setValue("paymentReceipt", file);
      uploadForm.clearErrors("paymentReceipt");
    },
    [uploadForm],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/jpeg": [], "image/png": [], "image/jpg": [] },
    maxSize: 5 * 1024 * 1024, // 5 MB
    multiple: false,
  });

  const onSubmitUpload = async (values: UploadForm) => {
    try {
      const { key } = await uploadThing(
        values.paymentReceipt,
        ModuleTypeEnum.PaymentReceipt,
      );

      await createPaymentReceipt({ key, amount: values.plan });

      toast.success(
        `Payment receipt uploaded successfully! We will process your payment shortly.`,
      );
      // Reset form after successful upload
      uploadForm.reset();
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Failed to upload payment receipt. Please try again.");
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
                Please make payment by using this QR code
              </h2>

              <div className="flex justify-center mb-10 pt-5">
                <QRCodeCanvas
                  size={250}
                  level="H"
                  value={`upi://pay?pa=dineshbiwalfinance@oksbi&pn=Dinesh%20Biwal&aid=uGICAgKDIoLPVYA&am=${selectedPlan}`}
                />
              </div>

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
                              <RadioGroupItem value="4999" id="plan-4999" />
                              <div className="grid gap-1.5 leading-none flex-1">
                                <label
                                  htmlFor="plan-4999"
                                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                                >
                                  ₹4,999 - I have Kite API credentials
                                </label>
                                <p className="text-xs text-muted-foreground">
                                  Discounted price for users who already have
                                  Kite API key and secret configured
                                </p>
                              </div>
                            </div>
                            <div className="flex items-start space-x-3 border rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800">
                              <RadioGroupItem value="5999" id="plan-5999" />
                              <div className="grid gap-1.5 leading-none flex-1">
                                <label
                                  htmlFor="plan-5999"
                                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                                >
                                  ₹5,999 - I need help with Kite API setup
                                </label>
                                <p className="text-xs text-muted-foreground">
                                  Includes complete Kite API setup assistance
                                  and configuration support
                                </p>
                              </div>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {selectedPlan === "4999" && (
                    <div className="p-4 border border-red-500 rounded-md bg-red-50 flex items-start space-x-3 w-full">
                      <IconInfoTriangleFilled className="text-red-700 h-5 w-5 mt-1" />
                      <div>
                        <h3 className="text-lg font-semibold text-red-700">
                          Attention needed
                        </h3>
                        <p className="text-sm text-red-600 pt-1">
                          Please add Zerodha API key and API secret before
                          making any payment.{" "}
                          <Link
                            href="/document/zerodha"
                            className="text-blue-600 hover:text-blue-800 underline"
                          >
                            View setup guide
                          </Link>
                        </p>
                      </div>
                    </div>
                  )}

                  <FormField
                    control={uploadForm.control}
                    name="paymentReceipt"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="sr-only">
                          Payment Receipt
                        </FormLabel>
                        <FormControl>
                          <div
                            {...getRootProps()}
                            className={`flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
                              isDragActive
                                ? "border-primary bg-primary/10"
                                : "border-gray-300 bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500"
                            }`}
                          >
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              <IconCloudUpload className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" />
                              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                <span className="font-semibold">
                                  {isDragActive
                                    ? "Drop the file here"
                                    : "Click to upload"}
                                </span>
                                {!isDragActive && " or drag and drop"}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                PNG, JPG or JPEG (Max. 5MB)
                              </p>
                              {field.value && (
                                <p className="text-xs text-green-600 dark:text-green-400 mt-2">
                                  Selected: {field.value.name}
                                </p>
                              )}
                            </div>
                            <input {...getInputProps()} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full">
                    {uploadForm.formState.isSubmitting
                      ? "Uploading..."
                      : "Upload Payment Receipt"}
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
