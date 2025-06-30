<p align="center"> <img src="https://github.com/user-attachments/assets/5b182044-dceb-41f5-acf0-da22dea7c98a" alt="CLR-S (2)"> </p>

# Trustless Work <a href="https://www.npmjs.com/package/@trustless-work/escrow" target="_blank">React Library</a>

A powerful React library for integrating Trustless Work's escrow and dispute resolution system into your applications. This library provides a set of React hooks and utilities to interact with the Trustless Work API.

## Installation

```bash
npm install @trustless-work/escrow
# or
yarn add @trustless-work/escrow
```

## Quick Start

1. Trustless Work React provides the TrustlessWorkConfig to provide all the custom hooks and entities to the whole project. To achieve this you'll need to create a Provider.

```tsx
"use client"; // make sure this is a client component

import React from "react";
import {
  // development environment = "https://dev.api.trustlesswork.com"
  development,

  // mainnet environment = "https://api.trustlesswork.com"
  mainNet,
  TrustlessWorkConfig,
} from "@trustless-work/escrow";

interface TrustlessWorkProviderProps {
  children: React.ReactNode;
}

export function TrustlessWorkProvider({
  children,
}: TrustlessWorkProviderProps) {
  /**
   * Get the API key from the environment variables
   */
  const apiKey = process.env.NEXT_PUBLIC_API_KEY || "";

  return (
    <TrustlessWorkConfig baseURL={development} apiKey={apiKey}>
      {children}
    </TrustlessWorkConfig>
  );
}
```

2. Wrap your app in the provider

```tsx
import { TrustlessWorkProvider} from "@/trustless-work-provider.tsx";
 
export function App() {
  return (
    <TrustlessWorkProvider>
      <YourApp />
    </TrustlessWorkProvider>
  );
}
```

3. Use the hooks in your components:

```tsx
import { useInitializeEscrow, useGetEscrow } from '@trustless-work/escrow/hooks';

function YourComponent() {
  const { deployEscrow } = useInitializeEscrow();
  const { getEscrow } = useGetEscrow();

  // Use the hooks...
}
```

## State Management Integration

This library is designed to be flexible and work with any state management solution. The hooks expose functions that you can integrate with your preferred state management library.

### With TanStack Query (Recommended)

```tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TrustlessWorkConfig } from '@trustless-work/escrow';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TrustlessWorkConfig baseURL={development} apiKey={apiKey}>
        <YourApp />
      </TrustlessWorkConfig>
    </QueryClientProvider>
  );
}

// Usage in components
import { useQuery } from '@tanstack/react-query';
import { useGetEscrowsFromIndexerByRole } from '@trustless-work/escrow/hooks';

export const useEscrowsByRoleQuery = (params) => {
  const { getEscrowsByRole } = useGetEscrowsFromIndexerByRole();

  return useQuery({
    queryKey: ["escrows", params.roleAddress, params.role],
    queryFn: () => getEscrowsByRole(params),
    enabled: !!params.roleAddress && !!params.role,
    staleTime: 5 * 60 * 1000,
  });
};
```

### With Zustand

```tsx
import { create } from 'zustand';
import { useGetEscrowsFromIndexerByRole } from '@trustless-work/escrow/hooks';

const useEscrowStore = create((set, get) => ({
  escrows: [],
  isLoading: false,
  error: null,
  
  fetchEscrows: async (params) => {
    const { getEscrowsByRole } = useGetEscrowsFromIndexerByRole();
    
    set({ isLoading: true, error: null });
    try {
      const escrows = await getEscrowsByRole(params);
      set({ escrows, isLoading: false });
    } catch (error) {
      set({ error, isLoading: false });
    }
  },
}));
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
- `useApproveMilestone`: Approve or reject milestones

### Transaction Management
- `useSendTransaction`: Send a transaction

### Data Fetching
- `useGetEscrowsFromIndexerByRole`: Get escrows by role
- `useGetEscrowsFromIndexerBySigner`: Get escrows by signer

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
4. You can get the API Key from the Trustless Work dApp. Make sure to use the correct API key for the environment you are using. We recommend saving this apiKey in your .env file.
   * - "https://dapp.trustlesswork.com" (production)
   * - "https://dapp.dev.trustlesswork.com" (development)

## Best Practices

1. **State Management**: Choose the state management solution that best fits your project needs
2. **Error Handling**: Implement proper error handling for all API calls
3. **Loading States**: Use loading states to provide better user experience
4. **Type Safety**: Take advantage of TypeScript types for better development experience
5. **API Key Security**: Never expose your API key in client-side code. Use environment variables
6. **Caching**: Implement appropriate caching strategies for better performance

## Example Usage

```tsx
import {
  useInitializeEscrow,
  useSendTransaction,
} from "@trustless-work/escrow/hooks";
import {
  InitializeEscrowPayload
} from "@trustless-work/escrow/types";

export const useInitializeEscrowForm = () => {

 /*
  *  useInitializeEscrow
 */
 const { deployEscrow } = useInitializeEscrow();
 
 /*
  *  useSendTransaction
 */
 const { sendTransaction } = useSendTransaction();

/*
 * onSubmit function, this could be called by form button
*/
 const onSubmit = async (payload: InitializeEscrowPayload) => {

    try {
      /**
       * API call by using the trustless work hooks
       * @Note:
       * - We need to pass the payload to the deployEscrow function
       * - The result will be an unsigned transaction
       */
      const { unsignedTransaction } = await deployEscrow(
        payload,
        "single-release" // or "multi-release"
      );

      if (!unsignedTransaction) {
        throw new Error(
          "Unsigned transaction is missing from deployEscrow response."
        );
      }

      /**
       * @Note:
       * - We need to sign the transaction using your [private key] such as wallet
       * - The result will be a signed transaction
       */
      const signedXdr = await signTransaction({ /* This method should be provided by the wallet */
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
      const data = await sendTransaction(signedXdr);

      /**
       * @Responses:
       * data.status === "SUCCESS"
       * - Escrow updated successfully
       * - Show a success toast
       *
       * data.status == "ERROR"
       * - Show an error toast
       */
      if (data.status === "SUCCESS") {
        toast.success("Escrow Created");
      }
    } catch (error: unknown) {
      // catch error logic
    }
  };
}

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
