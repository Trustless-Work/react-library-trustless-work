<p align="center"> <img src="https://github.com/user-attachments/assets/5b182044-dceb-41f5-acf0-da22dea7c98a" alt="CLR-S (2)"> </p>

# Trustless Work <a href="https://www.npmjs.com/package/@trustless-work/escrow" target="_blank">React Library</a>

React/TypeScript client for Trustless Work Core **v2** escrows: build → sign → send, plus typed reads.

## Installation

```bash
npm install @trustless-work/escrow
# or
yarn add @trustless-work/escrow
# or
pnpm add @trustless-work/escrow
```

## Quick Start

```tsx
"use client";

import {
  development,
  TrustlessWorkConfig,
} from "@trustless-work/escrow";

export function TrustlessWorkProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const apiKey = process.env.NEXT_PUBLIC_API_KEY || "";

  return (
    <TrustlessWorkConfig baseURL={development} apiKey={apiKey}>
      {children}
    </TrustlessWorkConfig>
  );
}
```

Optional wallet-session auth and default platform header:

```tsx
<TrustlessWorkConfig
  baseURL={development}
  apiKey={apiKey}
  getAccessToken={() => sessionToken}
  defaultHeaders={{ "X-TW-Platform": platformId }}
>
  {children}
</TrustlessWorkConfig>
```

Non-React usage: import `TrustlessWorkClient` from `@trustless-work/escrow` — then use `client.rest` or `client.graphql`.

## REST vs GraphQL

| Surface | Import | Use for |
|---------|--------|---------|
| REST | `@trustless-work/escrow/rest` or `useEscrowRest()` | Deploy/fund/actions + `GET /escrows*` |
| GraphQL | `@trustless-work/escrow/graphql` or `useEscrowGraphql()` | Escrow reads: `escrow` / `escrows` |

Hooks also split: `@trustless-work/escrow/hooks/rest` and `@trustless-work/escrow/hooks/graphql`.

```tsx
import { useEscrowRest, useEscrowGraphql } from "@trustless-work/escrow";
import { useGraphqlGetEscrow } from "@trustless-work/escrow/hooks/graphql";

const rest = useEscrowRest();
const { getEscrow } = useGraphqlGetEscrow();
```

## Build → sign → send

```tsx
import {
  useDeployEscrow,
  useSendTransaction,
} from "@trustless-work/escrow/hooks";
import type { DeploySingleReleaseEscrowPayload } from "@trustless-work/escrow/types";

const { deployEscrow } = useDeployEscrow();
const { sendTransaction } = useSendTransaction();

const onSubmit = async (payload: DeploySingleReleaseEscrowPayload) => {
  const { unsignedXdr, contractId } = await deployEscrow(
    payload,
    "single-release",
    // optional attribution:
    // { platformId, subjectId }
  );

  const signedXdr = await signWithWallet(unsignedXdr);
  const result = await sendTransaction(signedXdr);
  // result.txHash, result.ledger, result.contractId?, result.escrow?
};
```

## Reads (Core v2)

### REST

| Hook | API |
|------|-----|
| `useListEscrows` | `GET /escrows` |
| `useGetEscrow` | `GET /escrows/:contractId` |
| `useGetEscrowDetails` | `GET /escrows/details` |
| `useListEscrowEvents` | `GET /escrows/:contractId/events` |
| `useGetEscrowMilestones` | `GET /escrows/:contractId/milestones` |
| `useGetEscrowsMilestones` | `GET /escrows/milestones` |
| `useGetEscrowsFinancial` | `GET /escrows/financial` |

### GraphQL

| Hook | Query |
|------|-------|
| `useGraphqlGetEscrow` | `escrow(contractId)` |
| `useGraphqlListEscrows` | `escrows(...)` |

```tsx
import { useListEscrows, useGetEscrow } from "@trustless-work/escrow/hooks/rest";
import { useQuery } from "@tanstack/react-query";

const { listEscrows } = useListEscrows();
const { getEscrow } = useGetEscrow();

useQuery({
  queryKey: ["escrows", "mine"],
  queryFn: () => listEscrows({ scope: "mine", limit: 20 }),
});

useQuery({
  queryKey: ["escrow", contractId],
  queryFn: () => getEscrow(contractId),
  enabled: !!contractId,
});
```

List rows (REST) are `EscrowSummary` (`contractId`, `type`, `status`, full camelCased `snapshot`). There is no UUID `id` / `escrowId`.

## Operate hooks

- `useDeployEscrow`
- `useUpdateEscrow`, `useFundEscrow`, `useReleaseFunds`
- `useStartDispute`, `useResolveDispute`, `useWithdrawRemainingFunds`
- `useChangeMilestoneStatus`, `useApproveMilestones`, `useApproveAndReleaseMilestones`, `useManageMilestones`
- `useSendTransaction`

## Types

Import from `@trustless-work/escrow/types`:

- **Operate:** `DeploySingleReleaseEscrowPayload`, `DeployEscrowResponse`, `BuildTransactionResponse`, …
- **Reads:** `EscrowSummary`, `EscrowSnapshot`, `EscrowEvent`, `EscrowFinancial`, `ListEscrowsParams`, `ListEscrowsResponse`, …

## Environment

`development` and `mainNet` currently point at:

`https://trustless-core-production.up.railway.app`

You can pass any Core API `baseURL` string. Get an API key from the Trustless Work dApp.

## Migrating from v4 → v5

Breaking changes aligned with the Core v2 wire contract (2026-07-13):

1. **Removed** legacy helpers: `/helper/get-escrows-by-*`, `/helper/get-escrow-by-contract-ids`, `/helper/get-multiple-escrow-balance` and their hooks.
2. **Use** `useListEscrows` / `useGetEscrow` / `useGetEscrowDetails` / financial & milestones hooks instead.
3. Escrow identity is **`contractId` only** (no UUID).
4. Deploy response includes **`contractId`**: `{ unsignedXdr, txHash, contractId }`.
5. Deploy trustline is `{ contractId, symbol }` (Soroban SAC `C…` + asset code).
6. Use `useDeployEscrow` + `Deploy*EscrowPayload` (no `Initialize*` aliases).

## License

MIT License — see LICENSE file for details.
