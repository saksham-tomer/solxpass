import React from "react";
import Experience from "./Scene2";
import { ArrowDown } from "lucide-react";

function Main2() {
  return (
    <div className="bg-orange-600 flex items-center justify-center  absolute top-[52rem] flex-col bottom-0 min-w-full min-h-screen mt-0">
      <button className="p-4 cursor-pointer hover:bg-neutral-900 md:p-4 xl:p-8 md:-top-20 font-bold rounded-full absolute bottom-auto -top-16 border-8 border-orange-600 bg-neutral-800 hover:bg-neutral-700 transition-colors duration-300 flex items-center justify-center">
        <ArrowDown className="w-16 hover:animate-bounce transition-transform duration-100 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 xl:w-28 xl:h-28 text-orange-600" />
      </button>
      <h1 className="lg:text-elephant md:text-9xl text-6xl font-impact leading-tight mt-[20rem] text-white mb-auto tracking-tight">
        Share the data you want
      </h1>
      <p className="font-impact leading-tight text-orange-100 max-w-96 text-sm md:text-2xl text-left mb-[30rem] ">
        Generate ZK proofs for your data and validate them onchain to get
        instant rewards
      </p>
      <div className="z-20 left-0 right-0 flex items-center justify-center mt-96 transform md:translate-x-44 lg:translate-x-80 translate-y-32 translate-x-0 absolute top-0 bottom-auto">
        <Experience />
      </div>
    </div>
  );
}

export default Main2;
