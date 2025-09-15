import apiClient from "@/api-client/client";
import { getQueryKey } from "@/lib/react-query";
import { type ApiResponse } from "@/types/api";
import type { User } from "@/types/entities/user.entity";
import { useQuery } from "@tanstack/react-query";

export const useMyProfileQuery = () => {
  const queryKey = getQueryKey("MY_PROFILE");

  const fetchUser = async () => {
    const { data } = await apiClient
      .get(`api/v1/auth/me`)
      .json<ApiResponse<User>>();

    return data;
  };

  return useQuery({
    queryKey: [queryKey],
    queryFn: fetchUser,
  });
};
