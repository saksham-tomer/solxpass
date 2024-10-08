import {
  Keypair,
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
} from "@solana/web3.js";

async function checkSolBalance() {
  // Convert the array to a Uint8Array
  const secretKey = new Uint8Array([
    68, 148, 77, 201, 122, 217, 14, 66, 107, 252, 88, 98, 14, 11, 167, 77, 89,
    33, 130, 167, 36, 245, 209, 101, 1, 48, 114, 0, 183, 167, 246, 186, 12, 245,
    49, 217, 77, 33, 198, 117, 152, 239, 52, 114, 113, 199, 239, 144, 101, 149,
    41, 185, 2, 55, 10, 72, 175, 32, 169, 211, 243, 209, 253, 215,
  ]);

  // Create a Keypair from the secret key
  const keypair = Keypair.fromSecretKey(secretKey);

  // Get the public key
  const publicKey = keypair.publicKey;

  console.log("Public Key:", publicKey);

  // Connect to the Solana network (using devnet for this example)
  const connection = new Connection(
    "https://api.devnet.solana.com",
    "confirmed"
  );

  try {
    // Get the balance
    const key = PublicKey(rEcLDWaVLaymz82eGr6cutosPxE6SEzw6q4pbtLuyqf);
    console.log(key);
    const balance = await connection.getBalance(publicKey);
    console.log("SOL Balance:", balance / LAMPORTS_PER_SOL, "SOL");
  } catch (error) {
    console.error("Error fetching balance:", error);
  }
}

checkSolBalance();
