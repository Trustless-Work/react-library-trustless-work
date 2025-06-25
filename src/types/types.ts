/**
 * The base URL for the Trustless Work API
 */
export type baseURL =
  | "https://api.trustlesswork.com"
  | "https://dev.api.trustlesswork.com";

/**
 * Escrow Type
 */
export type EscrowType = "single-release" | "multi-release";

/**
 * Escrow Status
 */
export type SingleReleaseEscrowStatus =
  | "working"
  | "pendingRelease"
  | "released"
  | "resolved"
  | "inDispute";

/**
 * Http Method
 */
export type HttpMethod = "get" | "post" | "put" | "delete";

/**
 * Unique possible statuses for a Trustless Work request
 */
export type Status = "SUCCESS" | "FAILED";

/**
 * Date
 */
export type Date = {
  seconds: number;
  nanoseconds: number;
};
