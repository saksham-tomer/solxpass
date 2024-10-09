import {
  Keypair,
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
} from "@solana/web3.js";

async function checkSolBalance() {
  // Convert the array to a Uint8Array
  const secretKey = new Uint8Array([]);

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
