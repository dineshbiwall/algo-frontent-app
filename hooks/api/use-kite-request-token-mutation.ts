import httpClient from "@/api-client/client";
import type { ApiResponse } from "@/types/api";
import { useMutation } from "@tanstack/react-query";

export interface Payload {
  request_token: string;
}

export const useKiteRequestTokenMutation = () => {
  return useMutation<ApiResponse, Error, Payload>({
    mutationFn: (data: Payload) => {
      return httpClient
        .post("api/v1/user/kite", { json: data })
        .json<ApiResponse>();
    },
  });
};
