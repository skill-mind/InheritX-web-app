"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { connect } from "starknetkit";

/**
 * Hook that returns a function which ensures the user is connected to a wallet
 * before optionally navigating to a target path. Reuses the same connect config
 * as the navbar to keep behaviour consistent.
 */
export default function useEnsureConnected() {
  const router = useRouter();

  const ensureConnectedAndNavigate = useCallback(
    async (path?: string) => {
      try {
        const { wallet } = await connect({
          modalMode: "alwaysAsk",
          dappName: "InheritX - Secure Inheritance",
        });

        if (wallet) {
          if (path) router.push(path);
          return { connected: true };
        }
      } catch (err) {
        console.error("Wallet connection failed", err);
      }

      return { connected: false };
    },
    [router]
  );

  return ensureConnectedAndNavigate;
}
