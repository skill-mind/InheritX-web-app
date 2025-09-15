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
export function toEpochTime(date: string | Date): number {
  const d = typeof date === "string" ? new Date(date) : date;
  return Math.floor(d.getTime() / 1000);
}

// For creating a cairo enum
export function createCairoEnum(value: string): CairoCustomEnum {
  return new CairoCustomEnum({ [value]: {} });
}

// For copying text to clipboard
export function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text);
}

export function truncateAddress(address: string) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}
