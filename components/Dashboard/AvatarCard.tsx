import { useState } from "react";
import { Calendar } from "lucide-react";
import Image from "next/image";
import { Globe } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AvatarCard() {
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
