import React, { useState, useEffect } from "react";
import { Sparkles, Wallet } from "lucide-react";
import axios from "axios";
import { useWallet } from "@solana/wallet-adapter-react";

const CyberpunkWalletBalance = () => {
  const [balance, setBalance] = useState(0);
  const walletAddress = useWallet();
  const [walletAddr, setWalletAddress] = useState<string | undefined>();
  useEffect(() => {
    setWalletAddress(walletAddress.publicKey?.toString());
    const fetchBalance = async () => {
      try {
        if (walletAddress.publicKey) {
          const response = await axios.get(
            `/api/balance?walletAddress=${walletAddress.publicKey.toString()}`
          );
          setBalance(response.data);
        }
      } catch (error) {
        console.error(
          "Failed to fetch balance. Please check the wallet address and try again.",
          error
        );
      }
    };

    fetchBalance();
    const interval = setInterval(fetchBalance, 10000); // Update every 10 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center h-auto min-h-[18rem] w-full max-w-md mx-auto rounded-lg p-4 sm:p-8 bg-gray-900">
      <div className="relative p-4 sm:p-8 bg-gray-800 rounded-lg shadow-lg w-full max-w-sm overflow-hidden animate-float">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-red-500 opacity-30 animate-rgb-shift"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <Wallet className="text-cyan-400 animate-pulse" size={24} />
            <Sparkles className="text-yellow-400 animate-spin-slow" size={20} />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-2 animate-shimmer">
            Solana Balance
          </h2>
          <div className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 animate-gradient">
            ${balance}
          </div>
          <div className="mt-4 text-xs sm:text-sm text-gray-400">
            Last updated: {new Date().toLocaleTimeString()}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 animate-slide"></div>
      </div>
    </div>
  );
};

const AnimatedBackground = () => (
  <style jsx global>{`
    @keyframes rgb-shift {
      0% {
        filter: hue-rotate(0deg);
      }
      100% {
        filter: hue-rotate(360deg);
      }
    }
    @keyframes float {
      0% {
        transform: translateY(0px);
      }
      50% {
        transform: translateY(-10px);
      }
      100% {
        transform: translateY(0px);
      }
    }
    @keyframes spin-slow {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
    @keyframes shimmer {
      0% {
        opacity: 1;
      }
      50% {
        opacity: 0.7;
      }
      100% {
        opacity: 1;
      }
    }
    @keyframes gradient {
      0% {
        background-position: 0% 50%;
      }
      50% {
        background-position: 100% 50%;
      }
      100% {
        background-position: 0% 50%;
      }
    }
    @keyframes slide {
      0% {
        transform: translateX(-100%);
      }
      100% {
        transform: translateX(100%);
      }
    }
    .animate-rgb-shift {
      animation: rgb-shift 10s linear infinite;
    }
    // .animate-float {
    //   animation: float 3s ease-in-out infinite;
    // }
    .animate-spin-slow {
      animation: spin-slow 6s linear infinite;
    }
    .animate-shimmer {
      animation: shimmer 2s ease-in-out infinite;
    }
    .animate-gradient {
      background-size: 200% 200%;
      animation: gradient 5s ease infinite;
    }
    .animate-slide {
      animation: slide 3s linear infinite;
    }
  `}</style>
);

const AnimatedCyberpunkWalletBalance = () => (
  <>
    <AnimatedBackground />
    <CyberpunkWalletBalance />
  </>
);

export default AnimatedCyberpunkWalletBalance;
