import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { VisuallyHidden } from "@/components/ui/visually-hidden";
import { useUpdateKiteKeysMutation } from "@/hooks/api/use-update-kite-keys-mutation";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconX } from "@tabler/icons-react";
import Image from "next/image";
import { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import KiteConfigForm from "./KiteConfigForm";

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
type KiteForm = z.infer<typeof formSchema>;

const steps = [
  {
    id: 1,
    time: "Step 1",
    title: "Create your Kite Developer Account",
    image: "/images/step-one.png",
    description: (
      <Fragment>
        Visit{" "}
        <a
          href="https://developers.kite.trade/signup"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline dark:text-blue-400"
        >
          https://developers.kite.trade/signup
        </a>{" "}
        to register and create your developer account.
      </Fragment>
    ),
  },
  {
    id: 2,
    time: "Step 2",
    title: "Create a New App",
    image: "/images/step-two.png",
    description:
      "Once registered, create a new app in your developer dashboard to get started with Kite API integration.",
  },
  {
    id: 3,
    time: "Step 3",
    title: "Add Redirect URL",
    description: (
      <Fragment>
        In your app settings, add the redirect URL:{" "}
        <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm">
          https://app.algomaxcapital.com/kite/callback
        </code>{" "}
        to configure the authentication callback.
      </Fragment>
    ),
  },
  {
    id: 4,
    time: "Step 4",
    title: "Get API Key and Secret",
    image: "/images/step-four.png",
    description:
      "After creating your app, you will receive your API key and API secret which are required for authentication and API access.",
  },
  {
    id: 5,
    time: "Step 5",
    title: "Configure Your API Credentials",
    description: (
      <Fragment>
        Once you receive your API key and API secret, please click the{" "}
        <b>Configure Zerodha API</b> button below to enter your credentials and
        complete the setup.
      </Fragment>
    ),
  },
];

function ImageModal({
  open,
  onOpenChange,
  imageSrc,
  imageAlt,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  imageSrc: string | null;
  imageAlt: string;
}) {
  if (!imageSrc) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="!max-w-fit !max-h-fit p-0 bg-transparent border-0 shadow-none m-0"
        showCloseButton={false}
      >
        <VisuallyHidden>
          <DialogTitle>Image Viewer</DialogTitle>
          <DialogDescription>
            Enlarged view of the step illustration for better visibility
          </DialogDescription>
        </VisuallyHidden>
        <div className="relative w-full h-full">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 z-50 bg-black/50 hover:bg-black/70 text-white rounded-full h-12 w-12"
            onClick={() => onOpenChange(false)}
          >
            <IconX className="h-8 w-8" />
          </Button>
          <div className="relative w-full h-full overflow-auto bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
            <Image
              src={imageSrc}
              alt={imageAlt}
              width={1920}
              height={1080}
              className="w-full h-full object-contain p-4"
              unoptimized={true}
              priority={false}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function KiteConfigModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { mutateAsync, isPending } = useUpdateKiteKeysMutation();

  const form = useForm<KiteForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      apiKey: "",
      apiSecret: "",
    },
  });

  const onSubmit = async (values: KiteForm) => {
    try {
      const { message } = await mutateAsync(values);
      toast.success(message);
      form.reset();
      onOpenChange(false);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(state) => {
        onOpenChange(state);
      }}
    >
      <DialogContent className="sm:max-w-lg">
        <DialogHeader className="text-left">
          <DialogTitle>Configure Your Kite API</DialogTitle>
          <DialogDescription>
            Enter your API key and secret to complete the setup. Click save when
            you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <KiteConfigForm
          onSuccess={() => {
            /* keep modal open state handling to parent */
          }}
        />
      </DialogContent>
    </Dialog>
  );
}

export default function KiteTimeline() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<{
    src: string;
    alt: string;
  } | null>(null);

  const handleImageClick = (imageSrc: string, imageAlt: string) => {
    setSelectedImage({ src: imageSrc, alt: imageAlt });
    setImageModalOpen(true);
  };

  return (
    <Fragment>
      <ol className="relative border-s border-gray-200 dark:border-gray-700">
        {steps.map((step, index) => (
          <li
            key={step.id}
            className={index === steps.length - 1 ? "ms-4" : "mb-10 ms-4"}
          >
            <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700" />
            <div className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
              {step.time}
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white py-0.5">
              {step.title}
            </h3>
            <p className="text-base font-normal text-gray-500 dark:text-gray-400">
              {step.description}
            </p>
            {step.image ? (
              <div className="mb-4">
                <Image
                  src={step.image}
                  alt={`${step.title} illustration`}
                  width={600}
                  height={300}
                  className="rounded-lg border border-gray-200 dark:border-gray-700 mt-4 cursor-pointer hover:opacity-80 transition-opacity"
                  unoptimized={true}
                  priority={index === 0} // Set priority to true for the first image (LCP)
                  onClick={() =>
                    handleImageClick(step.image!, `${step.title} illustration`)
                  }
                />
              </div>
            ) : null}
          </li>
        ))}
      </ol>

      <div className="mt-3 ms-4">
        <Button onClick={() => setIsModalOpen(true)} size="lg">
          Configure Zerodha API
        </Button>
      </div>

      <KiteConfigModal open={isModalOpen} onOpenChange={setIsModalOpen} />

      <ImageModal
        open={imageModalOpen}
        onOpenChange={setImageModalOpen}
        imageSrc={selectedImage?.src || null}
        imageAlt={selectedImage?.alt || ""}
      />
    </Fragment>
  );
}
