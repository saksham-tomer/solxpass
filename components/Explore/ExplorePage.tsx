"use client";

import React, { useState } from "react";
import { Moon, Sparkles, Sun } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import Image from "next/image";
import IdentityProvider from "./IdentityProvider";
import NFTFixedSidebarFilter from "./Sidbar";

const AnimatedBackground = () => {
  return (
    <style jsx global>
      {`
        @keyframes slide {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .animate-slide {
          animation: slide 3s linear infinite;
        }
      `}
    </style>
  );
};

const ExplorePage = () => {
  const [category, setCategory] = useState("social_media");
  return (
    <div className="w-full px-4 md:px-12 lg:px-20 xl:px-24 mt-14 flex flex-col items-center justify-center">
      <AnimatedBackground />
      <NFTFixedSidebarFilter />
      <div className="w-full max-w-4xl p-6 sm:p-8 mx-auto pt-10 pb-24 min-h-[300px] rounded-3xl bg-gradient-to-r from-purple-400 to-green-400 relative ">
        <div className="flex flex-col sm:flex-row justify-between items-start mb-12 relative z-10">
          <div className="mb-6 sm:mb-0">
            <p className="text-white mb-2 text-sm font-bold uppercase tracking-wide">
              Discover
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
              Showtime
              <br />
              Collection.
            </h1>
          </div>
          <div className="flex space-x-3">
            <button className="p-3 bg-white/40 backdrop-blur-sm rounded-full transition-all hover:bg-white/60">
              <Moon size={20} className="text-gray-800" />
            </button>
            <button className="p-3 bg-blue-600 rounded-full transition-all hover:bg-blue-700">
              <Sun size={20} className="text-white" />
            </button>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-1/2 lg:w-[24rem] lg:h-[24rem] h-full">
          <Image
            src="/nftg.png"
            alt="NFT Graphic"
            layout="fill"
            objectFit="contain"
            objectPosition="right top"
            className="pointer-events-none"
          />
        </div>

        <div className="absolute -bottom-32 sm:-bottom-20 md:-bottom-16 left-0 right-0 mx-4 sm:mx-6 mb-6 z-10 overflow-hidden">
          <div className="bg-white rounded-xl p-4 sm:p-6 gap-4 sm:gap-6 shadow-xl flex flex-col md:flex-row justify-between items-center relative">
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 animate-slide"></div>
            <div className="flex items-center border-b md:border-b-0 gap-4 sm:gap-6 pb-4 md:pb-0 md:pr-4 md:mr-4 w-full md:w-auto flex-col md:flex-row">
              <div className="w-full md:w-auto flex flex-col lg:flex-row items-center justify-center">
                <p className="font-semibold text-sm whitespace-nowrap mr-3 mb-2 md:mb-0">
                  Browse Type
                </p>
                <Select onValueChange={(value) => setCategory(value)}>
                  <SelectTrigger className="w-full md:w-[200px]">
                    <Sparkles
                      size={24}
                      className="bg-gray-900 p-1 rounded-lg text-yellow-400 mr-2"
                    />
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent className="transition-transform duration-300 ease-in-out">
                    <SelectGroup>
                      <SelectLabel>Category</SelectLabel>
                      <SelectItem value="entertainment">
                        Entertainment
                      </SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="food">Food</SelectItem>
                      <SelectItem value="gaming">Gaming</SelectItem>
                      <SelectItem value="professional">Professional</SelectItem>
                      <SelectItem value="shopping">Shopping</SelectItem>
                      <SelectItem value="social_media">Social Media</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-full md:w-auto mt-3 md:mt-0">
                <input
                  type="text"
                  placeholder="Search by Name or Wallet..."
                  className="flex-grow text-sm outline-none w-full md:w-auto md:border-l h-10 px-3 border-gray-300 rounded-md"
                />
              </div>
            </div>
            <div className="flex w-full md:w-auto items-center mt-4 md:mt-0">
              <button className="bg-black text-white px-6 py-3 rounded-lg text-sm w-full md:w-auto hover:bg-gray-800 transition-colors">
                Search Now
              </button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-16 right-10 flex items-end">
          <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-20 md:h-20 bg-white/40 backdrop-blur-sm rounded-full flex items-center justify-center">
            <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-14 md:h-14 bg-yellow-400 rounded-full"></div>
          </div>
          <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-yellow-400 rounded-full -ml-4 sm:-ml-5 mb-2 sm:mb-3"></div>
        </div>
      </div>
      <div className="mt-20 min-h-screen">
        <IdentityProvider category={category} />
      </div>
    </div>
  );
};

export default ExplorePage;
