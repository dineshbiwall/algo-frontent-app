import httpClient from "@/api-client/client";
import type { ApiResponse } from "@/types/api";
import { useMutation } from "@tanstack/react-query";

export interface Payload {
  name: string;
  email: string;
  password: string;
  kiteId: string;
}

export const useSignupMutation = () => {
  return useMutation<ApiResponse, Error, Payload>({
    mutationFn: (userData: Payload) => {
      return httpClient
        .post("api/v1/auth/signup", { json: userData })
        .json<ApiResponse>();
    },
  });
};
