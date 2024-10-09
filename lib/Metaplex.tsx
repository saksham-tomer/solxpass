import { PublicKey } from "@solana/web3.js";
import {
  Metaplex,
  walletAdapterIdentity,
  bundlrStorage,
} from "@metaplex-foundation/js";

// Assume connection and wallet are already set up and passed to these functions

export const MetaNft = async (connection, wallet, name, uri, description) => {
  if (!wallet.publicKey) {
    throw new Error("Wallet not connected");
  }

  const metaplex = Metaplex.make(connection).use(walletAdapterIdentity(wallet));

  try {
    console.log("Minting NFT...");

    const { nft } = await metaplex.nfts().create({
      name: name,
      description: description,
      uri: uri,
      sellerFeeBasisPoints: 500, // 5% royalty
    });

    console.log(
      `NFT minted successfully. Mint address: ${nft.address.toString()}`
    );
    return nft;
  } catch (error) {
    console.error(`Error minting NFT: ${error.message}`);
    throw error;
  }
};

export const MetaUpdateNFT = async (
  connection,
  wallet,
  mintAddress,
  newName,
  newUri,
  newDescription = "An updated cool NFT"
) => {
  if (!wallet.publicKey) {
    throw new Error("Wallet not connected");
  }

  const metaplex = Metaplex.make(connection)
    .use(walletAdapterIdentity(wallet))
    .use(bundlrStorage());

  try {
    console.log("Updating NFT...");

    const mintAddressPubkey = new PublicKey(mintAddress);
    const nft = await metaplex
      .nfts()
      .findByMint({ mintAddress: mintAddressPubkey });

    await metaplex.nfts().update({
      nftOrSft: nft,
      name: newName,
      description: newDescription,
      uri: newUri,
    });

    console.log("NFT updated successfully");
  } catch (error) {
    console.error(`Error updating NFT: ${error.message}`);
    throw error;
  }
};
