import { replaceDynamicParams } from "./helpers";

type QueryKeyDynamicParams = {
  USER_INFO: { userId: string };
  USER_BALANCE: { userId: string };
};

export const QUERY_KEYS = {
  USER_INFO: "user:{userId}",
  MY_PROFILE: "user:profile",
  KITE_URL: "user:kite:url",
  USERS: "admin:users",
  PAYMENT_RECEIPTS: "admin:payment:receipts",
  KITE_BALANCE: "user:kite:balance",
  USER_BALANCE: "admin:user:{userId}:balance",
} as const;

export const getQueryKey = <T extends keyof typeof QUERY_KEYS>(
  key: T,
  params?: T extends keyof QueryKeyDynamicParams
    ? QueryKeyDynamicParams[T]
    : never,
): string => {
  const template: string = QUERY_KEYS[key];
  return replaceDynamicParams(template, params);
};
