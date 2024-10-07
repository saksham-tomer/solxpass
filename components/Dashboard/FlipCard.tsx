import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Zap } from "lucide-react";

export default function FlipCard() {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div
      className="relative w-full h-72 sm:h-96 rounded-3xl overflow-hidden cursor-pointer"
      onClick={handleFlip}
    >
      <motion.div
        className="w-full h-full transition-all duration-500 [transform-style:preserve-3d]"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
      >
        <div className="absolute w-full h-full [backface-visibility:hidden]">
          <Image
            src="/iron.jpeg"
            alt="Iron Man"
            layout="fill"
            objectFit="cover"
            className="rounded-3xl"
          />
          <div className="absolute top-0 right-0 bg-black/50 backdrop-blur-md p-2 sm:p-3 rounded-bl-3xl transform translate-x-1/3 -translate-y-1/3 hover:translate-x-0 hover:translate-y-0 transition-transform duration-300 ease-in-out">
            <p className="text-xs sm:text-sm text-cyan-300 font-semibold">
              Auction Starts in
            </p>
            <div className="flex items-center space-x-2 mt-1">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-pink-500 border border-cyan-300"></div>
              <p className="font-bold text-xs sm:text-sm text-cyan-300 uppercase">
                14H:17M:34S
              </p>
            </div>
          </div>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full bg-black/70 backdrop-blur-md rounded-3xl border border-cyan-300 p-3 sm:p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-xs sm:text-sm text-cyan-300">Current bid</p>
                <h1 className="text-pink-500 text-base sm:text-lg font-bold">
                  1.52 ETH
                </h1>
              </div>
              <button className="px-3 py-1.5 sm:px-4 sm:py-2 bg-cyan-600 text-white rounded-full border border-cyan-300 flex items-center space-x-1 hover:bg-cyan-700 transition-colors duration-300">
                <span className="font-bold text-xs sm:text-sm">Place Bid</span>
                <Zap className="w-3 h-3 sm:w-4 sm:h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="absolute w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] bg-gradient-to-bl from-purple-600 to-cyan-600 rounded-3xl p-6 flex flex-col justify-center items-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Cybernetic Enhancement
          </h2>
          <p className="text-cyan-300 text-center">
            This NFT grants access to exclusive augmented reality features and
            cyber-enhancements in the metaverse.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
