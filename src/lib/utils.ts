import { clsx, type ClassValue } from "clsx";
import { CairoCustomEnum, RpcProvider } from "starknet";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const myProvider = new RpcProvider({
  nodeUrl: process.env.NEXT_PUBLIC_RPC_URL,
});

// For converting Hex to contract address
export function bigintToHexAddress(value: bigint): `0x${string}` {
  return `0x${value.toString(16)}`;
}

// For converting date to epoch time
// export function toEpochTime(date: string | Date): number {
//   const d = typeof date === "string" ? new Date(date) : date;
//   return Math.floor(d.getTime() / 1000);
// }

// For converting epoch time to date
export function toEpochTime(time: string) {
  const epochSeconds = String(time).replace("n", "");

  const date = new Date(+epochSeconds * 1000); // multiply by 1000 to convert to milliseconds

  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
}

// For creating a cairo enum
export function createCairoEnum(value: string): CairoCustomEnum {
  return new CairoCustomEnum({ [value]: {} });
}

// For copying text to clipboard
export function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text);
}

export function truncateAddress(address?: string) {
  if (!address) return "";
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

// Asset type enum to string conversion
export function getAssetTypeString(assetType: number): string {
  switch (assetType) {
    case 0:
      return "STRK";
    case 1:
      return "USDT";
    case 2:
      return "USDC";
    default:
      return "STRK";
  }
}

// Format asset amount from wei-like units to human-readable format
export function formatAssetAmount(amount: number, _assetType: number): string {
  const decimals = 18; // Most tokens use 18 decimals
  const formattedAmount = amount / Math.pow(10, decimals);
  return formattedAmount.toFixed(2);
}
