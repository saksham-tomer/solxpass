import React from "react";

const Card = ({ name, talent, description }) => {
  return (
    <div className="flex flex-col items-center border-2 border-orange-400 pb-8 bg-white shadow-lg rounded-lg p-4 w-64 text-center hover:scale-105 transition-transform animate-in fade-in-30 ">
      <div className="flex justify-between w-full px-2 mb-2">
        <div className="h-6 w-6 bg-orange-600 rounded-full flex items-center justify-center border-2 border-gray-800">
          <div className="h-3 w-3 bg-gray-800 rounded-full"></div>
        </div>
        <div className="h-6 w-6 bg-orange-600 rounded-full flex items-center justify-center border-2 border-gray-800">
          <div className="h-3 w-3 bg-gray-800 rounded-full"></div>
        </div>
      </div>

      <div className="bg-orange-500 w-full h-32 rounded-xl border-4 border-black flex justify-center items-center mb-4">
        <img src="/ape2.jpg" alt="Avatar" className="rounded-full w-24 h-24" />
      </div>

      <h2 className="text-xl font-light font-impact ">CALEB</h2>

      <h3 className="text-orange-500 font-semibold text-sm">
        CREATIVE & OPERATIONS
      </h3>

      <p className="text-gray-500 font-semibold text-xs mt-2 pt-4">
        CREATIVE INDUSTRIES VETERAN. OPERATES TEAMS LIKE A BEAST. BIG COFFEE &
        90'S SNEAKER SNOB.
      </p>
    </div>
  );
};

export default Card;
