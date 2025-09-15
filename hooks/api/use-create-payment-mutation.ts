import httpClient from "@/api-client/client";
import type { ApiResponse } from "@/types/api";
import { useMutation } from "@tanstack/react-query";

export interface Payload {
  key: string;
  amount: string;
}

export const useCreatePaymentMutation = () => {
  return useMutation<ApiResponse, Error, Payload>({
    mutationFn: (payload: Payload) => {
      return httpClient
        .post("api/v1/payment-receipt", { json: payload })
        .json<ApiResponse>();
    },
  });
};
