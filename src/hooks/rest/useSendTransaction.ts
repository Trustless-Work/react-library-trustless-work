import { useEscrowRest } from "../../provider";

/**
 * Use the useSendTransaction hook to send a transaction by signing it with the user's private key.
 * @returns A function to send a transaction.
 */
export function useSendTransaction() {
  const rest = useEscrowRest();

  return {
    sendTransaction: (signedXdr: string) => rest.sendTransaction(signedXdr),
  };
}
