/**
 * Provider for the Trustless Work API
 */
export { TrustlessWorkConfig } from "./provider";

// Export all the enviroments
export const mainNet = "https://trustless-core-production.up.railway.app";
export const development = "https://trustless-core-production.up.railway.app";

// Export all hooks and types
export * from "./hooks";
export * from "./types";
export * from "./errors";
