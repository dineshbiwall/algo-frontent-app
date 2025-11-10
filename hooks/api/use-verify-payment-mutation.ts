import apiClient from "@/api-client/client";
import type { ApiResponse } from "@/types/api";
import type { UserPlan } from "@/types/entities/user-plan.entity";
import { useMutation } from "@tanstack/react-query";

export interface VerifyPaymentPayload {
  orderId: string;
  paymentId: string;
  signature: string;
}

export const useVerifyPaymentMutation = () => {
  return useMutation<ApiResponse<UserPlan>, Error, VerifyPaymentPayload>({
    mutationFn: (payload: VerifyPaymentPayload) => {
      return apiClient
        .post("api/v1/plan/verify-payment", { json: payload })
        .json<ApiResponse<UserPlan>>();
    },
  });
};
