"use client";

import React from "react";
import { Info, Zap, Skull, Dna } from "lucide-react";

interface CyberpunkScoreBarProps {
  score: number;
  maxScore: number;
  increase: number;
}

const CyberpunkScoreBar: React.FC<CyberpunkScoreBarProps> = ({
  score = 649,
  maxScore = 800,
  increase = 63,
}) => {
  const progressPercentage = (score / maxScore) * 100;
  const tiers = [
    { name: "Animal", icon: Skull, threshold: 25 },
    { name: "Dinosaur", icon: Dna, threshold: 50 },
    { name: "Alien", icon: Zap, threshold: 75 },
    { name: "Hero", icon: Zap, threshold: 100 },
  ];

  const currentTier =
    tiers.find((tier) => progressPercentage <= tier.threshold) ||
    tiers[tiers.length - 1];

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-gray-900 rounded-lg shadow-neon text-cyan-300">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <span className="text-xl font-bold mr-2 text-cyan-400">
            Cyber Score
          </span>
          <Info className="w-5 h-5 text-cyan-500" />
        </div>
        <button className="relative overflow-hidden flex items-center bg-cyan-900 px-4 py-2 rounded-md text-sm group hover:bg-cyan-800 transition-all duration-300">
          <Zap className="w-4 h-4 mr-2 text-yellow-400" />
          Boost
          <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-cyan-400 opacity-40 group-hover:animate-cyber-shine" />
        </button>
      </div>
      <div className="relative h-20 bg-gray-800 rounded-md overflow-hidden border-2 border-cyan-500">
        <div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-md transition-all duration-500 ease-out flex items-center"
          style={{ width: `${progressPercentage}%` }}
        >
          <span className="text-5xl font-bold ml-4 text-white glow">
            {score}
          </span>
          <span className="text-sm ml-2 text-cyan-200">+{increase}</span>
        </div>
        <div className="absolute top-0 right-0 h-full flex items-center pr-4">
          <span className="text-cyan-400 font-bold">{maxScore}</span>
        </div>
        {tiers.map((tier) => (
          <div
            key={tier.name}
            className="absolute top-0 bottom-0 w-0 border-l border-dashed border-cyan-400"
            style={{
              left: `${tier.threshold}%`,
              height: "calc(100% + 8px)",
              top: "-4px",
            }}
          >
            <div className="absolute -top-6 -translate-x-1/2 text-xs text-cyan-400">
              {tier.name}
            </div>
            <tier.icon className="absolute -bottom-6 -translate-x-1/2 w-5 h-5 text-cyan-400" />
          </div>
        ))}
      </div>
      <div className="mt-4 text-right text-sm text-cyan-400 font-bold">
        Current Tier: {currentTier.name}
      </div>
    </div>
  );
};

export default CyberpunkScoreBar;
