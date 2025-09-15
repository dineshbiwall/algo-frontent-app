import httpClient from "@/api-client/client";
import type { ApiResponse } from "@/types/api";
import { useMutation } from "@tanstack/react-query";
import { TelegramAuthData } from "@telegram-auth/react";

export interface Payload {
  key: string;
  amount: string;
}

export const useLinkTelegramMutation = () => {
  return useMutation<ApiResponse, Error, TelegramAuthData>({
    mutationFn: (payload: TelegramAuthData) => {
      return httpClient
        .post("api/v1/auth/tg-link", { json: payload })
        .json<ApiResponse>();
    },
  });
};
