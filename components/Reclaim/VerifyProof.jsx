import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import { useState } from "react";
import { Program, AnchorProvider } from "@coral-xyz/anchor";
import { PublicKey } from "@solana/web3.js";
import { u32 } from "@metaplex-foundation/beet";
import { idl as IDL } from "../../config/idl";
import { sendTransactionAnchor } from "../../config/utils";
import { ethers } from "ethers";
import Image from "next/image";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";

const EPOCH_CONFIG_ADDRESS = new PublicKey(
  "FUmVofehkRN6RG4CT8eeszswuqtDcZbCgVKMCQFLvgfY"
);

const RECLAIM_PROGRAM_ID = new PublicKey(
  "8rYXFrtST4ePpMWcEqhazFyRG2DtCUqgtFmKT7FdjRyp"
);

const SEED_PREFIX = new TextEncoder().encode("reclaim");
const SEED_EPOCH = new TextEncoder().encode("epoch");

function toU32Bytes(num) {
  const bytes = Buffer.alloc(4);
  u32.write(bytes, 0, num);
  return bytes;
}

export const PROGRAM_ADDRESS = "8rYXFrtST4ePpMWcEqhazFyRG2DtCUqgtFmKT7FdjRyp";

export const PROGRAM_ID = new PublicKey(PROGRAM_ADDRESS);

function getEpochPda({ epochConfig, epochIdx, programId = PROGRAM_ID }) {
  return PublicKey.findProgramAddressSync(
    [SEED_PREFIX, epochConfig.toBuffer(), SEED_EPOCH, toU32Bytes(epochIdx)],
    programId
  );
}

export function serializeHash(hash) {
  return Array.from(new Uint8Array(ethers.getBytes(hash)));
}

export default function VerifyProofButton(props) {
  const { connection } = useConnection();
  const wallet = useAnchorWallet();
  const [isLoading, setLoading] = useState(false);
  const [showButton, setShowButton] = useState(true);
  const [showUrl, setShowUrl] = useState(false);
  const [url, setUrl] = useState("");

  const session = useSession();

  async function verifyProof(proof, providerData) {
    setLoading(true);
    try {
      if (wallet) {
        console.log(providerData);
        const context = JSON.parse(proof.claimData.context);
        const { provider, parameters, contextAddress, contextMessage } = {
          provider: proof.claimData.provider,
          parameters: proof.claimData.parameters,
          contextAddress: wallet.publicKey,
          contextMessage: context.contextMessage,
        };
        const {
          claimData: { identifier, owner, timestamp, epochIndex },
          signatures,
        } = {
          claimData: {
            identifier: proof.identifier,
            owner: proof.claimData.owner,
            timestamp: proof.claimData.timestampS,
            epochIndex: proof.claimData.epoch,
          },
          signatures: proof.signatures,
        };

        console.log(IDL);
        const program = new Program(
          IDL,
          RECLAIM_PROGRAM_ID,
          new AnchorProvider(connection, wallet, { commitment: "confirmed" })
        );

        const epochIdx = epochIndex;

        const [epochPda] = getEpochPda({
          epochConfig: EPOCH_CONFIG_ADDRESS,
          epochIdx,
        });

        let verifyTx = await program.methods
          .verifyProof({
            // claimInfo: {
            //     provider,
            //     parameters,
            //     contextAddress,
            //     contextMessage,
            // },
            signedClaim: {
              signatures: signatures.map((s) => serializeHash(s)),
              claimData: {
                identifier: serializeHash(identifier),
                epochIndex,
                timestamp,
                owner,
              },
            },
          })
          .accounts({
            signer: wallet.publicKey,
            epoch: epochPda,
            epochConfig: EPOCH_CONFIG_ADDRESS,
          })
          .transaction();

        const sig = await sendTransactionAnchor(
          connection,
          verifyTx.instructions,
          wallet.publicKey,
          wallet,
          []
        );
        const url = `https://solscan.io/tx/${sig}?cluster=devnet`;
        setUrl(url);
        setShowButton(false);
        setShowUrl(true);
        const score = providerData.score;
        const name = providerData.name;

        const response = await fetch("/api/updateUser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            score,
            name,
            sig,
            userId: session?.data?.user?.id,
          }),
        });

        if (!response.ok) {
          console.error("Failed to update user data");
        }
        console.log(sig, verifyTx);
        return sig;
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {showButton && (
        <button
          className="bg-yellow-400 border-2 border-black border-dashed text-black font-bold px-6 py-1 text-sm rounded-lg hover:bg-yellow-600 transition-all duration-300"
          onClick={async () => {
            await verifyProof(props.proof, props.providerData);
          }}
        >
          Verify Proof
        </button>
      )}
      {showUrl && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center mt-6"
        >
          <motion.a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center justify-center bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-lg p-1 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            <div className="flex items-center space-x-3 bg-white rounded-md px-4 py-2">
              <Image
                src="/solscan.png"
                alt="Solscan"
                width={24}
                height={24}
                className="rounded-full"
              />
              <span className="text-black font-semibold">View on Solscan</span>
            </div>
          </motion.a>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="h-0.5 bg-gradient-to-r from-yellow-400 to-yellow-600 mt-2"
          ></motion.div>
        </motion.div>
      )}
    </>
  );
}
