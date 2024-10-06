import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import { useState } from "react";
import { Program, AnchorProvider } from "@coral-xyz/anchor";
import { PublicKey } from "@solana/web3.js";
import { u32 } from "@metaplex-foundation/beet";
import { idl as IDL } from "../../config/idl";
import { sendTransactionAnchor } from "../../config/utils";
import { ethers } from "ethers";

const EPOCH_CONFIG_ADDRESS = new PublicKey(
  "Bj8P9vztGFwt49rqqu3B1zTofpxku18ppWQZmZaPdXgV"
);

const RECLAIM_PROGRAM_ID = new PublicKey(
  "rEcLDWaVLaymz82eGr6cutosPxE6SEzw6q4pbtLuyqf"
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

  async function verifyProof(proof) {
    setLoading(true);
    try {
      if (wallet) {
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

        // PDAs for reclaim
        const [epochPda] = getEpochPda({
          epochConfig: EPOCH_CONFIG_ADDRESS,
          epochIdx,
        });

        let verifyTx = await program.methods
          .verifyAndStore({
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
            /** Address who requested the proof */
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

        return sig;
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={async () => {
        await verifyProof(props.proof);
      }}
    >
      Verify Proof
    </button>
  );
}
