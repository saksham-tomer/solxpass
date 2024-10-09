import Image from "next/image";
import React from "react";

const Card = ({ name, talent, description, image }) => {
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
        <Image
          src={image}
          alt=""
          className="rounded-full w-24 h-24"
          width={96}
          height={96}
        />
      </div>

      <h2 className="text-xl font-light font-impact ">{name}</h2>

      <h3 className="text-orange-500 font-semibold text-sm">{talent}</h3>

      <p className="text-gray-500 uppercase font-semibold text-xs mt-2 pt-4">
        {description}
      </p>
    </div>
  );
};

export default Card;
