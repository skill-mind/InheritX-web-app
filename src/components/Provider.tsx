"use client";
import React, { useCallback } from "react";

import { sepolia, Chain } from "@starknet-react/chains";
import {
  StarknetConfig,
  publicProvider,
  argent,
  braavos,
  useInjectedConnectors,
  voyager,
  jsonRpcProvider,
} from "@starknet-react/core";

export function StarknetProvider({ children }: { children: React.ReactNode }) {
  const { connectors } = useInjectedConnectors({
    // Show these connectors if the user has no connector installed.
    recommended: [argent(), braavos()],
    // Show recommended connectors even if user has connectors installed
    includeRecommended: "always",
    // Randomize the order of the connectors.
    order: "random",
  });

  const rpc = useCallback((chain: Chain) => {
    // Add fallback RPC providers
    if (chain.id === sepolia.id) {
      return {
        nodeUrl:
          "https://starknet-sepolia.g.alchemy.com/starknet/version/rpc/v0_8/Z-bu_aTuwBtbfy7YQ4vOS2ZPQgWJpZdw",
      };
    }
    // Fallback for other chains
    return {
      nodeUrl: `https://starknet-${chain.network}.g.alchemy.com/v2/your-api-key`,
    };
  }, []);

  const provider = jsonRpcProvider({ rpc });

  // Debug log to check connectors
  console.log("Available connectors:", connectors);

  return (
    <StarknetConfig
      chains={[sepolia]}
      provider={provider}
      connectors={connectors}
      explorer={voyager}
      autoConnect={true}
    >
      {children}
    </StarknetConfig>
  );
}
