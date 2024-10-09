"use client";

import React, { useState } from "react";
import { Connection, PublicKey, Keypair } from "@solana/web3.js";
import {
  Metaplex,
  keypairIdentity,
  bundlrStorage,
} from "@metaplex-foundation/js";

const SolanaNFTFunctions = () => {
  const [status, setStatus] = useState("");

  // Initialize connection to Solana devnet
  const connection = new Connection("https://api.devnet.solana.com");

  // Initialize Metaplex
  const metaplex = Metaplex.make(connection)
    .use(keypairIdentity(Keypair.generate()))
    .use(bundlrStorage());

  const createNFT = async (name, description, imageUrl) => {
    try {
      setStatus("Creating NFT...");

      const { nft } = await metaplex.nfts().create({
        name: name,
        description: description,
        uri: imageUrl,
        sellerFeeBasisPoints: 500, // 5% royalty
      });

      setStatus(
        `NFT created successfully. Mint address: ${nft.address.toString()}`
      );
      return nft;
    } catch (error) {
      setStatus(`Error creating NFT: ${error.message}`);
    }
  };

  const updateNFT = async (
    mintAddress,
    newName,
    newDescription,
    newImageUrl
  ) => {
    try {
      setStatus("Updating NFT...");

      const mintAddressPubkey = new PublicKey(mintAddress);
      const nft = await metaplex
        .nfts()
        .findByMint({ mintAddress: mintAddressPubkey });

      await metaplex.nfts().update({
        nftOrSft: nft,
        name: newName,
        description: newDescription,
        uri: newImageUrl,
      });

      setStatus("NFT updated successfully");
    } catch (error) {
      setStatus(`Error updating NFT: ${error.message}`);
    }
  };

  return (
    <div>
      <h2>Solana NFT Functions</h2>
      <button
        onClick={() =>
          createNFT("My NFT", "A cool NFT", "https://example.com/image.png")
        }
      >
        Create NFT
      </button>
      <button
        onClick={() =>
          updateNFT(
            "MINT_ADDRESS",
            "Updated NFT",
            "An even cooler NFT",
            "https://example.com/new-image.png"
          )
        }
      >
        Update NFT
      </button>
      <p>Status: {status}</p>
    </div>
  );
};

export default SolanaNFTFunctions;
