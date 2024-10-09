// src/classes/SolanaNFTMinter.js
import {
  generateSigner,
  percentAmount,
  publicKey,
  type Umi,
  type Signer,
} from "@metaplex-foundation/umi";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { clusterApiUrl } from "@solana/web3.js";
import {
  createV1,
  TokenStandard,
  mintV1,
  mplTokenMetadata,
} from "@metaplex-foundation/mpl-token-metadata";
import { signerIdentity } from "@metaplex-foundation/umi";
import {
  updateV1,
  fetchMetadataFromSeeds,
} from "@metaplex-foundation/mpl-token-metadata";
import { walletAdapterIdentity } from "@metaplex-foundation/umi-signer-wallet-adapters";

import data from "../components/Data/Tier.json";
import { WalletAdapter } from "@solana/wallet-adapter-base";

class SolanaNFTMinter {
  private umi: Umi;
  private signer: Signer;
  private mint: Signer;

  constructor(
    walletSigner: any,
    cluster: "devnet" | "mainnet-beta" = "devnet"
  ) {
    // Initialize UMI
    this.umi = createUmi(clusterApiUrl(cluster));
    this.umi.use(walletAdapterIdentity(walletSigner));
    this.umi.use(mplTokenMetadata());

    // Set up wallet signer
    this.signer = walletSigner;
    this.umi.use(signerIdentity(this.signer));

    // Generate mint signer
    this.mint = generateSigner(this.umi);
  }

  async updateNft({
    mint,
    name,
    newName,
  }: {
    mint: string;
    name: string;
    newName: string;
  }) {
    const result = data.filter((item) => item.name === name);

    const initialMetadata = await fetchMetadataFromSeeds(this.umi, {
      mint: publicKey(mint),
    });

    console.log(initialMetadata);
    const datas = await fetch(result[0].uri);
    const metadata = await datas.json();

    await updateV1(this.umi, {
      mint: publicKey(mint),
      authority: this.signer,
      data: { ...metadata, name: newName },
    }).sendAndConfirm(this.umi);
  }

  async createAndMintNFT(
    name: string,
    uri: string,
    tokenOwner: string,
    sellerFeeBasisPoints: number = 0
  ) {
    const result = data.filter((item) => item.name === name);

    try {
      // Create the NFT metadata
      const createTx = await createV1(this.umi, {
        mint: this.mint,
        authority: this.signer,
        name: result[0].name,
        uri: result[0].uri,
        sellerFeeBasisPoints: percentAmount(sellerFeeBasisPoints),
        tokenStandard: TokenStandard.NonFungible,
      }).sendAndConfirm(this.umi);

      // Mint the NFT
      const mintTx = await mintV1(this.umi, {
        mint: this.mint.publicKey,
        authority: this.signer,
        amount: 1,
        tokenOwner: publicKey(tokenOwner),
        tokenStandard: TokenStandard.NonFungible,
      }).sendAndConfirm(this.umi);

      return {
        mintAddress: this.mint.publicKey,
        createTx,
        mintTx,
      };
    } catch (error) {
      console.error("Error minting NFT:", error);
      throw error;
    }
  }

  getMintAddress() {
    return this.mint.publicKey;
  }

  getSignerAddress() {
    return this.signer.publicKey;
  }
}

export default SolanaNFTMinter;
