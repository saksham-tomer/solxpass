"use client";

import { WalletName } from "@solana/wallet-adapter-base";
import React, { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { LuWallet } from "react-icons/lu";
import CyberpunkButton from "./WalletButton";

const WalletConnection = () => {
  const { select, wallets, publicKey, disconnect, connecting } = useWallet();
  const [open, setOpen] = useState<boolean>(false);

  const handleWalletSelect = async (walletName: WalletName) => {
    if (walletName) {
      try {
        select(walletName);
        setOpen(false);
      } catch (error) {
        console.log("Wallet connection error:", error);
      }
    }
  };

  const handleDisconnect = async () => {
    try {
      await disconnect();
    } catch (error) {
      console.error("Error disconnecting wallet:", error);
    }
  };

  return (
    <div className="text-cyan-300">
      <Dialog open={open} onOpenChange={setOpen}>
        <div className="flex gap-2 items-center">
          {!publicKey ? (
            <DialogTrigger asChild>
              <CyberpunkButton aria-label="Connect Wallet">
                {connecting ? (
                  <span className="loading loading-dots loading-xs"></span>
                ) : (
                  <span>Connect Wallet</span>
                )}
              </CyberpunkButton>
            </DialogTrigger>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  className={`
                    relative px-8 py-5 text-sm font-bold text-cyan-300 uppercase
                    bg-gray-900 border-2 border-cyan-500 rounded-full
                    transition-all duration-300 ease-in-out
                    hover:bg-cyan-900 hover:text-cyan-100
                    focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-opacity-50
                   }
                  `}
                >
                  <span className="relative z-10">{`${publicKey
                    .toBase58()
                    .slice(0, 4)}...${publicKey.toBase58().slice(-4)}`}</span>
                  <div className="absolute inset-0 bg-cyan-500 opacity-30 blur-sm rounded-full"></div>
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-purple-500 opacity-30 blur-md rounded-full"></div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-gray-900 border border-cyan-500 rounded-md shadow-lg shadow-cyan-500/50">
                <DropdownMenuItem>
                  <div
                    onClick={handleDisconnect}
                    className="w-full h-full text-center p-2 text-cyan-300 font-mono rounded transition duration-150 ease-in-out hover:bg-cyan-900 hover:text-cyan-100"
                  >
                    Disconnect
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          <DialogContent className="bg-gray-900 border-2 border-cyan-500 backdrop-blur-sm bg-opacity-90 rounded-md shadow-2xl max-w-md">
            <DialogTitle className="text-2xl font-bold text-center mb-6 text-cyan-300">
              Select a Wallet
            </DialogTitle>
            <div className="space-y-4">
              {wallets.map((wallet) => (
                <button
                  key={wallet.adapter.name}
                  onClick={() => handleWalletSelect(wallet.adapter.name)}
                  className="w-full flex items-center space-x-3 hover:bg-cyan-900 text-cyan-300 rounded-md p-3 transition duration-150 ease-in-out border border-cyan-500 hover:shadow-md hover:shadow-cyan-500/50"
                >
                  <Image
                    src={wallet.adapter.icon}
                    alt={wallet.adapter.name}
                    height={30}
                    width={30}
                    className="rounded-full"
                  />
                  <span className="font-medium">{wallet.adapter.name}</span>
                </button>
              ))}
            </div>
          </DialogContent>
        </div>
      </Dialog>
    </div>
  );
};

export default WalletConnection;
