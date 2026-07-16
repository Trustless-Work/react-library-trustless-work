"use client";

import React, { ReactNode, useContext, useEffect, useState } from "react";
import { baseURL } from "./types";
import { TrustlessWorkClient } from "./client";
import type { EscrowRestService } from "./services/rest";
import type { EscrowGraphqlService } from "./services/graphql";

const TrustlessWorkContext = React.createContext<{
  client: TrustlessWorkClient | null;
}>({ client: null });

export interface TrustlessWorkConfigProps {
  baseURL: baseURL;
  apiKey?: string;
  getAccessToken?: () => string | undefined | null;
  defaultHeaders?: Record<string, string>;
  children: ReactNode;
}

export const TrustlessWorkConfig = ({
  baseURL,
  apiKey,
  getAccessToken,
  defaultHeaders,
  children,
}: TrustlessWorkConfigProps) => {
  const [client] = useState(
    () =>
      new TrustlessWorkClient({
        baseURL,
        apiKey,
        getAccessToken,
        defaultHeaders,
      }),
  );

  useEffect(() => {
    if (apiKey !== undefined) {
      client.setApiKey(apiKey);
    }
    client.setAccessTokenGetter(getAccessToken);
    if (defaultHeaders) {
      client.setDefaultHeaders(defaultHeaders);
    }
  }, [apiKey, getAccessToken, defaultHeaders, client]);

  return (
    <TrustlessWorkContext.Provider value={{ client }}>
      {children}
    </TrustlessWorkContext.Provider>
  );
};

export function useTrustlessWorkClient() {
  const ctx = useContext(TrustlessWorkContext);

  if (!ctx.client) {
    throw new Error(
      "useTrustlessWorkClient must be inside TrustlessWorkConfig",
    );
  }

  return ctx.client;
}

/** REST escrow service (operate + `/escrows` reads). */
export function useEscrowRest(): EscrowRestService {
  return useTrustlessWorkClient().rest;
}

/** GraphQL escrow service (`POST /graphql` reads). */
export function useEscrowGraphql(): EscrowGraphqlService {
  return useTrustlessWorkClient().graphql;
}
