import httpClient from "@/api-client/client";
import type { ApiResponse } from "@/types/api";
import { useMutation } from "@tanstack/react-query";

export interface Payload {
  userId: string;
  date: string;
}

export const useStartPlanMutation = () => {
  return useMutation<ApiResponse, Error, Payload>({
    mutationFn: (payload: Payload) => {
      return httpClient
        .post("api/v1/admin/payment-receipt/add-plan", { json: payload })
        .json<ApiResponse>();
    },
  });
};
