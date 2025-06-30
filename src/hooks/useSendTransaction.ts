import { useTrustlessWorkClient } from "../provider";

/**
 * Use the useSendTransaction hook to send a transaction by signing it with the user's private key.
 * @returns A function to send a transaction.
 */
export function useSendTransaction() {
  const client = useTrustlessWorkClient();

  return {
    sendTransaction: (signedXdr: string) => client.sendTransaction(signedXdr),
  };
}
