import Image from "next/image";
import { motion } from "framer-motion";
import { Zap } from "lucide-react";
import { useState } from "react";

interface ProviderCardProps {
  category: string;
  name: string;
  score: number;
  description: string;
}

export default function ProviderCard({
  category,
  name,
  score,
  description,
}: ProviderCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="relative w-64 h-[26rem] perspective" onClick={handleFlip}>
      <motion.div
        className="w-full h-full transition-all duration-500 [transform-style:preserve-3d]"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
      >
        <div className="absolute w-full h-full [backface-visibility:hidden]">
          <div className="w-full h-full p-1 rounded-2xl overflow-hidden bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 animate-gradient-x">
            <div className="absolute uppercase z-20 rounded-tl-2xl rounded-br-3xl bg-cyan-600/70 text-white text-sm px-6 py-1 bottom-auto top-1 left-1 right-auto">
              {category}
            </div>
            <div className="absolute inset-[3px] z-0 bg-gray-900 rounded-2xl"></div>
            <div className="relative h-full z-10 bg-gray-900 rounded-xl p-4 flex flex-col">
              <div className="flex-grow">
                <Image
                  src={`/${name.slice(0, name.indexOf(" ")).toLowerCase()}.png`}
                  alt={name}
                  width={224}
                  height={224}
                  className="w-full h-56 object-cover rounded-lg"
                />
              </div>
              <div className="mt-4 text-cyan-300">
                <h3 className="text-lg font-semibold">{name}</h3>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm text-cyan-400">Score</span>
                  <span className="text-lg font-bold text-pink-500">
                    {score}
                  </span>
                </div>
              </div>
              <button className="mt-4 w-full bg-cyan-600 text-white py-2 rounded-tr-3xl rounded-bl-3xl hover:bg-cyan-700 transition-colors">
                See Detail <Zap className="inline-block w-4 h-4 ml-1" />
              </button>
            </div>
          </div>
        </div>

        <div className="absolute w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <div className="w-full h-full p-1 rounded-2xl overflow-hidden bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 animate-gradient-x">
            <div className="absolute inset-[3px] z-0 bg-gray-900 rounded-2xl"></div>
            <div className="relative h-full z-10 bg-gray-900 rounded-xl p-6 flex flex-col justify-center items-center text-cyan-300">
              <h3 className="text-xl font-semibold mb-4">{name}</h3>
              <p className="text-sm text-center mb-4">{description}</p>
              <div className="mt-auto">
                <p className="text-sm text-cyan-400">Score</p>
                <p className="text-lg font-bold text-pink-500">{score}</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
