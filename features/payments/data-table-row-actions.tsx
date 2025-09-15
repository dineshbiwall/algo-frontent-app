import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useMarkPaymentReadMutation } from "@/hooks/api/use-mark-payment-read-mutation";
import type { PaymentReceipt } from "@/types/entities/payment-receipt.entity";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { Fragment, useState } from "react";
import { usePayments } from "./context/payments-context";

interface DataTableRowActionsProps {
  row: PaymentReceipt;
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const router = useRouter();
  const { setOpen, setCurrentRow } = usePayments();
  const { mutateAsync: markRead } = useMarkPaymentReadMutation();
  const [loading, setLoading] = useState(false);

  const handleMarkRead = async () => {
    setLoading(true);
    try {
      await markRead({ id: row.id });
    } finally {
      setLoading(false);
    }
  };

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="data-[state=open]:bg-muted flex h-8 w-8 p-0"
        >
          <DotsHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        <DropdownMenuItem
          onClick={() => {
            setCurrentRow(row);
            setOpen("add-plan");
          }}
        >
          Add user plan
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            setCurrentRow(row);
            setOpen("view-image");
          }}
        >
          View receipt image
        </DropdownMenuItem>

        {!row.readAt && (
          <Fragment>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleMarkRead} disabled={loading}>
              Mark as read
            </DropdownMenuItem>
          </Fragment>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
