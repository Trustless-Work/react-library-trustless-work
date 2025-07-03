import { useTrustlessWorkClient } from "../provider";
import { GetEscrowFromIndexerByContractIdParams } from "../types/types.payload";

/**
 * Use the useGetEscrowFromIndexerByContractId hook to get an escrow from the database by contractId.
 * @returns A function to get an escrow from the database by contractId.
 */
export function useGetEscrowFromIndexerByContractId() {
  const client = useTrustlessWorkClient();

  return {
    getEscrowByContractId: (params: GetEscrowFromIndexerByContractIdParams) =>
      client.getEscrowFromIndexerByContractId(params),
  };
}
