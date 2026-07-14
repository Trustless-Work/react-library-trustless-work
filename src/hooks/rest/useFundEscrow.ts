import { useEscrowRest } from "../../provider";
import { EscrowType, FundEscrowPayload } from "../../types";

/**
 * Use the useFundEscrow hook to fund an escrow.
 * @returns A function to fund an escrow.
 */
export function useFundEscrow() {
  const rest = useEscrowRest();

  return {
    fundEscrow: (payload: FundEscrowPayload, type: EscrowType) =>
      rest.fundEscrow(payload, type),
  };
}
