import apiClient from "@/api-client/client";
import { type ApiResponse } from "@/types/api";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

type UpdatePasswordPayload = {
  oldPassword: string;
  password: string;
};

export const useUpdatePasswordMutation = () => {
  return useMutation<ApiResponse<any>, Error, UpdatePasswordPayload>({
    mutationFn: async (payload: UpdatePasswordPayload) => {
      return await apiClient
        .put("api/v1/auth/password", {
          json: payload,
        })
        .json<ApiResponse>();
    },
    onError(error) {
      toast.error(error.message);
    },
    onSuccess(data) {
      toast.success(data.message);
    },
  });
};
