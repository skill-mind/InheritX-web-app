import React from "react";
import { AutoSwappr, TOKEN_ADDRESSES } from "autoswap-sdk";

const AutoSwapperPage = () => {
  const AUTOSWAPPR_CONTRACT_ADDRESS =
    "0x05582ad635c43b4c14dbfa53cbde0df32266164a0d1b36e5b510e5b34aeb364b";

  // Initialize the SDK
  const autoSwappr = new AutoSwappr({
    contractAddress: AUTOSWAPPR_CONTRACT_ADDRESS,
    rpcUrl: "https://rpc.starknet-mainnet.com",
    accountAddress: "",
    privateKey: "",
  });

  // Execute swap
  const result = autoSwappr.executeSwap(
    TOKEN_ADDRESSES.STRK,
    TOKEN_ADDRESSES.USDC,
    {
      amount: "1", // 1 STRK
    }
  );

  console.log("Swap result:", result);

  return (
    <div>
      AutoSwapper
      <div>Token from</div>
      <div>Token to</div>
      <div>Amount</div>
    </div>
  );
};

export default AutoSwapperPage;
