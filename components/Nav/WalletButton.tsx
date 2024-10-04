import React, { useState, useEffect } from "react";

const CyberpunkButton = ({
  children,
  onClick,
  className = "",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) => {
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 200);
    }, 3000);
    return () => clearInterval(glitchInterval);
  }, []);

  return (
    <button
      onClick={onClick}
      className={`
        relative p-3 text-xs font-bold text-cyan-300 uppercase
        bg-gray-800 border-2 border-cyan-500 rounded-full
        transition-all duration-300 ease-in-out
        hover:bg-cyan-900 hover:text-cyan-100
        focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-opacity-50
        ${glitch ? "animate-glitch" : ""}
        ${className}
      `}
    >
      <span className="relative z-10">{children}</span>
      <div className="absolute inset-0 bg-cyan-500 opacity-50 blur-sm rounded-full"></div>
      <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-purple-500 opacity-50 blur-md rounded-full"></div>
    </button>
  );
};

export default CyberpunkButton;
