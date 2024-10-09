"use client";

import Main from "@/components/3D/Main";
import Main2 from "@/components/3D/Main2";
import Main3 from "@/components/3D/Main3";
import MarqueeEffect from "@/components/3D/Marquee";
import MarqueeEffect2 from "@/components/3D/Marquee2";
import MarqueeEffect3 from "@/components/3D/Marquee3";
import Experience from "@/components/3D/Scene4";
import Card from "@/components/ui/Card";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div className="overflow-hidden overflow-x-hidden">
      <div className="relative">
        <Main />
        <Main2 />
        <MarqueeEffect />
        <Main3 />
      </div>
      <div className="overflow-hidden min-h-[70rem] w-full mt-20 sm:mt-32 md:mt-40 lg:mt-[40rem] bg-neutral-800">
        <Experience />
        <p className="text-gray-300 font-mono uppercase font-bold text-xs sm:text-sm md:text-base mt-12 sm:mt-20 md:mt-28 max-w-[90%] sm:max-w-80 md:max-w-96 mx-auto sm:ml-auto sm:mr-4 px-4 sm:px-0">
          Share your experience and interact with the community of solxpass on
          solxpass feeds. get rewards for your content and interact with the
          community to get more proof of person rewards
        </p>
        <div className="flex flex-col px-4 sm:px-8 gap-6 sm:gap-8 mt-8 sm:mt-12">
          <h1 className="font-impact text-4xl sm:text-6xl md:text-8xl lg:text-mammoth max-w-full sm:max-w-[90%] md:max-w-[100rem] text-wrap text-white">
            Share your data and get rewarded
          </h1>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => router.push("/explore")}
              className="px-4 sm:px-6 py-2 font-light hover:bg-neutral-700 rounded-3xl border-2 border-white bg-neutral-800 uppercase text-white text-sm sm:text-base"
            >
              Start
            </button>
            <button
              onClick={() => router.push("/dashboard")}
              className="px-4 sm:px-6 py-2 font-light rounded-3xl hover:bg-neutral-700 border-2 border-white bg-neutral-800 text-white uppercase text-sm sm:text-base"
            >
              Get your pass
            </button>
          </div>
        </div>
        <MarqueeEffect2 />
      </div>
      <div className="min-h-[60rem] relative flex flex-col items-center justify-center overflow-hidden w-full mt-20 sm:mt-32 md:mt-0 bg-neutral-800 px-4 sm:px-8">
        <h1 className="font-impact text-4xl sm:text-6xl md:text-8xl lg:text-mammoth text-white z-20 uppercase shadow-inner rounded-3xl">
          Get Unique tier NFT
        </h1>
        <MarqueeEffect3 />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-6xl">
          <Card
            name="Animal"
            image="https://sakshamnftdata.s3.amazonaws.com/dreamimages/Designer+(26).jpeg"
            talent="TIER 1"
            description="Tier 1 NFT with unique traits and rewards for the community"
          />
          <Card
            name="Alien"
            image="https://sakshamnftdata.s3.amazonaws.com/dreamimages/Designer+(61).jpeg"
            talent="TIER 3"
            description="Tier 3 NFT with access to solxfeeds and community tokens"
          />
          <Card
            name="Hero"
            image="https://sakshamnftdata.s3.amazonaws.com/dreamimages/Designer+(68).jpeg"
            talent="TIER 4"
            description="Tier 4 NFT with special airdop rewards and community tokens"
          />
        </div>
      </div>
      <div className="flex bg-neutral-800 w-full p-4 sm:p-8 flex-col md:flex-row">
        <div className="flex flex-col md:flex-row justify-between w-full">
          <div className="flex flex-col mb-8 md:mb-0">
            <h1 className="font-impact uppercase font-light text-white text-xl sm:text-2xl md:text-3xl">
              SolXPass
            </h1>
            <p className="text-xs sm:text-sm md:text-base text-white font-mono uppercase mt-2">
              Join our mission and have your digital identity (proof of person)
            </p>
            <nav className="bg-neutral-800 text-white py-4 mt-6 sm:mt-10">
              <ul className="flex flex-wrap justify-center md:justify-start gap-4 sm:gap-8">
                {[
                  {
                    name: "COMMUNITY",
                    href: "https://github.com/saksham-tomer/v0",
                  },
                  { name: "MAKER", href: "https://github.com/saksham-tomer/" },
                  { name: "TWITTER", href: "https://x.com/SakshamDevDose" },
                ].map((item, index) => (
                  <li key={index} className="relative group">
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs sm:text-sm md:text-base font-medium hover:text-gray-300 transition duration-150 ease-in-out"
                    >
                      {item.name}
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-150 ease-in-out"></span>
                    </a>
                    {index < 2 && (
                      <span className="absolute top-1/2 -right-2 sm:-right-4 transform -translate-y-1/2 text-gray-500 text-xs sm:text-sm md:text-base">
                        ◼
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <div className="gap-4 mt-8 md:mt-0">
            <p className="font-impact text-white font-light text-xs sm:text-sm md:text-base uppercase">
              Share your feedback
            </p>
            <div className="relative gap-4 mt-2">
              <input
                type="email"
                placeholder="YOUR EMAIL"
                className="w-full bg-transparent border-b font-mono border-white text-white placeholder-white py-2 pr-8 focus:outline-none focus:border-white text-xs sm:text-sm md:text-base"
              />
              <button className="absolute right-0 top-1/2 transform -translate-y-1/2 text-white">
                <ArrowRight className="font-light text-white w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
