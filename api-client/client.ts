import { env } from "@/env";
import { useAuth as authStore } from "@/stores/use-auth-store";
import type { Hooks, KyInstance, KyRequest, NormalizedOptions } from "ky";
import ky from "ky";
import { merge } from "lodash";
import { getSession } from "next-auth/react";

const baseURL = env.NEXT_PUBLIC_API_BASE_URL;

const setupHooks = (): Hooks => {
  return {
    beforeRequest: [
      async (request: Request) => {
        let { token, userId } = authStore.getState();
        const { setToken, setUserId } = authStore.getState();

        if (!token || !userId) {
          const session = await getSession();
          if (session?.accessToken) {
            token = session.accessToken;
            setToken(session.accessToken);
          }
          if (session?.user?.id) {
            userId = session?.user?.id;
            setUserId(session.user?.id);
          }
        }

        if (token) {
          request.headers.set("Authorization", `Bearer ${token}`);
        }

        return request;
      },
    ],
    afterResponse: [
      async (request: KyRequest, options: NormalizedOptions, response) => {
        return response;
      },
    ],
    beforeError: [
      async (error) => {
        const err = await error.response.json();
        return merge(error, err);
      },
    ],
    beforeRetry: [
      async () => {
        //
      },
    ],
  };
};

// Create a Ky instance with base URL
const httpClient: KyInstance = ky.create({
  prefixUrl: baseURL,
  hooks: setupHooks(),
  retry: {
    limit: 1,
    statusCodes: [401],
    methods: [
      "get",
      "put",
      "head",
      "delete",
      "options",
      "trace",
      "post",
      "patch",
      "connect",
    ],
  },
  timeout: 100000, // Set timeout to 10 seconds (you can adjust this as needed)
});

export default httpClient;
