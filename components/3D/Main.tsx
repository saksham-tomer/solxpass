"use client";
import React from "react";
import Experience from "./Scene";
import { IoBoat } from "react-icons/io5";
import { useRouter } from "next/navigation";

function Main() {
  const router = useRouter();

  const svgCode = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">
      <defs>
        <pattern id="thickDiagonalLines" patternUnits="userSpaceOnUse" width="80" height="80" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="80" stroke="#808080" stroke-width="60" />
        </pattern>
      </defs>
      <rect width="400" height="400" fill="url(#thickDiagonalLines)" />
      <path d="M0 60 L0 0 L60 0" stroke="#808080" stroke-width="30" fill="none" />
      <path d="M340 0 L400 0 L400 60" stroke="#808080" stroke-width="30" fill="none" />
      <path d="M0 320 L0 400 L80 400" stroke="#808080" stroke-width="30" fill="none" />
      <path d="M320 400 L400 400 L400 320" stroke="#808080" stroke-width="30" fill="none" />
    </svg>
  `;
  const svg2Code = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 100">
  <pattern id="stripes" patternUnits="userSpaceOnUse" width="60" height="60" patternTransform="rotate(45)">
    <rect width="30" height="60" fill="#ff5500"/>
  </pattern>
  <rect width="100%" height="100%" fill="url(#stripes)"/>
</svg>`;
  const encoded2SVG = encodeURIComponent(svg2Code);
  const encodedSVG = encodeURIComponent(svgCode);

  return (
    <div className="bg-neutral-800 min-h-[55rem] flex flex-col items-center justify-center relative  w-full  overflow-hidden">
      <div
        className="absolute left-0 right-0 bottom-auto top-16 m-auto w-3/4 max-w-sm h-3/4 max-h-96 bg-no-repeat bg-center bg-contain z-0"
        style={{ backgroundImage: `url("data:image/svg+xml,${encodedSVG}")` }}
      />
      <div className="flex flex-col md:flex-row justify-between w-full px-4 md:px-8 lg:px-16 xl:px-72 top-0 absolute z-10">
        <h1 className="font-impact text-4xl md:text-5xl lg:text-elephant tracking-tight text-white">
          SolX
        </h1>
        <div className="flex flex-col gap-4 mt-8 md:mt-0">
          <h3 className="font-light text-white font-impact text-sm md:text-lg max-w-xs md:max-w-sm lg:max-w-md mt-8 md:mt-40 uppercase">
            Level up out unique tiers to get exclusive rewards <br /> 4 Tiers
            with 10 levels each
          </h3>
          <div
            onClick={() => router.push("/explore")}
            className="max-w-xs  md:max-w-sm uppercase py-2 rounded-3xl bg-orange-600 flex items-center hover:bg-orange-700 cursor-pointer font-bold justify-center gap-4 text-black text-sm md:text-base"
          >
            <IoBoat className="text-white rounded-full bg-black p-2 w-8 h-8 md:w-9 md:h-9 font-bold" />
            Generate proofs
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row w-full justify-between px-4 md:px-8 lg:px-16 xl:px-72 bottom-0 absolute z-10">
        <div className="flex flex-col gap-4 items-center mb-8 md:mb-0">
          <div
            className="w-3/4 max-w-sm h-3/4 max-h-96 bg-no-repeat bg-center bg-contain z-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,${encoded2SVG}")`,
            }}
          >
            <h3 className="font-light text-white font-impact text-sm md:text-lg max-w-xs md:max-w-sm lg:max-w-md uppercase p-4">
              Level up your unique tiers to get exclusive rewards 4 tiers
              Animal🦁, Dinosaur🦖, Alien👽, Hero🦸‍♂️
            </h3>
          </div>
        </div>
        <h1 className="font-impact text-4xl md:text-5xl lg:text-elephant tracking-tight uppercase text-white self-end">
          Pass
        </h1>
      </div>
      <div className="absolute inset-0 z-5">
        <Experience />
      </div>
    </div>
  );
}

export default Main;
