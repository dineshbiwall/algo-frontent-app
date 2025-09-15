import httpClient from "@/api-client/client";
import type { ApiResponse } from "@/types/api";
import { useMutation } from "@tanstack/react-query";

export interface Payload {
  id: string;
  apiKey: string;
  apiSecret: string;
}

export const useUpdateUserKiteKeyMutation = () => {
  return useMutation<ApiResponse, Error, Payload>({
    mutationFn: (payload: Payload) => {
      return httpClient
        .put(`api/v1/admin/user/kite-keys/${payload.id}`, { json: payload })
        .json<ApiResponse>();
    },
  });
};
