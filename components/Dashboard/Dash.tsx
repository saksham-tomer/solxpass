"use client";

import { cn } from "@/lib/index";
import { Calendar, ChevronRight, Zap, Cpu, Globe } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { motion } from "framer-motion";
import CyberpunkScoreBar from "./Progress";
import AnimatedCyberpunkWalletBalance from "./PriceFeed";

function Dash() {
  return (
    <div className="min-w-full min-h-screen bg-gray-900 md:p-4 p-2">
      <div className="pt-8 px-4 rounded-3xl bg-gray-800 pb-4 min-w-full flex flex-col md:flex-row">
        <section className="md:w-3/4 flex flex-col items-center p-2 gap-4">
          <CardSection />
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

function ProviderCard({
  category,
  imageSrc,
  title,
  highestBid,
  currency,
  description,
}) {
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
                  src={imageSrc}
                  alt={title}
                  width={224}
                  height={224}
                  className="w-full h-56 object-cover rounded-lg"
                />
              </div>
              <div className="mt-4 text-cyan-300">
                <h3 className="text-lg font-semibold">{title}</h3>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm text-cyan-400">Highest Bid</span>
                  <span className="text-lg font-bold text-pink-500">
                    {highestBid} {currency}
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
              <h3 className="text-xl font-semibold mb-4">{title}</h3>
              <p className="text-sm text-center mb-4">{description}</p>
              <div className="mt-auto">
                <p className="text-sm text-cyan-400">Current Highest Bid</p>
                <p className="text-lg font-bold text-pink-500">
                  {highestBid} {currency}
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
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

function FlipCard() {
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

function AvatarCard() {
  const [selected, setSelected] = useState(0);
  const tabs = ["Details", "Activity", "Offers"];

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

        <div className="space-y-3 sm:space-y-4">
          <p className="text-cyan-300 text-xs sm:text-sm flex items-center gap-1 sm:gap-2">
            <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
            May 01, 2077, 12:01PM
          </p>
          <h1 className="font-bold text-xl sm:text-2xl text-cyan-300">
            Cybernetic Simian Collective
          </h1>
          <p className="text-xs sm:text-sm text-cyan-400 font-normal">
            A revolutionary collection of augmented primates, fusing organic
            intelligence with cutting-edge cybernetics. Each NFT unlocks unique
            abilities in the digital realm.
          </p>
          <div className="h-px bg-cyan-700"></div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
            <div className="flex items-center gap-3 sm:gap-4">
              <Image
                src="/ape2.jpg"
                alt="Creator"
                width={40}
                height={40}
                className="rounded-full object-cover shadow-md ring-2 ring-cyan-500"
              />
              <div>
                <p className="text-cyan-400 text-xs sm:text-sm">Creator</p>
                <p className="font-semibold text-sm sm:text-base text-pink-500">
                  NeuroCyber
                </p>
              </div>
            </div>
            <button className="flex text-nowrap font-bold items-center flex-row gap-1 sm:gap-2 px-4 sm:px-6 py-1.5 sm:py-2 border border-cyan-500 rounded-full text-cyan-300 hover:bg-cyan-900 transition-colors duration-300 text-xs sm:text-sm">
              Other Works
              <Globe className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
