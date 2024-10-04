import React from "react";

const MarqueeEffect = () => {
  return (
    <div className="min-w-screen h-44 bg-orange-600 border-t-4 border-b-4  border-black top-[44rem] rotate-3 z-20 overflow-hidden relative">
      <div className="absolute inset-0 m-2 p-4 min-h-9 transform-gpu  border-t-2 border-spacing-9 border-b-2 border-dashed border-black"></div>
      <div className="flex items-center h-full animate-marquee">
        {[...Array(10)].map((_, index) => (
          <React.Fragment key={index}>
            <span className="text-black text-6xl font-bold mx-4">ACHB</span>
            <span className="text-black text-6xl shadow-2xl font-bold mx-4">
              ✕
            </span>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default MarqueeEffect;
