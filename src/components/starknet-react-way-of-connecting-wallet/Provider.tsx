// "use client";
// import React, { useCallback } from "react";

// import { sepolia, Chain } from "@starknet-react/chains";
// import {
//   StarknetConfig,
//   argent,
//   braavos,
//   useInjectedConnectors,
//   voyager,
//   jsonRpcProvider,
//   paymasterRpcProvider,
// } from "@starknet-react/core";

// export function StarknetProvider({ children }: { children: React.ReactNode }) {
//   const { connectors } = useInjectedConnectors({
//     // Show these connectors if the user has no connector installed.
//     recommended: [argent(), braavos()],
//     // Show recommended connectors even if user has connectors installed
//     includeRecommended: "always",
//     // Randomize the order of the connectors.
//     order: "random",
//   });

//   const rpc = useCallback((chain: Chain) => {
//     // Add fallback RPC providers
//     if (chain.id === sepolia.id) {
//       return {
//         nodeUrl: process.env.NEXT_PUBLIC_RPC_URL,
//       };
//     }
//     // Fallback for other chains
//     return {
//       nodeUrl: process.env.NEXT_PUBLIC_RPC_URL,
//     };
//   }, []);

//   const provider = jsonRpcProvider({ rpc });

//   // Debug log to check connectors
//   console.log("Available connectors:", connectors);

//   return (
//     <StarknetConfig
//       paymasterProvider={paymasterRpcProvider({
//         rpc: () => {
//           return {
//             nodeUrl: process.env.NEXT_PUBLIC_PAYMASTER_URL,
//             headers: {
//               "x-paymaster-api-key":
//                 process.env.NEXT_PUBLIC_PAYMASTER_API ?? "",
//             },
//           };
//         },
//       })}
//       chains={[sepolia]}
//       provider={jsonRpcProvider({
//         rpc: () => ({ nodeUrl: process.env.NEXT_PUBLIC_RPC_URL }),
//       })}
//       connectors={connectors}
//       explorer={voyager}
//       autoConnect={true}
//     >
//       {children}
//     </StarknetConfig>
//   );
// }
