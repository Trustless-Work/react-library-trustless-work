/**
 * Provider for the Trustless Work API
 */
export { TrustlessWorkProvider } from "./provider";

/**
 * Hooks for the Trustless Work API
 */
export { useInitializeEscrow } from "./hooks/useInitializeEscrow";
export { useSendTransaction } from "./hooks/useSendTransaction";
export { useGetEscrow } from "./hooks/useGetEscrow";
export { useUpdateEscrow } from "./hooks/useUpdateEscrow";
export { useStartDispute } from "./hooks/useStartDispute";
export { useResolveDispute } from "./hooks/useResolveDispute";
export { useGetMultipleEscrowBalances } from "./hooks/useGetMultipleEscrowBalances";
export { useReleaseFunds } from "./hooks/useReleaseFunds";
export { useFundEscrow } from "./hooks/useFundEscrow";
export { useChangeMilestoneStatus } from "./hooks/useChangeMilestoneStatus";
export { useChangeMilestoneApprovedFlag } from "./hooks/useChangeMilestoneApprovedFlag";

/**
 * Types for the Trustless Work API
 */
export type { Escrow } from "./types.entity";
export type { Milestone } from "./types.entity";
export type { Roles } from "./types.entity";
export type { Flags } from "./types.entity";
export type { Trustline } from "./types.entity";

/**
 * Types for the Trustless Work API
 */
export type { EscrowRequestResponse } from "./types.response";
export type { SendTransactionResponse } from "./types.response";
export type { InitializeEscrowResponse } from "./types.response";
export type { UpdateEscrowResponse } from "./types.response";
export type { GetEscrowBalancesResponse } from "./types.response";

/**
 * Types for the Trustless Work API
 */
export type { baseURL } from "./types";
export type { Status } from "./types";

/**
 * Types for the Trustless Work API
 */
export type { EscrowPayload } from "./types.payload";
export type { InitializeEscrowPayload } from "./types.payload";
export type { ChangeMilestoneStatusPayload } from "./types.payload";
export type { ChangeMilestoneApprovedFlagPayload } from "./types.payload";
export type { StartDisputePayload } from "./types.payload";
export type { ResolveDisputePayload } from "./types.payload";
export type { FundEscrowPayload } from "./types.payload";
export type { GetEscrowPayload } from "./types.payload";
export type { ReleaseFundsPayload } from "./types.payload";
export type { UpdateEscrowPayload } from "./types.payload";
export type { GetBalanceParams } from "./types.payload";
export type { SendTransactionPayload } from "./types.payload";
