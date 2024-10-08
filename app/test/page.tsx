"use client";
import { useMemo, useState, useEffect } from "react";
import {
  ConnectionProvider,
  useWallet,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  GlowWalletAdapter,
  PhantomWalletAdapter,
  SlopeWalletAdapter,
  SolflareWalletAdapter,
  TorusWalletAdapter,
  BackpackWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import {
  WalletConnectButton,
  WalletModalProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";
import "@solana/wallet-adapter-react-ui/styles.css";
import VerifyProofButton from "../../components/Reclaim/VerifyProof";

import { Reclaim } from "@reclaimprotocol/js-sdk";
import QRCode from "react-qr-code";

export default function Home() {
  const [network, setNetwork] = useState(WalletAdapterNetwork.Devnet);

  const wallet = useWallet();

  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  const wallets = useMemo(() => [new SolflareWalletAdapter({ network })], []);

  const [url, setUrl] = useState("");
  const [ready, setReady] = useState(false);
  const [proof, setProof] = useState({});

  const APP_ID = "0x408edDD2dF298C2F5df1E2eDE2eBF1278A96Ee45"; //TODO: replace with your applicationId
  const reclaimClient = new Reclaim.ProofRequest(APP_ID);

  async function generateVerificationRequest() {
    const providerId = "1bba104c-f7e3-4b58-8b42-f8c0346cdeab"; //TODO: replace with your provider ids you had selected while creating the application

    reclaimClient.addContext(
      `user's address`,
      "for acmecorp.com on 1st january"
    );

    await reclaimClient.buildProofRequest(providerId);

    reclaimClient.setSignature(
      await reclaimClient.generateSignature(
        // this is an MVP, you should not generate the signature on the frontend
        "0x5bdaf747ad9333898a0d9cb613f499d0b00164d7b8230628cf7ffa30fd323372" //TODO : replace with your APP_SECRET
      )
    );

    const { requestUrl, statusUrl } =
      await reclaimClient.createVerificationRequest();

    setUrl(requestUrl);

    await reclaimClient.startSession({
      onSuccessCallback: (proofs) => {
        console.log("Verification success", proofs);
        setReady(true);
        setProof(proofs[0]);
        // Your business logic here
      },
      onFailureCallback: (error) => {
        console.error("Verification failed", error);
        // Your business logic here to handle the error
      },
    });
  }

  return (
    <div>
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets} autoConnect>
          <WalletModalProvider>
            <div>
              <WalletMultiButton />
              {!url && (
                <button onClick={generateVerificationRequest}>
                  Create Claim QrCode
                </button>
              )}
              {url && <QRCode value={url} />}

              {ready && <VerifyProofButton proof={proof} />}
            </div>
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </div>
  );
}
