"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Fragment, useState, type ReactNode } from "react";
import { Toaster } from "sonner";

export const QueryProvider = ({ children }: { children: ReactNode }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            retry: false,
            refetchOnMount: true,
          },
        },
      }),
  );

  return (
    <Fragment>
      <Toaster duration={50000} richColors />
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </Fragment>
  );
};
