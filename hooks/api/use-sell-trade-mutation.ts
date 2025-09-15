import httpClient from "@/api-client/client";
import type { ApiResponse } from "@/types/api";
import { useMutation } from "@tanstack/react-query";

export interface SellTradePayload {
  symbol: string;
  noOfLots: number;
}

export const useSellTradeMutation = () => {
  return useMutation<ApiResponse, Error, SellTradePayload>({
    mutationFn: (payload: SellTradePayload) => {
      return httpClient
        .post("api/v1/trade/sell", { json: payload })
        .json<ApiResponse>();
    },
  });
};
