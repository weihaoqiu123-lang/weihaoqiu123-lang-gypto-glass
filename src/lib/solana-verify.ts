import { Connection, ParsedTransactionWithMeta, PublicKey } from "@solana/web3.js";
import type { OrderRecord } from "@/lib/orders";
import { paymentConfig } from "@/lib/payment-config";

type VerificationResult =
  | {
      ok: true;
      signature: string;
      transaction: ParsedTransactionWithMeta;
    }
  | {
      ok: false;
      reason: string;
    };

function toMinorUnits(amountUsdc: number) {
  return BigInt(Math.round(amountUsdc * 1_000_000));
}

function getMerchantReceivedAmount(transaction: ParsedTransactionWithMeta) {
  const pre = transaction.meta?.preTokenBalances ?? [];
  const post = transaction.meta?.postTokenBalances ?? [];
  const mint = paymentConfig.tokenMint;
  const owner = paymentConfig.merchantWallet;

  let preAmount = BigInt(0);
  let postAmount = BigInt(0);

  for (const balance of pre) {
    if (balance.mint === mint && balance.owner === owner) {
      preAmount += BigInt(balance.uiTokenAmount.amount);
    }
  }

  for (const balance of post) {
    if (balance.mint === mint && balance.owner === owner) {
      postAmount += BigInt(balance.uiTokenAmount.amount);
    }
  }

  return postAmount - preAmount;
}

function hasReference(transaction: ParsedTransactionWithMeta, reference: string) {
  return transaction.transaction.message.accountKeys.some((key) => {
    const value =
      typeof key === "object" && key !== null && "pubkey" in key
        ? String(key.pubkey)
        : String(key);
    return value === reference;
  });
}

function hasMerchantAccount(transaction: ParsedTransactionWithMeta) {
  return transaction.transaction.message.accountKeys.some((key) => {
    const value =
      typeof key === "object" && key !== null && "pubkey" in key
        ? String(key.pubkey)
        : String(key);
    return value === paymentConfig.merchantWallet;
  });
}

export async function verifySolanaUsdcPayment(
  order: OrderRecord,
  txSignature: string,
): Promise<VerificationResult> {
  if (!paymentConfig.merchantWallet) {
    return { ok: false, reason: "Merchant wallet is not configured." };
  }

  try {
    new PublicKey(order.paymentReference);
  } catch {
    return { ok: false, reason: "Invalid payment reference on order." };
  }

  const connection = new Connection(paymentConfig.rpcUrl, "confirmed");
  const transaction = await connection.getParsedTransaction(txSignature, {
    commitment: "confirmed",
    maxSupportedTransactionVersion: 0,
  });

  if (!transaction) {
    return { ok: false, reason: "Transaction not found or not yet confirmed." };
  }

  if (transaction.meta?.err) {
    return { ok: false, reason: "Transaction failed onchain." };
  }

  if (!hasReference(transaction, order.paymentReference)) {
    return { ok: false, reason: "Payment reference was not found in this transaction." };
  }

  if (!hasMerchantAccount(transaction)) {
    return { ok: false, reason: "Merchant wallet was not involved in this transaction." };
  }

  const received = getMerchantReceivedAmount(transaction);
  const required = toMinorUnits(order.amountUsdc);

  if (received < required) {
    return {
      ok: false,
      reason: `Received amount is too low. Expected at least ${order.amountUsdc} USDC.`,
    };
  }

  return {
    ok: true,
    signature: txSignature,
    transaction,
  };
}
