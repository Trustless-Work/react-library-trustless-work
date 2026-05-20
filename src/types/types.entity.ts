/**
 * Milestone approvals (v2 on-chain shape)
 */
export type MilestoneApprovals = {
  /**
   * Number of distinct approvers required for the milestone.
   */
  target: number;

  /**
   * Distinct approvers that have already approved.
   */
  approvalCount: number;

  /**
   * Wallets that have approved this milestone.
   */
  approvers: string[];
};

/**
 * Base milestone fields shared by single- and multi-release v2.
 */
type BaseMilestone = {
  /**
   * Text describing the function of the milestone.
   */
  description: string;

  /**
   * Milestone status. Ex: pending, in_progress, completed, etc.
   */
  status?: string;

  /**
   * Evidence of work performed by the service provider.
   */
  evidence?: string;

  /**
   * Number of distinct approvers required (deploy-time). Defaults to 1 on-chain.
   */
  approvalsTarget?: number;

  /**
   * On-chain approval state (read responses).
   */
  approvals?: MilestoneApprovals;
};

/**
 * Single Release Milestone (v2)
 */
export type SingleReleaseMilestone = BaseMilestone;

/**
 * Per-milestone dispute state (multi-release v2)
 */
export type MilestoneDispute = {
  isDisputed: boolean;
  reason: string;
  resolved: boolean;
};

/**
 * Multi Release Milestone (v2)
 */
export type MultiReleaseMilestone = BaseMilestone & {
  /**
   * Amount allocated to this milestone in human-readable decimals.
   */
  amount: number;

  /**
   * Final beneficiary of this milestone's payout. Each milestone may pay a
   * different address (multi-release v2 has no `roles.receiver`).
   */
  receiver: string;

  /**
   * Per-milestone dispute state (read responses).
   */
  dispute?: MilestoneDispute;

  /**
   * True after this milestone's funds have been released.
   */
  released?: boolean;
};

/**
 * Escrow-level dispute (single-release v2)
 */
export type Dispute = {
  isDisputed: boolean;
  reason: string;
  resolved: boolean;
};

/**
 * Trustline (v2)
 */
export type Trustline = {
  /**
   * Issuer account address (G...) when resolved from symbol+address.
   */
  address: string;

  /**
   * Soroban contract address of the asset (C...).
   */
  contractId: string;

  /**
   * Symbol of the token, example: USDC, EURC, etc.
   */
  symbol: string;
};

/**
 * Roles (v2) — single-release. Operational roles are arrays (1–5 distinct
 * addresses). `receiver` is escrow-level (one beneficiary for the full release).
 */
export type Roles = {
  approvers: string[];
  serviceProviders: string[];
  platformAddress: string;
  releaseSigners: string[];
  disputeResolvers: string[];
  receiver: string;
  admin: string;
  observers?: string[];
};

/**
 * Multi-release roles (v2) — same as `Roles` without `receiver`; each milestone
 * defines its own receiver (see `MultiReleaseMilestone`).
 */
export type MultiReleaseRoles = Omit<Roles, "receiver">;

/**
 * Role filter for indexer queries (unchanged helper endpoints).
 */
export type Role =
  | "approver"
  | "serviceProvider"
  | "platformAddress"
  | "releaseSigner"
  | "disputeResolver"
  | "receiver"
  | "admin"
  | "observer"
  | "signer";

/**
 * Single Release Escrow (v2)
 */
export type SingleReleaseEscrow = {
  /**
   * Deployed escrow contract id (C...).
   */
  contractId: string;

  /**
   * Factory / base contract id (C...).
   */
  contractBaseId?: string;

  /**
   * Address of the user signing the deploy transaction.
   */
  signer: string;

  /**
   * Unique identifier for the escrow.
   */
  engagementId: string;

  /**
   * Name of the escrow.
   */
  title: string;

  /**
   * Text describing the function of the escrow.
   */
  description: string;

  /**
   * Roles that make up the escrow structure.
   */
  roles: Roles;

  /**
   * Total escrow amount in human-readable decimals.
   */
  amount: number;

  /**
   * Commission that the platform will receive when the escrow is completed (percent).
   */
  platformFee: number;

  /**
   * Amount of the token in the smart contract (0 until funded).
   */
  balance: number;

  /**
   * Objectives to be completed to define the escrow as completed.
   */
  milestones: SingleReleaseMilestone[];

  /**
   * Escrow-level dispute state.
   */
  dispute?: Dispute;

  /**
   * True after release_funds succeeds.
   */
  released?: boolean;

  /**
   * Deploy transaction hash, if known.
   */
  transactionHash?: string | null;

  /**
   * Information on the trustline that manages fund movement.
   */
  trustline: Trustline;
};

/**
 * Multi Release Escrow (v2) — no top-level amount; each milestone carries amount
 * and receiver.
 */
export type MultiReleaseEscrow = Omit<
  SingleReleaseEscrow,
  "amount" | "milestones" | "dispute" | "released" | "roles"
> & {
  roles: MultiReleaseRoles;
  milestones: MultiReleaseMilestone[];
};
