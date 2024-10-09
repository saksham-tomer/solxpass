// import * as anchor from "@coral-xyz/anchor";
// import { Program } from "@coral-xyz/anchor";
// import { Base } from "../target/types/base";

// describe("reclaim", () => {
//   // Configure the client to use the local cluster.
//   anchor.setProvider(anchor.AnchorProvider.env());

//   const program = anchor.workspace.Reclaim as Program<Base>;

//   it("Is initialized!", async () => {
//     // Add your test here.
//     const tx = await program.methods.getStoredClaim().rpc();
//     console.log("Your transaction signature", tx);
//   });
// });
const { Keypair, PublicKey } = require('@solana/web3.js');

function getPublicKey() {
  // Convert the array to a Uint8Array
  const secretKey = new Uint8Array([68,148,77,201,122,217,14,66,107,252,88,98,14,11,167,77,89,33,130,167,36,245,209,101,1,48,114,0,183,167,246,186,12,245,49,217,77,33,198,117,152,239,52,114,113,199,239,144,101,149,41,185,2,55,10,72,175,32,169,211,243,209,253,215]);

  // Create a Keypair from the secret key
  const keypair = Keypair.fromSecretKey(secretKey);

  // Get the public key
  const publicKey = keypair.publicKey;

  console.log('Public Key:', publicKey.toBase58());
}

getPublicKey();