"use client";

import React, { ReactNode, useContext, useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { baseURL } from "./types";
import { TrustlessWorkClient } from "./client";

// Create context outside of the component
const TrustlessWorkContext = React.createContext<{
  client: TrustlessWorkClient | null;
}>({ client: null });

export interface TrustlessWorkConfigProps {
  /**
   * The base URL for the Trustless Work API. Must be one of:
   * - "https://api.trustlesswork.com" (production)
   * - "https://dev.api.trustlesswork.com" (development)
   */
  baseURL: baseURL;

  /**
   * Your Trustless Work API key. You can get it from the Trustless Work dApp. Make sure to use the correct API key for the environment you are using. We recommed save this apiKey in your .env file.
   * - "https://dapp.trustlesswork.com" (production)
   * - "https://dapp.dev.trustlesswork.com" (development)
   */
  apiKey: string;

  /**
   * The children of the provider
   */
  children: ReactNode;
}

/**
 * The provider for the Trustless Work API. It enables you to use the Trustless Work API in your React application.
 * @param props - The props for the provider
 * @returns The provider for the Trustless Work API
 */
export const TrustlessWorkConfig = ({
  baseURL,
  apiKey,
  children,
}: TrustlessWorkConfigProps) => {
  const [client, setClient] = useState<TrustlessWorkClient | null>(null);
  const [queryClient] = useState(() => new QueryClient());

  useEffect(() => {
    const newClient = new TrustlessWorkClient(baseURL, apiKey);
    setClient(newClient);
  }, [baseURL, apiKey]);

  return (
    <TrustlessWorkContext.Provider value={{ client }}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </TrustlessWorkContext.Provider>
  );
};

export function useTrustlessWorkClient() {
  const ctx = useContext(TrustlessWorkContext);

  if (!ctx.client) {
    throw new Error(
      "useTrustlessWorkClient must be inside TrustlessWorkConfig"
    );
  }

  return ctx.client;
}
