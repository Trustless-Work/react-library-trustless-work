/**
 * Milestone
 */
export type BaseMilestone = {
  /**
   * Text describing the function of the milestone.
   */
  description: string;

  /**
   * Milestone status. Ex: Approved, In dispute, etc...
   */
  status: string;

  /**
   * Evidence of work performed by the service provider.
   */
  evidence: string;
};

/**
 * Single Release Milestone
 */
export type SingleReleaseMilestone = BaseMilestone & {
  /**
   * Type discriminator for single release milestone
   */
  type: "single-release";

  /**
   * Approved flag, only if the escrow is single-release
   */
  approved: boolean;
};

/**
 * Multi Release Milestone
 */
export type MultiReleaseMilestone = BaseMilestone & {
  /**
   * Type discriminator for multi release milestone
   */
  type: "multi-release";

  /**
   * Amount to be transferred upon completion of this milestone
   */
  amount: string;

  /**
   * Flags validating certain milestone life states, only if the escrow is multi-release
   */
  flags?: Flags;
};

/**
 * Milestone
 */
export type Milestone = SingleReleaseMilestone | MultiReleaseMilestone;

/**
 * Escrow
 */
export type Escrow = {
  /**
   * Address of the user signing the contract transaction
   */
  signer: string;

  /**
   * ID (address) that identifies the escrow contract
   */
  contractId: string;

  /**
   * Unique identifier for the escrow
   */
  engagementId: string;

  /**
   * Name of the escrow
   */
  title: string;

  /**
   * Roles that make up the escrow structure
   */
  roles: Roles;

  /**
   * Text describing the function of the escrow
   */
  description: string;

  /**
   * Amount to be transferred upon completion of escrow milestones
   */
  amount: string;

  /**
   * Commission that the platform will receive when the escrow is completed
   */
  platformFee: string;

  /**
   * Amount of the token (XLM, USDC, EURC, etc) in the smart contract.
   */
  balance: string;

  /**
   * Objectives to be completed to define the escrow as completed
   */
  milestones: SingleReleaseMilestone[];

  /**
   * Flags validating certain escrow life states
   */
  flags?: Flags;

  /**
   * Information on the trustline that will manage the movement of funds in escrow
   */
  trustline: Trustline;

  /**
   * Field used to identify the recipient's address in transactions through an intermediary account. This value is included as a memo in the transaction and allows the funds to be correctly routed to the wallet of the specified recipient
   */
  receiverMemo: number;
};

/**
 * Single Release Escrow
 */
export type SingleReleaseEscrow = Escrow;

/**
 * Multi Release Escrow
 */
export type MultiReleaseEscrow = Omit<
  Escrow,
  "milestones" | "flags" | "amount"
> & {
  milestones: MultiReleaseMilestone[];
};

/**
 * Trustline
 */
export type Trustline = {
  /**
   * Public address establishing permission to accept and use a specific token.
   */
  address: string;

  /**
   * Number of decimals into which the token is divided.
   */
  decimals: number;
};

/**
 * Roles
 */
export type Roles = {
  /**
   * Address of the entity requiring the service.
   */
  approver: string;

  /**
   * Address of the entity providing the service.
   */
  serviceProvider: string;

  /**
   * Address of the entity that owns the escrow
   */
  platformAddress: string;

  /**
   * Address of the user in charge of releasing the escrow funds to the service provider.
   */
  releaseSigner: string;

  /**
   * Address in charge of resolving disputes within the escrow.
   */
  disputeResolver: string;

  /**
   * Address where escrow proceeds will be sent to
   */
  receiver: string;
};

/**
 * Flags
 */
export type Flags = {
  /**
   * Flag indicating that an escrow is in dispute.
   */
  disputed?: boolean;

  /**
   * Flag indicating that escrow funds have already been released.
   */
  released?: boolean;

  /**
   * Flag indicating that a disputed escrow has already been resolved.
   */
  resolved?: boolean;

  /**
   * Flag indicating whether a milestone has been approved by the approver.
   */
  approved?: boolean;
};
