import apiClient from "@/api-client/client";
import type { ApiResponse } from "@/types/api";
import type { Plan } from "@/types/entities/plan.entity";
import { useMutation } from "@tanstack/react-query";

export interface CreatePlanPayload {
  price: number;
}

export const useCreatePlanMutation = () => {
  return useMutation<ApiResponse<Plan>, Error, CreatePlanPayload>({
    mutationFn: (payload: CreatePlanPayload) => {
      return apiClient
        .post("api/v1/plan", { json: payload })
        .json<ApiResponse<Plan>>();
    },
  });
};
