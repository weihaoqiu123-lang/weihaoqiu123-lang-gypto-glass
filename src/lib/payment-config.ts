export const paymentConfig = {
  chain: "Solana",
  token: "USDC",
  tokenMint:
    process.env.NEXT_PUBLIC_USDC_MINT?.trim() ||
    "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
  merchantWallet:
    process.env.NEXT_PUBLIC_MERCHANT_WALLET?.trim() ||
    "Bi85yzXk3JGjsbw5uyCRGnjbzHeFWg7L38ypzKvekVmY",
  rpcUrl:
    process.env.NEXT_PUBLIC_SOLANA_RPC_URL?.trim() || "https://api.mainnet-beta.solana.com",
} as const;

export function paymentReadiness() {
  return {
    hasMerchantWallet: Boolean(paymentConfig.merchantWallet),
    hasTokenMint: Boolean(paymentConfig.tokenMint),
    chain: paymentConfig.chain,
    token: paymentConfig.token,
    rpcUrl: paymentConfig.rpcUrl,
  };
}
