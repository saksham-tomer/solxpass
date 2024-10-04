import Main from "@/components/3D/Main";
import Main2 from "@/components/3D/Main2";
import Main3 from "@/components/3D/Main3";
import MarqueeEffect from "@/components/3D/Marquee";
import MarqueeEffect2 from "@/components/3D/Marquee2";
import MarqueeEffect3 from "@/components/3D/Marquee3";
import Experience from "@/components/3D/Scene4";
import Card from "@/components/ui/Card";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="overflow-hidden overflow-x-hidden">
      <div className="relative">
        <Main />
        <Main2 />
        <MarqueeEffect />
        <Main3 />
      </div>
      <div className="min-h-screen overflow-hidden w-full mt-20 sm:mt-32 md:mt-40 lg:mt-[40rem] bg-neutral-800">
        <Experience />
        <p className="uppercase text-gray-300 font-mono font-bold text-xs sm:text-sm md:text-base mt-12 sm:mt-20 md:mt-28 max-w-[90%] sm:max-w-80 md:max-w-96 mx-auto sm:ml-auto sm:mr-4 px-4 sm:px-0">
          A core expression of who you are. Its a part of your nature. It is
          inside all of us. Some more free than others tReality has evolved
          beyond the physical To facilitate & create new digital tribes what is
          your beast tribe
        </p>
        <div className="flex flex-col px-4 sm:pl-8 gap-6 sm:gap-8 mt-8 sm:mt-12">
          <h1 className="font-impact text-4xl sm:text-6xl md:text-mammoth max-w-full sm:max-w-[90%] md:max-w-[100rem] text-wrap text-white">
            What kind beast are you
          </h1>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="px-4 sm:px-6 py-2 font-light hover:bg-neutral-700 rounded-3xl border-2 border-white bg-neutral-800 uppercase text-white text-sm sm:text-base">
              Start
            </button>
            <button className="px-4 sm:px-6 py-2 font-light rounded-3xl hover:bg-neutral-700 border-2 border-white bg-neutral-800 text-white uppercase text-sm sm:text-base">
              Get your pass
            </button>
          </div>
        </div>
        <MarqueeEffect2 />
        <div className="uppercase font-impact text-4xl sm:text-6xl md:text-mammoth text-white z-20 shadow-inner rounded-3xl absolute left-4 sm:left-auto sm:right-4 top-[120rem] sm:top-[140rem] md:top-[165rem] transform sm:translate-x-0 md:translate-x-40">
          This is beast studio
        </div>
      </div>
      <div className="min-h-screen relative flex flex-col items-center justify-center overflow-hidden w-full mt-20 sm:mt-32 md:mt-0 bg-neutral-800 px-4 sm:px-8">
        <MarqueeEffect3 />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-6xl">
          <Card
            name="Beast 1"
            talent="Roaring"
            description="A fierce creature"
          />
          <Card name="Beast 2" talent="Flying" description="A majestic being" />
          <Card
            name="Beast 3"
            talent="Swimming"
            description="An aquatic wonder"
          />
        </div>
      </div>
      <div className="flex bg-neutral-800 w-full p-4 sm:p-8 flex-col md:flex-row">
        <div className="flex flex-col md:flex-row justify-between w-full">
          <div className="flex flex-col mb-8 md:mb-0">
            <h1 className="font-impact uppercase font-light text-white text-xl sm:text-2xl">
              A KID CALLED BEAST
            </h1>
            <p className="text-xs sm:text-sm text-white font-mono uppercase mt-2">
              Join our mission and have your digital identity
            </p>
            <nav className="bg-neutral-800 text-white py-4 mt-6 sm:mt-10">
              <ul className="flex flex-wrap justify-center gap-4 sm:gap-8">
                {["COMMUNITY", "CONTACT", "QUIZ", "BEASTHOOD"].map(
                  (item, index) => (
                    <li key={index} className="relative group">
                      <a
                        href="#"
                        className="text-xs sm:text-sm font-medium hover:text-gray-300 transition duration-150 ease-in-out"
                      >
                        {item}
                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-150 ease-in-out"></span>
                      </a>
                      {index < 3 && (
                        <span className="absolute top-1/2 -right-2 sm:-right-4 transform -translate-y-1/2 text-gray-500 text-xs sm:text-sm">
                          ◼
                        </span>
                      )}
                    </li>
                  )
                )}
              </ul>
            </nav>
          </div>
          <div className="gap-4">
            <p className="font-impact text-white font-light text-xs sm:text-sm uppercase">
              Sign up for our latest news
            </p>
            <div className="relative gap-4 mt-2">
              <input
                type="email"
                placeholder="YOUR EMAIL"
                className="w-full bg-transparent border-b font-mono border-white text-white placeholder-white py-2 pr-8 focus:outline-none focus:border-white text-xs sm:text-sm"
              />
              <button className="absolute right-0 top-1/2 transform -translate-y-1/2 text-white">
                <ArrowRight className="font-light text-white w-4 h-4 sm:w-6 sm:h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
