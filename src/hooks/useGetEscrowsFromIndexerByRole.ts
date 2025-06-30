import { useTrustlessWorkClient } from "../provider";
import { GetEscrowsFromIndexerByRoleParams } from "../types/types.payload";

/**
 * Use the useGetEscrowsFromIndexerByRole hook to get multiple escrows from the database by role.
 * @returns A function to get multiple escrows from the database by role.
 */
export function useGetEscrowsFromIndexerByRole() {
  const client = useTrustlessWorkClient();

  return {
    getEscrowsByRole: (params: GetEscrowsFromIndexerByRoleParams) =>
      client.getEscrowsFromIndexerByRole(params),
  };
}
