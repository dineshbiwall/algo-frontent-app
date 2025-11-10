import { env } from "@/env";

interface RazorpayInstance {
  open: () => void;
  close: () => void;
}

interface RazorpayConstructor {
  new (options: RazorpayOptions): RazorpayInstance;
}

declare global {
  interface Window {
    Razorpay: RazorpayConstructor;
  }
}

export interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: RazorpayResponse) => void;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  theme?: {
    color?: string;
  };
  modal?: {
    ondismiss?: () => void;
  };
}

export interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

export const loadRazorpayScript = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (window.Razorpay) {
      resolve();
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Razorpay script"));
    document.body.appendChild(script);
  });
};

export const openRazorpayCheckout = async (
  options: Omit<RazorpayOptions, "key">,
): Promise<void> => {
  await loadRazorpayScript();

  if (!window.Razorpay) {
    throw new Error("Razorpay script not loaded");
  }

  const razorpayKey = env.NEXT_PUBLIC_RAZORPAY_KEY_ID;

  const razorpayOptions: RazorpayOptions = {
    key: razorpayKey,
    ...options,
  };

  const razorpay = new window.Razorpay(razorpayOptions);
  razorpay.open();
};
