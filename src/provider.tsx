"use client";

import React, { ReactNode, useContext, useState } from "react";
import { baseURL } from "./types";
import { TrustlessWorkClient } from "./client";

const TrustlessWorkContext = React.createContext<{
  client: TrustlessWorkClient | null;
}>({ client: null });

export interface TrustlessWorkConfigProps {
  baseURL: baseURL;
  apiKey: string;
  children: ReactNode;
}

export const TrustlessWorkConfig = ({
  baseURL,
  apiKey,
  children,
}: TrustlessWorkConfigProps) => {
  const [client] = useState(() => new TrustlessWorkClient(baseURL, apiKey));

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
      "useTrustlessWorkClient must be inside TrustlessWorkConfig"
    );
  }

  return ctx.client;
}
