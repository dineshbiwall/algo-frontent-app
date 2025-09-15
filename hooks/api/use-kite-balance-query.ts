import apiClient from "@/api-client/client";
import { getQueryKey } from "@/lib/react-query";
import { type ApiResponse } from "@/types/api";
import { useQuery } from "@tanstack/react-query";

export interface BalanceResponse {
  enabled: boolean;
  net: number;
  available: Available;
  utilised: Utilised;
}

export interface Available {
  adhoc_margin: number;
  cash: number;
  opening_balance: number;
  live_balance: number;
  collateral: number;
  intraday_payin: number;
}

export interface Utilised {
  debits: number;
  exposure: number;
  m2m_realised: number;
  m2m_unrealised: number;
  option_premium: number;
  payout: number;
  span: number;
  holding_sales: number;
  turnover: number;
  liquid_collateral: number;
  stock_collateral: number;
  equity: number;
  delivery: number;
}

export const useKiteBalanceQuery = () => {
  const queryKey = getQueryKey("KITE_BALANCE");

  const fetchUser = async () => {
    const { data } = await apiClient
      .get(`api/v1/user/kite/balance`)
      .json<ApiResponse<BalanceResponse>>();

    return data;
  };

  return useQuery({
    queryKey: [queryKey],
    queryFn: fetchUser,
  });
};
