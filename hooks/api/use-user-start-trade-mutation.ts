import httpClient from "@/api-client/client";
import { getQueryKey } from "@/lib/react-query";
import type { ApiResponse } from "@/types/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export interface Payload {
  userId: string;
}

export const useUserStartTradeMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<ApiResponse, Error, Payload>({
    mutationFn: (data: Payload) => {
      return httpClient
        .post(`api/v1/admin/user/start/trade/${data.userId}`, { json: data })
        .json<ApiResponse>();
    },
    async onSuccess(data) {
      await queryClient.invalidateQueries({ queryKey: [getQueryKey("USERS")] });
      toast.success(data.message);
    },
    onError(error) {
      toast.error(error.message);
    },
  });
};
