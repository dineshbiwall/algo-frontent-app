import apiClient from "@/api-client/client";
import { getQueryKey } from "@/lib/react-query";
import type { ApiResponse } from "@/types/api";
import type { PaymentReceipt } from "@/types/entities/payment-receipt.entity";
import { useQuery } from "@tanstack/react-query";

export const useAdminPaymentsQuery = ({
  page,
  userIds,
}: {
  page: number;
  userIds?: string[] | undefined;
}) => {
  const queryKey = getQueryKey("PAYMENT_RECEIPTS");

  const fetchReceipts = async () => {
    const searchParams: Record<string, any> = { page };
    if (userIds && userIds.length > 0) {
      // send userIds as comma separated list (API expected format)
      searchParams.userIds = userIds.join(",");
    }

    const { data } = await apiClient
      .get(`api/v1/admin/payment-receipt`, {
        searchParams,
      })
      .json<
        ApiResponse<{
          data: PaymentReceipt[];
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
    queryKey: [queryKey, page, userIds ? userIds.join(",") : undefined],
    queryFn: fetchReceipts,
  });
};
