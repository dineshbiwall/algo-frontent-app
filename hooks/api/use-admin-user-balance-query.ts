import apiClient from "@/api-client/client";
import { getQueryKey } from "@/lib/react-query";
import { type ApiResponse } from "@/types/api";
import type { Balance } from "@/types/entities/balance.entity";
import { useQuery } from "@tanstack/react-query";

export const useAdminUserBalanceQuery = ({
  userId,
  page,
}: {
  userId: string;
  page: number;
}) => {
  const queryKey = getQueryKey("USER_BALANCE", { userId });

  const fetchUserBalance = async () => {
    const { data } = await apiClient
      .get(`api/v1/admin/user/${userId}/balance`, {
        searchParams: { page },
      })
      .json<
        ApiResponse<{
          data: Balance[];
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
    queryFn: fetchUserBalance,
    enabled: !!userId,
  });
};
