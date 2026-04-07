"use client";

import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

export function WalletConnectButton() {
  return (
    <div className="wallet-button-shell">
      <WalletMultiButton className="wallet-adapter-button-trigger wallet-button-reset" />
    </div>
  );
}
