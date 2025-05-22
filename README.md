<p align="center"> <img src="https://github.com/user-attachments/assets/5b182044-dceb-41f5-acf0-da22dea7c98a" alt="CLR-S (2)"> </p>

# Trustless Work React Library

A powerful React library for integrating Trustless Work's escrow and dispute resolution system into your applications. This library provides a set of React hooks and utilities to interact with the Trustless Work API.

## Installation

```bash
npm install @trustless-work/escrow
# or
yarn add @trustless-work/escrow
```

## Quick Start

1. First, wrap your application with the `TrustlessWorkProvider`:
   Make sure that is a client component.

```tsx
"use client" // make sure that is client component

import { TrustlessWorkProvider } from '@trustlesswork/hooks';

function App() {
  return (
    <TrustlessWorkProvider
      baseURL="https://api.trustlesswork.com" // or "https://dev.api.trustlesswork.com" for development
      apiKey="your-api-key"
    >
      <YourApp />
    </TrustlessWorkProvider>
  );
}
```

2. Use the hooks in your components:

```tsx
import { useInitializeEscrow, useGetEscrow } from '@trustless-work/escrow/hooks';

function YourComponent() {
  const { initializeEscrow } = useInitializeEscrow();
  const { getEscrow, escrow } = useGetEscrow();

  await getEscrow({ contractId: 'your-escrow-id', signer: 'signer-wallet' });
  // Use the hooks...
}
```

## Available Hooks

### Escrow Management
- `useInitializeEscrow`: Create a new escrow
- `useGetEscrow`: Fetch escrow details
- `useGetMultipleEscrowBalances`: Get balances for multiple escrows
- `useUpdateEscrow`: Update escrow information
- `useFundEscrow`: Fund an escrow
- `useReleaseFunds`: Release funds from escrow

### Dispute Resolution
- `useStartDispute`: Initiate a dispute
- `useResolveDispute`: Resolve an existing dispute

### Milestone Management
- `useChangeMilestoneStatus`: Update milestone status
- `useChangeMilestoneApprovedFlag`: Approve or reject milestones

### Transaction Management
- `useSendTransaction`: Send a transaction


## Types

The library includes comprehensive TypeScript types for all operations. Key type definitions can be found in:

- `types.entity.ts`: Core entity definitions
- `types.payload.ts`: Request payload types
- `types.response.ts`: API response types

## Environment Setup

The library supports two environments:

- Production: `https://api.trustlesswork.com`
- Development: `https://dev.api.trustlesswork.com`

Make sure to:
1. Use the correct `baseURL` for your environment
2. Store your API key in environment variables
3. Use the appropriate API key for your environment
4. You can get the API Key from the Trustless Work dApp. Make sure to use the correct API key for the environment you are using. We recommed save this apiKey in your .env file.
   * - "https://dapp.trustlesswork.com" (production)
   * - "https://dapp.dev.trustlesswork.com" (development)

## Best Practices

1. **Error Handling**: All hooks return error states that you should handle appropriately
2. **Loading States**: Use the loading states provided by the hooks to show loading indicators
3. **Type Safety**: Take advantage of TypeScript types for better development experience
4. **API Key Security**: Never expose your API key in client-side code. Use environment variables

## Example Usage

```tsx
import { useInitializeEscrow, useSendTransaction } from "@trustless-work/escrow/hooks";
import { InitializeEscrowPayload } from "@trustless-work/escrow/types";

const { deployEscrow } = useInitializeEscrowHook();
const { sendTransaction } = useSendTransaction();


 const onSubmit = async (payload: InitializeEscrowPayload) => {

    try {
      // This is the final payload that will be sent to the API
      const finalPayload: InitializeEscrowPayload = {
        ...payload,
        receiverMemo: payload.receiverMemo ?? 0,
        signer: walletAddress || "",
      };

      /**
       * API call by using the trustless work hooks
       * @Note:
       * - We need to pass the payload to the deployEscrow function
       * - The result will be an unsigned transaction
       */
      const { unsignedTransaction } = await deployEscrow(finalPayload);

      if (!unsignedTransaction) {
        throw new Error(
          "Unsigned transaction is missing from deployEscrow response."
        );
      }

      /**
       * @Note:
       * - We need to sign the transaction using your private key
       * - The result will be a signed transaction
       */
      const signedXdr = await signTransaction({
        unsignedTransaction,
        address: walletAddress || "",
      });

      if (!signedXdr) {
        throw new Error("Signed transaction is missing.");
      }

      /**
       * @Note:
       * - We need to send the signed transaction to the API
       * - The data will be an SendTransactionResponse
       */
      const data = await sendTransaction({
        signedXdr,
        returnEscrowDataIsRequired: true,
      });

      /**
       * @Responses:
       * data.status === "SUCCESS"
       * - Escrow created successfully
       * - Set the escrow in the context
       * - Set the active tab to "escrow"
       * - Show a success toast
       *
       * data.status !== "SUCCESS"
       * - Show an error toast
       */
      if (data && data.status === "SUCCESS") {
        const escrow = buildEscrowFromResponse(
          data as InitializeEscrowResponse,
          walletAddress || ""
        );
        setEscrow(escrow);
        toast.success("Escrow Created");
      }
    } catch (error: unknown) {
      const mappedError = handleError(error as AxiosError | WalletError);
      console.error("Error:", mappedError.message);

      toast.error(
        mappedError ? mappedError.message : "An unknown error occurred"
      );
    }
  };
```

## Contributing

We welcome contributions! Please read our contributing guidelines before submitting pull requests.

## License

MIT License - see LICENSE file for details

# Maintainers | [Telegram](https://t.me/+kmr8tGegxLU0NTA5)

<table align="center">
  <tr>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/6b97e15f-9954-47d0-81b5-49f83bed5e4b" alt="Owner 1" width="150" />
      <br /><br />
      <strong>Tech Rebel | Product Manager</strong>
      <br /><br />
      <a href="https://github.com/techrebelgit" target="_blank">techrebelgit</a>
      <br />
      <a href="https://t.me/Tech_Rebel" target="_blank">Telegram</a>
    </td>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/e245e8af-6f6f-4a0a-a37f-df132e9b4986" alt="Owner 2" width="150" />
      <br /><br />
      <strong>Joel Vargas | Frontend Developer</strong>
      <br /><br />
      <a href="https://github.com/JoelVR17" target="_blank">JoelVR17</a>
      <br />
      <a href="https://t.me/joelvr20" target="_blank">Telegram</a>
    </td>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/53d65ea1-007e-40aa-b9b5-e7a10d7bea84" alt="Owner 3" width="150" />
      <br /><br />
      <strong>Armando Murillo | Full Stack Developer</strong>
      <br /><br />
      <a href="https://github.com/armandocodecr" target="_blank">armandocodecr</a>
      <br />
      <a href="https://t.me/armandocode" target="_blank">Telegram</a>
    </td>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/851273f6-2f91-413d-bd2d-d8dc1f3c2d28" alt="Owner 4" width="150" />
      <br /><br />
      <strong>Caleb Loría | Smart Contract Developer</strong>
      <br /><br />
      <a href="https://github.com/zkCaleb-dev" target="_blank">zkCaleb-dev</a>
      <br />
      <a href="https://t.me/zkCaleb_dev" target="_blank">Telegram</a>
    </td>
  </tr>
</table>
