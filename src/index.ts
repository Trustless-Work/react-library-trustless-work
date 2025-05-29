/**
 * Provider for the Trustless Work API
 */
export { TrustlessWorkConfig } from "./provider";

// Export all the enviroments
export const mainNet = "https://api.trustlesswork.com";
export const development = "https://dev.api.trustlesswork.com";
export const local = "http://localhost:3000";

// Export all hooks and types
export * from "./hooks";
export * from "./types";
