import apiClient from "@/api-client/client";
import { getQueryKey } from "@/lib/react-query";
import { type ApiResponse } from "@/types/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

type UpdateProfilePayload = {
  name: string;
  email: string;
};

export const useUpdateProfileMutation = () => {
  const qc = useQueryClient();

  return useMutation<ApiResponse<any>, Error, UpdateProfilePayload>({
    mutationFn: async (payload: UpdateProfilePayload) => {
      return await apiClient
        .put("api/v1/auth/profile", {
          json: payload,
        })
        .json<ApiResponse<any>>();
    },
    onSettled() {
      qc.invalidateQueries({
        queryKey: [getQueryKey("MY_PROFILE")],
      });
    },
    onError(error) {
      toast.error(error.message);
    },
    onSuccess(data) {
      toast.success(data.message);
    },
  });
};
