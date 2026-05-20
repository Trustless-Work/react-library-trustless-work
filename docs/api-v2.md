# Trustless Work API v2 — referencia y migración del SDK React

Este documento resume la API **HTTP v2 de operaciones escrow** expuesta por **Trustless-Work-Core** (`presentation/http/escrow/**/v2` y `stellar/submit-transaction`) y contrasta con el cliente actual en `react-library-trustless-work` (`src/client.ts` y tipos asociados).

**Fuente de verdad:** código NestJS en `Trustless-Work-Core/src`. Swagger en `/docs`, OpenAPI en `/api`.

**Autenticación:** header `x-api-key`.

**Alcance:** solo endpoints que **construyen o envían** transacciones de escrow. Los métodos del SDK de **lectura/listado de escrows** (`getEscrowsFromIndexer*`, `getEscrowFromIndexer*`, balances, etc.) **quedan fuera** de este documento y no se migran aquí.

---

## 1. Modelo de dos pasos (build → sign → submit)

Los endpoints de escrow **no ejecutan** la transacción: devuelven un **XDR sin firmar** para firmar en el wallet.

| Paso | Método | Ruta | Cuerpo | Respuesta |
|------|--------|------|--------|-----------|
| Build | `POST` / `PUT` | `escrow/{single\|multi}-release/v2/{acción}` | DTO específico | `{ unsignedXdr, txHash }` |
| Submit | `POST` | `stellar/submit-transaction` | `{ signedXdr }` | `txHash`, `ledger`, y opcionalmente `contractId`, `escrow`, `code`, `message` |

**Cambio vs SDK:** `sendTransaction` hoy usa `POST /helper/send-transaction` → en Core es **`POST /stellar/submit-transaction`**. Las respuestas de build usan **`unsignedXdr`**, no `unsignedTransaction` + `status`.

---

## 2. Endpoints — Single release v2

Base: `escrow/single-release/v2`

| Acción | Método | Path | Notas |
|--------|--------|------|--------|
| Deploy | `POST` | `deploy` | Firma `signer`. |
| Fund | `POST` | `fund` | No `fund-escrow`. |
| Update | `PUT` | `update` | Firma `adminAddress`. |
| Change milestone status | `POST` | `change-milestone-status` | Batch `updates` (hasta 50). |
| Approve milestones | `POST` | `approve-milestones` | Batch `milestoneIndexes[]`. |
| Manage milestones | `POST` | `manage-milestones` | Admin; `newMilestones` + `milestoneUpdates`. |
| Release funds | `POST` | `release-funds` | `releaseSigner`. TW address lo inyecta el API. |
| Dispute | `POST` | `dispute` | + `reason` (hasta 500 chars). |
| Resolve dispute | `POST` | `resolve-dispute` | `disputeResolver` + `distributions[]`. |
| Withdraw remaining | `POST` | `withdraw-remaining-funds` | `disputeResolver` + `distributions[]`. |

---

## 3. Endpoints — Multi release v2

Base: `escrow/multi-release/v2`

| Acción | Método | Path | Notas |
|--------|--------|------|--------|
| Deploy | `POST` | `deploy` | Milestones con `amount` y `receiver` cada uno; `roles` sin `receiver`. |
| Fund | `POST` | `fund` | |
| Update | `PUT` | `update` | |
| Change milestone status | `POST` | `change-milestone-status` | Batch `updates[]`. |
| Approve milestones | `POST` | `approve-milestones` | Batch índices. |
| Manage milestones | `POST` | `manage-milestones` | Updates pueden incluir `newAmount?`. |
| Release funds | `POST` | `release-funds` | Batch `milestoneIndexes[]` + `releaseSigner`. |
| Dispute | `POST` | `dispute-milestones` | Batch índices + `reason`. |
| Resolve dispute | `POST` | `resolve-dispute` | Batch índices + `distributions`. |
| Withdraw remaining | `POST` | `withdraw-remaining-funds` | |

---

## 4. Payloads (request bodies)

### 4.1 Deploy

- **Single:** `signer`, `engagementId`, `title`, `description`, `roles`, `amount`, `platformFee`, `milestones[]`, `trustline`.
- **Multi:** igual sin `amount` top-level; cada milestone lleva `amount` + `receiver`; `roles` sin `receiver` + `admin`.

### 4.2 Roles v2

- **Single:** arrays (1–5 direcciones, sin duplicados donde aplique): `approvers[]`, `serviceProviders[]`, `platformAddress`, `releaseSigners[]`, `disputeResolvers[]`, `receiver`, **`admin`**, `observers?`.
- **Multi:** lo mismo **sin** `receiver` (va por milestone).

### 4.3 Milestones

- **Single:** `description`, `status?`, `evidence?`, `approvalsTarget?`.
- **Multi:** lo anterior + `amount` + `receiver`.

### 4.4 Update

`contractId`, `adminAddress`, `escrow` (props completas; `milestones` requeridos por validador on-chain).

### 4.5 Fund

`contractId`, `signer`, `amount`.

### 4.6 Change milestone status

`{ contractId, serviceProvider, updates: [{ milestoneIndex, newStatus, newEvidence? }] }` — índices **`number`**, no string.

### 4.7 Approve milestones

`{ contractId, approver, milestoneIndexes: number[] }`.

### 4.8 Manage milestones

`{ contractId, adminAddress, newMilestones[], milestoneUpdates[] }`.

### 4.9 Release funds

- **Single:** `contractId`, `releaseSigner`.
- **Multi:** + `milestoneIndexes: number[]`.

> La dirección Trustless Work para la comisión de plataforma la inyecta el servidor (`trustlessWorkAddressArg`); no va en el body del cliente.

### 4.10 Dispute

- **Single:** `contractId`, `signer`, `reason`.
- **Multi:** `contractId`, `signer`, `milestoneIndexes[]`, `reason`.

### 4.11 Resolve dispute / withdraw remaining

- **Single:** `contractId`, `disputeResolver`, `distributions[]`.
- **Multi resolve:** + `milestoneIndexes[]`.
- **Withdraw:** misma familia de campos (single y multi en Core).

---

## 5. Respuestas

### Build

```json
{
  "unsignedXdr": "<base64>",
  "txHash": "<sha256 hex>"
}
```

### Submit

`txHash`, `ledger`, y según caso `contractId`, `escrow`, `code`, `message` (deploy vs llamada simple vs indexer lag).

---

## 6. Matriz: SDK (`client.ts`) → API v2 (solo operaciones escrow)

| Método SDK | Actual | v2 Core |
|------------|--------|---------|
| `sendTransaction` | `POST /helper/send-transaction` | `POST /stellar/submit-transaction` |
| `initializeEscrow` | `POST /deployer/:type` | `POST /escrow/:type/v2/deploy` |
| `updateEscrow` | `PUT /escrow/:type/update-escrow` | `PUT /escrow/:type/v2/update` |
| `changeMilestoneStatus` | `POST .../change-milestone-status` | `POST .../v2/change-milestone-status` (batch) |
| `approveMilestone` | `POST .../approve-milestone` | `POST .../v2/approve-milestones` |
| *(nuevo)* | — | `POST .../v2/manage-milestones` |
| `fundEscrow` | `POST .../fund-escrow` | `POST .../v2/fund` |
| `releaseFunds` | multi: `release-milestone-funds` | `POST .../v2/release-funds` (+ TW; multi batch índices) |
| `resolveDispute` | multi: `resolve-milestone-dispute` | `POST .../v2/resolve-dispute` |
| `withdrawRemainingFunds` | multi `withdraw-remaining-funds` | `POST .../v2/withdraw-remaining-funds` (+ TW; single también) |
| `startDispute` | `dispute-escrow` / `dispute-milestone` | `dispute` / `dispute-milestones` + `reason` |

**Fuera de alcance (sin cambios en este doc):** `getEscrowsFromIndexerBySigner`, `getEscrowsFromIndexerByRole`, `getEscrowFromIndexerByContractIds`, `getMultipleEscrowBalances`.

---

## 7. Cambios de tipos sugeridos (operaciones escrow)

Archivos: `types.entity.ts`, `types.payload.ts`, `types.response.ts`, hooks de transacción.

1. `Roles` (single) → arrays + `receiver` + `admin` + `observers`; `MultiReleaseRoles` omite `receiver`.
2. Multi milestone: `amount` + `receiver` por hito; `approvalsTarget` opcional.
3. Índices de milestone: `number` en payloads v2.
4. Approve / change status: modelos batch o adapters de conveniencia.
5. Disputes: `reason` obligatorio; multi con array de índices.
6. Release / resolve / withdraw: sin `trustlessWorkAddress` en payloads (lo inyecta Core).
7. Respuestas build: `unsignedXdr`; submit alineado con Core.
8. Paths con `/v2/` explícito en el cliente.

---

## 8. Operaciones batch (v2)

| Operación | Endpoint | Single-release | Multi-release |
|-----------|----------|----------------|---------------|
| Change milestone status | `POST .../change-milestone-status` | `updates[]` (≤50) | `updates[]` (≤50) |
| Approve milestones | `POST .../approve-milestones` | `milestoneIndexes[]` | `milestoneIndexes[]` |
| Release funds | `POST .../release-funds` | escrow completo | `milestoneIndexes[]` |
| Dispute | `POST .../dispute` o `.../dispute-milestones` | `reason` (escrow) | `milestoneIndexes[]` + `reason` |
| Resolve dispute | `POST .../resolve-dispute` | `distributions[]` | `milestoneIndexes[]` + `distributions[]` |

En el SDK: `changeMilestoneStatus` (batch en ambos), `approveMilestones`, `releaseFunds` / `releaseMilestones` (multi), `startDispute` / `disputeMilestones` (multi).

---

## 9. Nueva operación v2 en el SDK

- `manage-milestones` (single y multi).

---

## 10. Checklist (solo escrow ops)

- [ ] Paths `escrow/{type}/v2/...` + `stellar/submit-transaction`.
- [ ] Tipos roles / milestones / batch / TW address.
- [ ] Hooks: initialize, update, fund, approve, change status, release, dispute, resolve, withdraw (+ manage si aplica).
- [ ] **No modificar** hooks/métodos de get escrows del indexer.
- [ ] Pruebas de integración con API key.
- [ ] Semver mayor si se rompen tipos de operaciones.
