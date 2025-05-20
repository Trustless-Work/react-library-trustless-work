import React, { ReactNode, useContext } from "react";
import { createContext } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { baseURL } from "./types";
import { TrustlessWorkClient } from "./client";

interface TrustlessWorkContextValue {
  client: TrustlessWorkClient;
}

const TrustlessWorkContext = createContext<
  TrustlessWorkContextValue | undefined
>(undefined);

export interface TrustlessWorkProviderProps {
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
export const TrustlessWorkProvider = ({
  baseURL,
  apiKey,
  children,
}: TrustlessWorkProviderProps) => {
  // Initialize the client
  const client = new TrustlessWorkClient(baseURL, apiKey);

  // Initialize the query client
  const queryClient = new QueryClient();

  return (
    // Provide the client to the context
    <TrustlessWorkContext.Provider value={{ client }}>
      {/* Provide the query client to the children */}
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </TrustlessWorkContext.Provider>
  );
};

export function useTrustlessWorkClient() {
  const ctx = useContext(TrustlessWorkContext);

  if (!ctx)
    throw new Error(
      "useTrustlessWorkClient must be inside TrustlessWorkProvider"
    );

  return ctx.client;
}
