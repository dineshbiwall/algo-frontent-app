import httpClient from "@/api-client/client";
import type { ApiResponse } from "@/types/api";
import { useMutation } from "@tanstack/react-query";

export interface Payload {}

export const useStartAllProcessMutation = () => {
  return useMutation<ApiResponse, Error, Payload>({
    mutationFn: (payload: Payload) => {
      return httpClient
        .post("api/v1/admin/user/start-all-process", { json: {} })
        .json<ApiResponse>();
    },
  });
};
