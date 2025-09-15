import httpClient from "@/api-client/client";
import type { ApiResponse } from "@/types/api";
import { useMutation } from "@tanstack/react-query";

export interface BuyTradePayload {
  symbol: string;
  noOfLots: number;
}

export const useBuyTradeMutation = () => {
  return useMutation<ApiResponse, Error, BuyTradePayload>({
    mutationFn: (payload: BuyTradePayload) => {
      return httpClient
        .post("api/v1/trade/buy", { json: payload })
        .json<ApiResponse>();
    },
  });
};
