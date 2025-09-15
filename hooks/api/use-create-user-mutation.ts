import httpClient from "@/api-client/client";
import type { ApiResponse } from "@/types/api";
import { useMutation } from "@tanstack/react-query";

export interface Payload {
  name: string;
  email: string;
  password: string;
}

export const useCreateUserMutation = () => {
  return useMutation<ApiResponse, Error, Payload>({
    mutationFn: (payload: Payload) => {
      return httpClient
        .post("api/v1/admin/user", { json: payload })
        .json<ApiResponse>();
    },
  });
};
