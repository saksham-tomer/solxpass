import { NextResponse } from "next/server";
import * as WEB3 from "@solana/web3.js";
import axios from "axios";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const walletAddress = url.searchParams.get("walletAddress");
  if (!walletAddress) {
    return NextResponse.json(
      { error: "Wallet address is required" },
      { status: 400 }
    );
  }
  try {
    const connection = new WEB3.Connection(
      WEB3.clusterApiUrl("devnet"),
      "confirmed"
    );
    const pubkey = new WEB3.PublicKey(walletAddress);
    const balance = await connection.getBalance(pubkey);
    //sol balance
    const solBalance = balance / WEB3.LAMPORTS_PER_SOL;
    //convert into usd
    const priceResponse = await axios.get(
      "https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd"
    );
    const solPrice = priceResponse.data.solana.usd;
    const usdValue = solBalance * solPrice;
    return NextResponse.json(
      { balance: solBalance, usdValue },
      { status: 200 }
    );
  } catch (error) {
    console.error("Encountered error", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
