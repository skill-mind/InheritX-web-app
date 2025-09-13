"use client";
import { Connector, useConnect } from "@starknet-react/core";
import React, { useState } from "react";
import { X, Loader2 } from "lucide-react";
import Image from "next/image";

interface ConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function ConnectWalletModal({ isOpen, onClose }: ConnectModalProps) {
  const { connectAsync, connectors } = useConnect();
  const [connecting, setConnecting] = useState<string | null>(null);

  const handleConnect = async (connector: Connector) => {
    try {
      setConnecting(connector.id);
      await connectAsync({ connector });
      onClose();
    } catch (error) {
      console.error(`Failed to connect to ${connector.name}:`, error);
      // You might want to show an error message to the user here
    } finally {
      setConnecting(null);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed top-[400px] inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-[#0E0E10] p-6 relative w-[90%] max-w-[550px] rounded-lg shadow-lg max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
        style={{
          boxShadow: "4px 4px 9.7px 0px #25273599",
        }}
      >
        {/* Close button */}
        <button
          className="absolute top-4 right-4 text-white cursor-pointer hover:opacity-75 transition-opacity"
          onClick={onClose}
          disabled={connecting !== null}
        >
          <X size={24} />
        </button>

        {/* Heading */}
        <h2 className="text-white text-center text-2xl font-semibold mb-4">
          Connect Wallet
        </h2>
        <h3 className="text-[#D9D9D9] text-center text-base mb-9 font-light">
          Choose a wallet to connect to StarkNet
        </h3>

        {/* Wallet connectors */}
        <div className="space-y-3 mt-6">
          {connectors.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-400">No wallets detected.</p>
              <p className="text-gray-500 text-sm mt-2">
                Please install a StarkNet wallet extension.
              </p>
            </div>
          ) : (
            connectors.map((connector: Connector) => (
              <button
                key={connector.id}
                className="w-full flex items-center space-x-3 py-3 px-4 bg-[#259BA6] hover:bg-[#1E7F88] disabled:bg-gray-600 disabled:cursor-not-allowed rounded-md transition-colors duration-200 text-white cursor-pointer"
                onClick={() => handleConnect(connector)}
                disabled={connecting !== null}
              >
                {connecting === connector.id ? (
                  <Loader2 className="w-7 h-7 animate-spin" />
                ) : connector.icon ? (
                  <Image
                    src={connector.icon as string}
                    className="w-7 h-7"
                    alt={connector.name}
                  />
                ) : (
                  <div className="w-7 h-7 bg-gray-500 rounded flex items-center justify-center">
                    <span className="text-xs font-bold">
                      {connector.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
                <div className="text-left flex-1">
                  <div className="font-medium text-base">{connector.name}</div>
                  <div className="text-sm text-gray-200">
                    {connecting === connector.id
                      ? "Connecting..."
                      : `Connect using ${connector.name}`}
                  </div>
                </div>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default ConnectWalletModal;
