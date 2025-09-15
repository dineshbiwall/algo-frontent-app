import type { PaymentReceipt } from "@/types/entities/payment-receipt.entity";
import React, { createContext, useContext, useState } from "react";

type OpenState = "" | "add-plan" | "view" | "view-image";

interface PaymentsContextValue {
  open: OpenState;
  setOpen: (s: OpenState) => void;
  currentRow?: PaymentReceipt | null;
  setCurrentRow: React.Dispatch<React.SetStateAction<PaymentReceipt | null>>;
}

const ctx = createContext<PaymentsContextValue | undefined>(undefined);

export const PaymentsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [open, setOpen] = useState<OpenState>("");
  const [currentRow, setCurrentRow] = useState<PaymentReceipt | null>(null);

  return (
    <ctx.Provider value={{ open, setOpen, currentRow, setCurrentRow }}>
      {children}
    </ctx.Provider>
  );
};

export const usePayments = () => {
  const v = useContext(ctx);
  if (!v) throw new Error("usePayments must be used within PaymentsProvider");
  return v;
};

export default PaymentsProvider;
