"use client";

import CyberpunkScoreBar from "./Progress";
import AnimatedCyberpunkWalletBalance from "./PriceFeed";
import ProofGraph from "./Chart";
import ProviderCard from "./ProviderCard";
import FlipCard from "./FlipCard";
import AvatarCard from "./AvatarCard";
import { useWallet } from "@solana/wallet-adapter-react";
import SolanaNFTMinter from "@/lib/NftMintClass";
import { useState, useEffect } from "react";

function Dash() {
  const { publicKey, signTransaction, sendTransaction } = useWallet();
  const [minter, setMinter] = useState<SolanaNFTMinter | null>(null);

  useEffect(() => {
    if (publicKey && signTransaction) {
      // Create a signer compatible with Metaplex UMI using the wallet
      const walletSigner = {
        publicKey: publicKey,
        signTransaction: signTransaction,
        signAllTransactions: sendTransaction,
      };

      // Initialize the NFT Minter with the wallet signer
      const solanaMinter = new SolanaNFTMinter(walletSigner, "devnet");
      setMinter(solanaMinter);
    }
  }, [publicKey, signTransaction, sendTransaction]);

  const handleMint = async () => {
    if (!minter) {
      console.error("Minter not initialized");
      return;
    }

    const name = "Your NFT Name";
    const uri = "https://example.com/metadata.json";
    const tokenOwner: string | undefined = publicKey?.toBase58();
    try {
      if (!tokenOwner) {
        throw new Error("Token owner is undefined");
      }
      const result = await minter.createAndMintNFT(name, uri, tokenOwner, 500); // 5% seller fee
      console.log("NFT Minted:", result);
    } catch (error) {
      console.error("Minting failed:", error);
    }
  };

  return (
    <div className="min-w-full min-h-screen bg-gray-900 md:p-4 p-2">
      <div className="pt-8 px-4 mt-20 rounded-3xl bg-gray-800 pb-4 min-w-full flex flex-col md:flex-row">
        <section className="md:w-3/4 flex flex-col items-center p-2 gap-6">
          <CardSection />
          <ProofGraph />
          <ProviderGrid />
        </section>
        <section className="md:w-1/4 bg-gray-800 rounded-3xl p-2">
          <SideContent />
        </section>
      </div>
    </div>
  );
}

function SideContent() {
  return (
    <div className="flex flex-col items-center justify-center gap-12 w-full">
      <CyberpunkScoreBar score={90} maxScore={100} increase={10} />
      <AnimatedCyberpunkWalletBalance />
    </div>
  );
}

function ProviderGrid() {
  return (
    <div className="grid grid-flow-row grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      <ProviderCard
        imageSrc="/ape2.jpg"
        title="Neon Ape"
        highestBid="1.5"
        currency="ETH"
        category="Cybernetic"
        description="A futuristic ape with neon implants."
      />
      <ProviderCard
        imageSrc="/ape2.jpg"
        title="Digital Primate"
        highestBid="2.1"
        currency="ETH"
        category="AI"
        description="An ape evolved for the digital age."
      />
      <ProviderCard
        imageSrc="/ape2.jpg"
        title="Quantum Simian"
        highestBid="1.8"
        currency="ETH"
        category="Quantum"
        description="An ape existing in multiple dimensions."
      />
      <ProviderCard
        imageSrc="/ape2.jpg"
        title="Cyber Gorilla"
        highestBid="2.5"
        currency="ETH"
        category="Augmented"
        description="A gorilla with advanced cybernetic enhancements."
      />
      <ProviderCard
        imageSrc="/ape2.jpg"
        title="Holo Chimp"
        highestBid="1.7"
        currency="ETH"
        category="Holographic"
        description="A chimp existing as a holographic projection."
      />
      <ProviderCard
        imageSrc="/ape2.jpg"
        title="Nano Orangutan"
        highestBid="2.3"
        currency="ETH"
        category="Nanotech"
        description="An orangutan infused with nanobots."
      />
    </div>
  );
}

export default Dash;

function CardSection() {
  return (
    <div className="min-w-full bg-gray-800 rounded-3xl p-2 flex flex-col sm:flex-row gap-2">
      <div className="w-full sm:w-1/2 rounded-3xl">
        <FlipCard />
      </div>
      <div className="w-full sm:w-1/2">
        <AvatarCard />
      </div>
    </div>
  );
}
