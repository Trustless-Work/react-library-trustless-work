import { useTrustlessWorkClient } from "../provider";
import {
  SingleReleaseReleaseFundsPayload,
  MultiReleaseReleaseFundsPayload,
} from "../types/types.payload";
import { EscrowType } from "../types/types";

/**
 * Release funds (v2). Single-release: whole escrow. Multi-release: batch via `milestoneIndexes[]`.
 */
export function useReleaseFunds() {
  const client = useTrustlessWorkClient();

  return {
    releaseFunds: (
      payload:
        | SingleReleaseReleaseFundsPayload
        | MultiReleaseReleaseFundsPayload,
      type: EscrowType
    ) => client.releaseFunds(payload, type),

    /** Multi-release only — batch release milestones (`milestoneIndexes[]`). */
    releaseMilestones: (payload: MultiReleaseReleaseFundsPayload) =>
      client.releaseMilestones(payload),
  };
}
