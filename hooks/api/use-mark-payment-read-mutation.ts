import httpClient from "@/api-client/client";
import { getQueryKey } from "@/lib/react-query";
import type { ApiResponse } from "@/types/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useMarkPaymentReadMutation = () => {
  const qc = useQueryClient();
  return useMutation<ApiResponse, Error, { id: string }>({
    mutationFn: (payload) => {
      return httpClient
        .put(`api/v1/admin/payment-receipt/read/${payload.id}`, { json: {} })
        .json<ApiResponse>();
    },
    onSuccess: () => {
      // invalidate admin payment receipts list so UI refreshes
      qc.invalidateQueries({ queryKey: [getQueryKey("PAYMENT_RECEIPTS")] });
    },
  });
};
