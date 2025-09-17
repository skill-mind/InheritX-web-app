/* eslint-disable @typescript-eslint/no-explicit-any */
import { myProvider, toEpochTime } from "@/lib/utils";
import {
  useAccount,
  useBlockNumber,
  useContract,
  useReadContract,
  useSendTransaction,
  useTransactionReceipt,
} from "@starknet-react/core";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Abi, Account, CallData, Contract, RpcProvider } from "starknet";
import { INHERITX_CONTRACT_ADDRESS } from "@/constant/ca_address";
import { InheritXAbi } from "@/abi/abi";

// const BEARER_TOKEN = process.env.NEXT_PUBLIC_BEARER_TOKEN || "";

// Utility function to perform contract read operations
export function useContractFetch(
  abi: Abi,
  functionName: string,
  args: (string | number)[],
  contract_address: string = INHERITX_CONTRACT_ADDRESS
) {
  const {
    data: readData,
    refetch: dataRefetch,
    isError: readIsError,
    isLoading: readIsLoading,
    error: readError,
    isFetching: readRefetching,
  } = useReadContract({
    abi: abi,
    functionName: functionName,
    // @ts-expect-error 0x0 error
    address: contract_address,
    args: args,
    refetchInterval: 600000,
  });

  return {
    readData,
    dataRefetch,
    readIsError,
    readIsLoading,
    readError,
    readRefetching,
  };
}

export function useAddressCreatedPlans() {
  const { address } = useAccount();

  interface ContractGroupData {
    plan_name: string;
    plan_description?: string;
    plan_asset_amount: number;
    plan_asset_type: number | void | string;
    plan_created_at: number | string;
    owner_address?: string;
    plan_beneficiary_count: number;
    plan_status: number | string | void;
  }

  const [transaction, setTransaction] = useState<
    ContractGroupData[] | undefined
  >(undefined);

  /// list of group an address has shares in
  const { readData: planSummaryList } = useContractFetch(
    InheritXAbi,
    "get_plan_summary",
    [3]
  );

  function getPlanType(type: any): string {
    if (!type) {
      console.log("Type is empty/undefined");
      return "Unknown";
    }

    // If there's a 'variant' wrapper (CairoCustomEnum format)
    if ("variant" in type) {
      const v = type.variant;
      console.log("Checking variant", v);

      // If it's already a string
      if (typeof v === "string") {
        console.log("Variant is string:", v);
        return v;
      }

      // If it's an object (e.g. { USDC: {}, STRK: undefined, ... })
      if (v && typeof v === "object") {
        const found = Object.entries(v).find(
          ([k, val]) => val !== undefined && val !== null
        );
        console.log("Found inside variant:", found);
        if (found) return found[0];
      }
    }

    // Fallback: scan top-level keys
    console.log("Falling back to top-level scan", type);
    const foundTop = Object.entries(type).find(
      ([k, val]) => val !== undefined && val !== null
    );
    console.log("FoundTop:", foundTop);

    return foundTop ? foundTop[0] : "Unknown";
  }

  // getPlanType(planSummaryList[3]);

  useEffect(() => {
    if (!planSummaryList || !address) return; //
    const planSummary: ContractGroupData[] = [];
    console.log("planSummaryList", planSummaryList);

    planSummary.push({
      plan_name: planSummaryList[0]?.toString(),
      plan_description: planSummaryList[1]?.toString(),
      plan_asset_amount: Number(planSummaryList[2]),
      plan_asset_type: getPlanType(planSummaryList[3]),
      plan_created_at: toEpochTime(planSummaryList[4]) || 0,
      owner_address: planSummaryList[5]
        ? `0x0${planSummaryList[5].toString(16)}`
        : "",
      plan_beneficiary_count: Number(planSummaryList[6]),
      plan_status: getPlanType(planSummaryList[7]),
    });

    setTransaction(planSummary);
  }, [planSummaryList, address]);

  console.log("address XXXXXXXXXXXXXXX", address);
  console.log("planSummaryList XXXXXXXXXXXXXXX", planSummaryList);

  return { transaction };
}

// Utility function to perform contract write operations
export function useContractWriteUtility(
  functionName: string,
  args: any[],
  abi: Abi
) {
  const { contract } = useContract({
    abi,
    address: INHERITX_CONTRACT_ADDRESS,
  });

  const calls = useMemo(() => {
    if (
      !contract ||
      !args ||
      args.some(
        (arg) => arg === undefined || arg === null || arg === "0x" || arg === ""
      )
    ) {
      return undefined;
    }

    return [contract.populate(functionName, args)];
  }, [contract, functionName, args]);

  const {
    send: writeAsync,
    data: writeData,
    isPending: writeIsPending,
  } = useSendTransaction({ calls });

  const {
    isLoading: waitIsLoading,
    data: waitData,
    status: waitStatus,
    isError: waitIsError,
    error: waitError,
  } = useTransactionReceipt({
    hash: writeData?.transaction_hash,
    watch: true,
  });

  return {
    writeAsync,
    writeData,
    writeIsPending,
    waitIsLoading,
    waitData,
    waitStatus,
    waitIsError,
    waitError,
    calls,
  };
}

// Utility function to get contract events
type ContractEvent = {
  from_address: string;
  keys: string[];
  data: string[];
};

export function useContractEvents(
  enabled: boolean = true,
  interval: number = 3000,
  limit: number = 5
) {
  const provider = useMemo(
    () => new RpcProvider({ nodeUrl: process.env.NEXT_PUBLIC_RPC_URL! }),
    []
  );
  const [events, setEvents] = useState<ContractEvent[]>([]);
  const lastCheckedBlockRef = useRef(0);
  const { data: blockNumber } = useBlockNumber({ refetchInterval: interval });

  const checkForEvents = useCallback(
    async (currentBlockNumber: number) => {
      if (
        !INHERITX_CONTRACT_ADDRESS ||
        currentBlockNumber <= lastCheckedBlockRef.current
      ) {
        return;
      }

      try {
        const fromBlock = lastCheckedBlockRef.current + 1;
        const fetchedEvents = await provider.getEvents({
          address: INHERITX_CONTRACT_ADDRESS,
          from_block: { block_number: fromBlock },
          to_block: { block_number: currentBlockNumber },
          chunk_size: 500,
        });

        if (fetchedEvents?.events?.length) {
          setEvents((prev) => [...prev, ...fetchedEvents.events]);
        }

        lastCheckedBlockRef.current = currentBlockNumber;
      } catch (error) {
        console.error("Error checking for events:", error);
      }
    },
    [provider]
  );

  useEffect(() => {
    if (enabled && INHERITX_CONTRACT_ADDRESS && blockNumber) {
      checkForEvents(blockNumber);
    }
  }, [blockNumber, checkForEvents, enabled]);

  const lastEvents = useMemo(() => {
    return [...events].reverse().slice(0, limit);
  }, [events, limit]);

  return {
    events,
    lastEvents,
    total: events.length,
  };
}

export async function readContractWithStarknetJs(
  functionName: string,
  args: any[] = []
): Promise<any> {
  const provider = new RpcProvider({
    nodeUrl: process.env.NEXT_PUBLIC_RPC_URL,
  });

  // Get the contract ABI from the chain
  const { abi } = await provider.getClassAt(INHERITX_CONTRACT_ADDRESS);
  if (!abi) {
    throw new Error("No ABI found for the contract.");
  }

  // Instantiate contract
  const contract = new Contract(abi, INHERITX_CONTRACT_ADDRESS, provider);

  // Dynamically call the function
  if (typeof contract[functionName] !== "function") {
    throw new Error(
      `Function '${functionName}' does not exist on the contract.`
    );
  }

  const result = await contract[functionName](...args);
  return result;
}

export async function readTokenBalance(
  tokenContractAddress: `0x{string}`,
  address: `0x{string}`
) {
  const provider = new RpcProvider({
    nodeUrl: process.env.NEXT_PUBLIC_RPC_URL,
  });

  // Get the contract ABI from the chain
  const { abi } = await provider.getClassAt(tokenContractAddress);
  if (!abi) {
    throw new Error("No ABI found for the contract.");
  }

  // Instantiate contract
  const contract = new Contract(abi, tokenContractAddress, provider);

  // Dynamically call the function
  if (typeof contract["balance_of"] !== "function") {
    throw new Error(`Function 'balance_of' does not exist on the contract.`);
  }

  const result = await contract["balance_of"](address);

  return result;
}

export async function writeContractWithStarknetJs(
  contractAddress: string,
  entrypoint: string,
  args: any, //Object of arguments e.g. {uri: "1234"}
  account: Account
) {
  const result = await account.execute({
    contractAddress: contractAddress,
    entrypoint,
    calldata: CallData.compile(args),
  });

  const status = await myProvider.waitForTransaction(result.transaction_hash);

  return { result, status };
}

// export const fetchContentFromIPFS = async (cid: string) => {
//   try {
//     const response = await fetch(
//       `${process.env.NEXT_PUBLIC_PINATA_GATEWAY_URL}${cid}?pinataGatewayToken=${process.env.NEXT_PUBLIC_PINATA_GATEWAY_TOKEN}`
//     );
//     const data = await response.json();

//     return { ...data, cid: cid };
//   } catch (error) {
//     console.error(`Error fetching data for CID ${cid}:`, error);
//     return null;
//   }
// };

// export const uploadImageToPinata = async (file: File): Promise<string> => {
//   const formData = new FormData();
//   formData.append("file", file);

//   const res = await fetch(`https://api.pinata.cloud/pinning//pinFileToIPFS`, {
//     method: "POST",
//     headers: {
//       Authorization: `Bearer ${BEARER_TOKEN}`,
//     },
//     body: formData,
//   });

//   if (!res.ok) {
//     throw new Error("Image upload to Pinata failed");
//   }

//   const data = await res.json();
//   return data.IpfsHash;
// };

// export const uploadJSONToPinata = async (jsonData: object): Promise<string> => {
//   const res = await fetch(`https://api.pinata.cloud/pinning/pinJSONToIPFS`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${BEARER_TOKEN}`,
//     },
//     body: JSON.stringify(jsonData),
//   });

//   if (!res.ok) {
//     throw new Error("Metadata upload to Pinata failed");
//   }

//   const data = await res.json();
//   return data.IpfsHash;
// };
