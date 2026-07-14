import type { EscrowType } from "./types";
import type {
  Dispute,
  MultiReleaseMilestone,
  MultiReleaseRoles,
  Roles,
  SingleReleaseMilestone,
  Trustline,
} from "./types.entity";

/**
 * Shared camelCased on-chain snapshot fields (Core v2 wire contract).
 */
type BaseEscrowSnapshot = {
  title: string;
  description: string;
  engagementId: string;
  trustline: Trustline;
  platformFee: number;
  receiverMemo?: number;
  flags?: Record<string, unknown>;
};

/**
 * Single-release on-chain snapshot.
 */
export type SingleReleaseEscrowSnapshot = BaseEscrowSnapshot & {
  roles: Roles;
  amount: number;
  milestones: SingleReleaseMilestone[];
  dispute?: Dispute;
  released?: boolean;
};

/**
 * Multi-release on-chain snapshot — amounts live on milestones.
 */
export type MultiReleaseEscrowSnapshot = BaseEscrowSnapshot & {
  roles: MultiReleaseRoles;
  milestones: MultiReleaseMilestone[];
};

/**
 * Full on-chain contract state embedded in list/detail rows.
 */
export type EscrowSnapshot =
  | SingleReleaseEscrowSnapshot
  | MultiReleaseEscrowSnapshot;

/**
 * Narrow snapshot by escrow type.
 */
export type EscrowSnapshotFor<T extends EscrowType> = T extends "single-release"
  ? SingleReleaseEscrowSnapshot
  : MultiReleaseEscrowSnapshot;
