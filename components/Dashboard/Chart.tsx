import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", proofs: 45 },
  { month: "Feb", proofs: 62 },
  { month: "Mar", proofs: 78 },
  { month: "Apr", proofs: 95 },
  { month: "May", proofs: 130 },
  { month: "Jun", proofs: 167 },
  { month: "Jul", proofs: 189 },
];

const ProofGraph = () => {
  return (
    <div
      className="bg-black p-4 rounded-lg shadow-lg w-full max-w-5xl "
      style={{ fontFamily: "'Orbitron', sans-serif" }}
    >
      <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center text-cyan-400">
        Proof Registration Progress
      </h2>
      <div className="w-full h-[200px] sm:h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorProofs" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#FF00FF" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#FF00FF" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis dataKey="month" stroke="#00FFFF" tick={{ fontSize: 12 }} />
            <YAxis stroke="#00FFFF" tick={{ fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(0, 0, 0, 0.8)",
                border: "1px solid #00FFFF",
                color: "#00FFFF",
                fontSize: "12px",
              }}
            />
            <Area
              type="monotone"
              dataKey="proofs"
              stroke="#FF00FF"
              fillOpacity={1}
              fill="url(#colorProofs)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ProofGraph;
