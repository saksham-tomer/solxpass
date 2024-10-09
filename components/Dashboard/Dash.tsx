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
import { getSession, useSession } from "next-auth/react";
import { calculateTierAndRange } from "@/lib/TierCalculator";
import providerData from "../Data/Provider.json";
import { getNFTByTierAndRange } from "@/lib/NftFilter";
import SolanaNFTMinter2, { mintNFTnow } from "@/lib/OldMint";
import { Connection } from "@solana/web3.js";
import { MetaNft } from "@/lib/Metaplex";

interface NFTItem {
  id: number;
  name: string;
  tier: number;
  range: number;
  category: string;
  image_url: string;
  uri: string;
}

interface Provider {
  id: string;
  name: string;
  category: string;
  score: number;
  description: string;
}

function Dash() {
  // const { publicKey, signTransaction, sendTransaction } = useWallet();
  const [minter, setMinter] = useState<SolanaNFTMinter | null>(null);
  const [usrScore, setUsrScore] = useState<number>(0);
  const [filteredData, setFilteredData] = useState<NFTItem[]>([]);
  const [rangeNum, setRangeNumber] = useState<number>(0);
  const wallet = useWallet();
  const connection = new Connection("https://api.devnet.solana.com");

  useEffect(() => {
    (async () => {
      const session = await getSession();
      if (session) {
        console.log(session);
        try {
          const res = await fetch(
            `/api/updateUser?userId=${session?.user?.id}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          const data = await res.json();
          console.log(data);
          setUsrScore(data.score);
          const { tierNumber, rangeNumber, nextTierPoints } =
            calculateTierAndRange(usrScore);
          setRangeNumber(rangeNumber);
          console.log(tierNumber, rangeNumber, nextTierPoints);
          const filterData = getNFTByTierAndRange(tierNumber, rangeNumber);
          if (filterData) {
            console.log(filterData);
            setFilteredData([filterData]);
          }
          console.log(filteredData);
          console.log(data);
        } catch (error) {
          console.log(error);
        }
      }
    })();
    // if (publicKey && signTransaction) {
    //   // Create a signer compatible with Metaplex UMI using the wallet

    //   const walletSigner = {
    //     publicKey: publicKey,
    //     signTransaction: signTransaction,
    //     signAllTransactions: sendTransaction,
    //   };

    //   // Initialize the NFT Minter with the wallet signer
    //   const solanaMinter = new SolanaNFTMinter(walletSigner, "devnet");
    //   setMinter(solanaMinter);
    // }
  }, [wallet]);

  const handleMint = async () => {
    // console.log(minter.mint.secretKey);

    // if (!minter) {
    //   console.error("Minter not initialized");
    //   return;
    // }
    // const contract = minter.mint.publicKey;
    // const mintx = new SolanaNFTMinter2(contract, "devnet");
    const name = filteredData[0].name;
    const uri = filteredData[0].uri;
    const tokenOwner: string | undefined = wallet.publicKey?.toBase58();
    console.log(tokenOwner, "tokenOwner");
    try {
      if (!tokenOwner) {
        throw new Error("Token owner is undefined");
      }
      //  mintx.createAndMintNFT(name, uri, tokenOwner, 500);
      // const [create, mnt] = await mintNFTnow({ uri, name });
      const res = await MetaNft(connection, wallet, name, uri, "SolXPass");
      console.log("NFT Minted:", res);
    } catch (error) {
      console.error("Minting failed:", error);
    }
  };

  return (
    <div className="min-w-full min-h-screen bg-gray-900 md:p-4 p-2">
      <div className="pt-8 px-4 mt-20 rounded-3xl bg-gray-800 pb-4 min-w-full flex flex-col md:flex-row">
        <section className="md:w-3/4 flex flex-col items-center p-2 gap-6">
          <CardSection filteredData={filteredData} usrScore={usrScore} handleMint={handleMint} />
          <ProofGraph />
          <ProviderGrid />
        </section>
        <section className="md:w-1/4 bg-gray-800 rounded-3xl p-2">
          <SideContent rangeNum={rangeNum} />
        </section>
      </div>
    </div>
  );
}

function SideContent({ rangeNum }: { rangeNum: number }) {
  return (
    <div className="flex flex-col items-center justify-center gap-12 w-full">
      <CyberpunkScoreBar score={rangeNum} maxScore={100} increase={10} />
      <AnimatedCyberpunkWalletBalance />
    </div>
  );
}

function ProviderGrid() {
  const { data: session } = useSession();
  const [filteredProviders, setFilteredProviders] = useState<Provider[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const userId = session?.user?.id;

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProviderNames = async () => {
      try {
        const response = await fetch(`/api/getProvider?userId=${userId}`);

        if (!response.ok) {
          throw new Error("Failed to fetch providers");
        }

        const data = await response.json();
        const providerNames = data.providerNames.map(
          (p: { name: string }) => p.name
        );

        const allProviders = Object.values(providerData).flat() as Provider[];
        const providers = allProviders.filter((provider: Provider) =>
          providerNames.includes(provider.name)
        );

        setFilteredProviders(providers);
      } catch (error) {
        setError(error instanceof Error ? error.message : String(error));
      } finally {
        setIsLoading(false);
      }
    };

    if (userId) {
      fetchProviderNames();
    }
  }, [userId]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (isLoading) {
    return (
      <div className="grid grid-flow-row grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {[...Array(1)].map((_, index) => (
          <ProviderCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-flow-row grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {filteredProviders.map((provider) => (
        <ProviderCard
          key={provider.id}
          name={provider.name}
          category={provider.category}
          score={provider.score}
          description={provider.description}
        />
      ))}
    </div>
  );
}

function ProviderCardSkeleton() {
  return (
    <div className="w-64 h-[26rem] rounded-2xl bg-gray-800 animate-pulse">
      <div className="h-56 bg-gray-700 rounded-t-2xl"></div>
      <div className="p-4">
        <div className="h-6 bg-gray-700 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-700 rounded w-1/2"></div>
      </div>
    </div>
  );
}

export default Dash;

function CardSection({
  filteredData,
  usrScore,
  handleMint,
}: {
  filteredData: NFTItem[];
  usrScore: number;
  handleMint: () => Promise<void>;
}) {
  return (
    <div className="min-w-full bg-gray-800 rounded-3xl p-2 flex flex-col sm:flex-row gap-2">
      <div className="w-full sm:w-1/2 rounded-3xl">
        <FlipCard filteredData={filteredData} usrScore={usrScore} handleMint={handleMint} />
      </div>
      <div className="w-full sm:w-1/2">
        <AvatarCard />
      </div>
    </div>
  );
}
