import { useEscrowRest } from "../../provider";
import {
  SingleReleaseReleaseFundsPayload,
  MultiReleaseReleaseFundsPayload,
} from "../../types/types.payload";
import { EscrowType } from "../../types/types";

/**
 * Release funds (v2). Single-release: whole escrow. Multi-release: batch via `milestoneIndexes[]`.
 */
export function useReleaseFunds() {
  const rest = useEscrowRest();

  return {
    releaseFunds: (
      payload:
        | SingleReleaseReleaseFundsPayload
        | MultiReleaseReleaseFundsPayload,
      type: EscrowType
    ) => rest.releaseFunds(payload, type),

    /** Multi-release only — batch release milestones (`milestoneIndexes[]`). */
    releaseMilestones: (payload: MultiReleaseReleaseFundsPayload) =>
      rest.releaseMilestones(payload),
  };
}
