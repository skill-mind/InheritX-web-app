"use client";

import { useCallback } from "react";
import { connect } from "starknetkit";

/**
 * Hook that returns a function which ensures the user is connected to a wallet.
 * It does not perform navigation — callers decide what to do next (we now
 * navigate via a centralized /unlock route after connect).
 */
export default function useEnsureConnected() {
  const ensureConnected = useCallback(async () => {
    try {
      const { wallet } = await connect({
        modalMode: "alwaysAsk",
        dappName: "InheritX - Secure Inheritance",
      });

      if (wallet) {
        return { connected: true };
      }
    } catch (err) {
      console.error("Wallet connection failed", err);
    }

    return { connected: false };
  }, []);

  return ensureConnected;
}
