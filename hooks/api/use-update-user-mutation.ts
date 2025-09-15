import httpClient from "@/api-client/client";
import type { ApiResponse } from "@/types/api";
import { useMutation } from "@tanstack/react-query";

export interface Payload {
  id: string;
  name: string;
  email: string;
  password: string;
}

export const useUpdateUserMutation = () => {
  return useMutation<ApiResponse, Error, Payload>({
    mutationFn: (payload: Payload) => {
      return httpClient
        .put(`api/v1/admin/user/${payload.id}`, { json: payload })
        .json<ApiResponse>();
    },
  });
};
