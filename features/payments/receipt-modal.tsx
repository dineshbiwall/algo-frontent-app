"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FormMessage } from "@/components/ui/form";
import { useGenerateDownloadUrl } from "@/hooks/api/use-generate-download-url";
import { Loader2 } from "lucide-react";
import { usePayments } from "./context/payments-context";

export default function ReceiptModal() {
  const { open, setOpen, currentRow } = usePayments();
  const key = currentRow?.key || null;
  const {
    data: url,
    isLoading,
    isError,
    isSuccess,
    error,
  } = useGenerateDownloadUrl(key);

  return (
    <Dialog
      open={open === "view-image"}
      onOpenChange={(v) => (v ? setOpen("view-image") : setOpen(""))}
    >
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Receipt Image</DialogTitle>
        </DialogHeader>

        <div className="w-full h-[60vh] flex items-center justify-center">
          {isLoading && (
            <div className="flex justify-center items-center">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Loading...
            </div>
          )}
          {isError && (
            <FormMessage>
              {error?.message || "Failed to load image"}
            </FormMessage>
          )}
          {isSuccess && url && (
            <img
              src={url}
              alt="Receipt"
              className="max-h-[56vh] max-w-full object-contain"
            />
          )}
        </div>

        <DialogFooter>
          <div className="flex gap-2 w-full justify-end">
            <Button variant="ghost" onClick={() => setOpen("")}>
              Close
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
