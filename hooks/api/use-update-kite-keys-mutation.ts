import httpClient from "@/api-client/client";
import type { ApiResponse } from "@/types/api";
import { useMutation } from "@tanstack/react-query";

export interface Payload {
  apiKey: string;
  apiSecret: string;
}

export const useUpdateKiteKeysMutation = () => {
  return useMutation<ApiResponse, Error, Payload>({
    mutationFn: (payload: Payload) => {
      return httpClient
        .put("api/v1/auth/kite-keys", { json: payload })
        .json<ApiResponse>();
    },
  });
};
