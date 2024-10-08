import { useState } from "react";
import { Calendar, Globe, Share2, Twitter, X } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AvatarCard() {
  const [selected, setSelected] = useState(0);
  const tabs = ["Details", "Offers"];

  const session = useSession();

  const formattedDate = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const router = useRouter();

  const handleTwitterShare = () => {
    const tweetText = encodeURIComponent(
      "✨⛩️Check out SolXPass🙌 - The ultimate Solana-based loyalty and rewards platform! Earn XP, unlock tiers, and get exclusive NFTs. Join the revolution now! #SolXPass #Solana #Web3"
    );
    const twitterUrl = `https://twitter.com/intent/tweet?text=${tweetText}`;
    window.open(twitterUrl, "_blank");
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-gray-800 rounded-3xl overflow-hidden">
      <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
        <ul className="flex justify-between gap-1 sm:gap-2 bg-gray-700 rounded-full p-1">
          {tabs.map((tab, index) => (
            <li
              key={tab}
              onClick={() => setSelected(index)}
              className={cn(
                "flex-1 text-center py-1.5 sm:py-2 px-2 sm:px-4 rounded-full cursor-pointer transition-all duration-300 text-xs sm:text-sm",
                selected === index
                  ? "bg-cyan-600 text-white shadow-md font-semibold"
                  : "text-cyan-300 hover:bg-gray-600 font-bold"
              )}
            >
              {tab}
            </li>
          ))}
        </ul>

        {selected === 0 ? (
          <div className="space-y-3 sm:space-y-4">
            <p className="text-cyan-300 text-xs sm:text-sm flex items-center gap-1 sm:gap-2">
              <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
              {formattedDate}
            </p>
            <h1 className="font-bold text-xl sm:text-2xl text-cyan-300">
              Mint Your SolXPass NFT
            </h1>
            <p className="text-xs sm:text-sm text-cyan-400 font-normal">
              Explore a collection of NFTs that are exclusive to SolXPass
              <br /> Tier ranging from Animal To Hero <br />
              With each tier having 10 ranges
            </p>
            <div className="h-px bg-cyan-700"></div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
              <div className="flex items-center gap-3 sm:gap-4">
                <Image
                  src={session.data?.user?.image || "/ape2.jpg"}
                  alt="Creator"
                  width={40}
                  height={40}
                  className="rounded-full object-cover shadow-md ring-2 ring-cyan-500"
                />
                <div>
                  <p className="text-cyan-400 text-xs sm:text-sm">Creator</p>
                  <p className="font-semibold text-sm sm:text-base text-pink-500">
                    {session.data?.user?.name}
                  </p>
                </div>
              </div>
              <button
                onClick={() => router.push("/explore")}
                className="flex text-nowrap font-bold items-center flex-row gap-1 sm:gap-2 px-4 sm:px-6 py-1.5 sm:py-2 border border-cyan-500 rounded-full text-cyan-300 hover:bg-cyan-900 transition-colors duration-300 text-xs sm:text-sm"
              >
                Verify More
                <Globe className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4 sm:space-y-6">
            <h2 className="font-bold text-xl sm:text-2xl text-cyan-300">
              Share to Gain XP
            </h2>
            <p className="text-sm sm:text-base text-cyan-400">
              Boost your experience points by sharing SolXPass on Twitter!
            </p>
            <div className="bg-gray-700 rounded-xl p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-pink-500 font-semibold">+50 XP</span>
                <X className="w-5 h-5 text-cyan-300" />
              </div>
              <p className="text-cyan-300 text-sm sm:text-base mb-4">
                Share SolXPass on Twitter to earn bonus XP and spread the word!
              </p>
              <button
                onClick={handleTwitterShare}
                className="w-full bg-cyan-600 text-white font-bold py-2 px-4 rounded-full hover:bg-cyan-700 transition-colors duration-300 flex items-center justify-center gap-2"
              >
                <X className="w-5 h-5" />
                Share on Twitter
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
