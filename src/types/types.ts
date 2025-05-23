/**
 * The base URL for the Trustless Work API
 */
export type baseURL =
  | "https://api.trustlesswork.com"
  | "https://dev.api.trustlesswork.com";

/**
 * Http Method
 */
export type HttpMethod = "get" | "post" | "put" | "delete";

/**
 * Unique possible statuses for a Trustless Work request
 */
export type Status = "SUCCESS" | "FAILED";
