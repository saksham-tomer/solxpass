import {
  generateSigner,
  percentAmount,
  publicKey,
} from "@metaplex-foundation/umi";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { clusterApiUrl, PublicKey } from "@solana/web3.js";
import {
  createV1,
  TokenStandard,
} from "@metaplex-foundation/mpl-token-metadata";
import {
  createGenericFile,
  createSignerFromKeypair,
  type GenericFile,
  signerIdentity,
} from "@metaplex-foundation/umi";
import { mintV1 } from "@metaplex-foundation/mpl-token-metadata";
import { mplTokenMetadata } from "@metaplex-foundation/mpl-token-metadata";

export async function mintNFTnow({ uri, name }) {
  const umi = createUmi(clusterApiUrl("devnet"));
  umi.use(mplTokenMetadata());

  const asset = generateSigner(umi);
  console.log(asset);
  const keypair = umi.eddsa.createKeypairFromSecretKey(wallet);
  const signer = createSignerFromKeypair(umi, keypair);
  umi.use(signerIdentity(signer));
  const mint = generateSigner(umi);
  // const uri = "https://example.com/my-asset.json";

  const create = await createV1(umi, {
    mint,
    authority: signer,
    name: name,
    uri: uri,
    sellerFeeBasisPoints: percentAmount(0),
    tokenStandard: TokenStandard.NonFungible,
  }).sendAndConfirm(umi);

  const mnt = await mintV1(umi, {
    mint: mint.publicKey,
    authority: signer,
    amount: 1,
    tokenOwner: publicKey("H1V3XkxhGuADph1ajAWmTjwUcY6Y8EVX3PfXosdsP2JM"),
    tokenStandard: TokenStandard.NonFungible,
  }).sendAndConfirm(umi);
  return [create, mnt];
}
