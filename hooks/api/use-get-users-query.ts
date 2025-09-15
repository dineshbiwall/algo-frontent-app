import apiClient from "@/api-client/client";
import { getQueryKey } from "@/lib/react-query";
import { type ApiResponse } from "@/types/api";
import type { User } from "@/types/entities/user.entity";
import { useQuery } from "@tanstack/react-query";

export const useUsersQuery = ({ page }: { page: number }) => {
  const queryKey = getQueryKey("USERS");

  const fetchUsers = async () => {
    const { data } = await apiClient
      .get(`api/v1/admin/user`, {
        searchParams: { page },
      })
      .json<
        ApiResponse<{
          data: User[];
          meta: {
            total: number;
            page: number;
            limit: number;
            noOfPages: number;
          };
        }>
      >();

    return data;
  };

  return useQuery({
    queryKey: [queryKey, page],
    queryFn: fetchUsers,
  });
};
