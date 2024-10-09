import React from "react";
import { CgArrowTopRight } from "react-icons/cg";
import Experience from "@/components/3D/Scene3";

const Main3: React.FC = () => {
  return (
    <div className="rounded-2xl top-[100rem] z-30 left-8 min-h-56 md:min-h-96 md:top-[95rem] min-w-60 border-4 p-2 border-black bg-white absolute flex flex-col items-start">
      <p className="font-semibold uppercase text-orange-500 text-sm">
        Best offer
      </p>
      <h1 className="font-semibold text-black font-impact md:text-4xl mt-2 text-2xl">
        15.00
        <span className="font-semibold font-mono ml-2 text-base uppercase">
          Solxc
        </span>
      </h1>
      <div className="mt-4 rounded-lg bg-orange-500 min-w-full min-h-60 border-4 border-black p-1">
        <Experience />
      </div>
      <div className="rounded-full bg-black p-2 min-w-10 border-4 border-white absolute -translate-y-6 min-h-10 translate-x-40">
        <CgArrowTopRight className="w-16 h-16 text-white font-light" />
      </div>
    </div>
  );
};

export default Main3;
