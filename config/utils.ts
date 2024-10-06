import { Wallet } from "@coral-xyz/anchor";
import { AnchorWallet } from "@solana/wallet-adapter-react";
import {
    ComputeBudgetProgram,
    Connection,
    Keypair,
    PublicKey,
    TransactionInstruction,
    TransactionMessage,
    VersionedTransaction,
} from "@solana/web3.js";
import { ethers } from "ethers";

export function createComputeLimitAndFeeIx(units, feeLamports) {
    const modifyComputeUnitsIx = ComputeBudgetProgram.setComputeUnitLimit({
        units,
    });

    const addPriorityFeeIx = ComputeBudgetProgram.setComputeUnitPrice({
        microLamports: feeLamports,
    });

    return [modifyComputeUnitsIx, addPriorityFeeIx];
}

export function serializeHash(hash) {
    return Array.from(new Uint8Array(ethers.getBytes(hash)));
}

export async function sendTransaction(
    connection,
    instructions,
    payer,
    signers,
    skipPreflight = false
) {
    // const computeFeeLimitIx = createComputeLimitAndFeeIx(500_000, 1);
    const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();

    const message = new TransactionMessage({
        instructions: [...instructions],
        payerKey: payer,
        recentBlockhash: blockhash,
    }).compileToV0Message();

    const tx = new VersionedTransaction(message);
    tx.sign(signers);

    const signature = await connection.sendRawTransaction(tx.serialize(), {
        skipPreflight,
    });

    await connection.confirmTransaction({
        blockhash,
        lastValidBlockHeight,
        signature,
    });

    return signature;
}

export async function sendTransactionAnchor(
    connection,
    instructions,
    payer,
    wallet,
    signers,
    skipPreflight = false
) {
    const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();
    const message = new TransactionMessage({
        instructions,
        payerKey: payer,
        recentBlockhash: blockhash,
    }).compileToV0Message();

    const tx = new VersionedTransaction(message);
    const signedTx = await wallet.signTransaction(tx);
    signedTx.sign(signers);


    const signature = await connection.sendTransaction(signedTx, {
        skipPreflight,
    });
    await connection.confirmTransaction({
        blockhash,
        lastValidBlockHeight,
        signature,
    });

    return signature;
}

export const SMOKE_PROOF = {
    "identifier": "0x9ec8f9f52623234433ce5ea0cc0f5aac0dfbeef553e68d2d403633bd9192e365",
    "claimData": {
        "provider": "http",
        "parameters": "{\"body\":\"\",\"geoLocation\":\"in\",\"method\":\"GET\",\"paramValues\":{\"CLAIM_DATA\":\"76561199614512180\"},\"responseMatches\":[{\"type\":\"contains\",\"value\":\"_steamid\\\">Steam ID: {{CLAIM_DATA}}</div>\"}],\"responseRedactions\":[{\"jsonPath\":\"\",\"regex\":\"_steamid\\\">Steam ID: (.*)</div>\",\"xPath\":\"id(\\\"responsive_page_template_content\\\")/div[@class=\\\"page_header_ctn\\\"]/div[@class=\\\"page_content\\\"]/div[@class=\\\"youraccount_steamid\\\"]\"}],\"url\":\"https://store.steampowered.com/account/\"}",
        "owner": "0xa1b6e6ffb85df5bdf78e6558d3224ab87f7cc4c7",
        "timestampS": 1717053708,
        "context": "{\"contextAddress\":\"user's address\",\"contextMessage\":\"for acmecorp.com on 1st january\",\"extractedParameters\":{\"CLAIM_DATA\":\"76561199614512180\"},\"providerHash\":\"0x5f5312e27124dc7605f70a7d884e169049679b93f91c137b4d18a8569d825900\"}",
        "identifier": "0x9ec8f9f52623234433ce5ea0cc0f5aac0dfbeef553e68d2d403633bd9192e365",
        "epoch": 1
    },
    "signatures": [
        "0xcbad077154cc5c8e494576d4336f57972f7412058c1a637e05832c6bdabd018f4da18ad973f29553921d7d030370032addac1159146b77ec6cc5dab4133ffec01c"
    ],
    "witnesses": [
        {
            "id": "0x244897572368eadf65bfbc5aec98d8e5443a9072",
            "url": "https://reclaim-node.questbook.app"
        }
    ]
}