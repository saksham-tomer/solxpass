"use client";
import React, { useState, useEffect } from "react";
import { Reclaim } from "@reclaimprotocol/js-sdk";
import QRCode from "react-qr-code";
import { Clipboard } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import VerifyProofButton from "../Reclaim/VerifyProof";
interface ProviderData {
  id: string;
  name: string;
  score: number;
}

export default function RequestProof({
  providerData,
}: {
  providerData: ProviderData;
}) {
  const [requestUrl, setRequestUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [proof, setProof] = useState({});

  useEffect(() => {
    console.log(providerData);
  }, []);
  const reclaimClient = new Reclaim.ProofRequest(
    "f9f383fd-32d9-4c54-942f-5e9fda349762"
  );

  const userId = uuidv4();

  const handleReqProof = async () => {
    try {
      setIsLoading(true);
      console.log("Requesting proof...");

      const response = await fetch(
        `http://localhost:3000/api/proof?userId=${userId}&id=${providerData.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        const reqUrl = data.requestUrl;
        console.log("Request URL received:", reqUrl);

        setRequestUrl(reqUrl);
        reclaimClient.setStatusUrl(data.statusUrl);

        await reclaimClient.startSession({
          onSuccessCallback: async (proofs) => {
            setProof(proofs[0]);
            console.log("Proofs received:", proofs);
            (() => {
              setInterval(() => {
                setShowSuccess(true);
                return setShowSuccess(false);
              }, 1000);
              return clearInterval;
            })();
            <VerifyProofButton proof={proof} />;
            // const claimData = proofs[0]?.claimData;
            // const witness = proofs[0]?.witnesses[0];
            // const signature = proofs[0]?.signatures[0];
            // const epoch = claimData.epoch;
            // const identifier = claimData.identifier;
            // const context = claimData.context;
            // const parameters = claimData.parameters;
            // const provider = claimData.provider;
            // const timestamp = claimData.timestampS;
            // const owner = claimData.owner;
            // const witnessID = witness.id;
            // const witnessUrl = witness.url;

            // try {
            //   const res = await axios.post("/api/proof", {
            //     data: {
            //       epoch,
            //       identifier,
            //       context,
            //       witnessID,
            //       witnessUrl,
            //       parameters,
            //       provider,
            //       timestamp,
            //       owner,
            //       signature,
            //       userId,
            //     },
            //   });
            //   if (res) {
            //     console.log("Proof posted successfully", res.data);
            //   } else {
            //     console.error("Failed to post proof");
            //   }
            // } catch (error) {
            //   console.error("Error posting proof:", error);
            // }
          },
          onFailureCallback: (error) => {
            console.error("Session failed:", error.message);
          },
        });
      } else {
        console.error("Failed to fetch request proof");
      }
    } catch (err) {
      console.error("Error requesting proof:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(requestUrl).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-900 p-6 rounded-lg shadow-lg">
      {requestUrl && (
        <>
          <div className="mb-4 p-4 bg-white rounded-lg">
            {showSuccess && (
              <div className="flex items-center justify-center">
                <p className="text-green-500 text-sm">Success!</p>
              </div>
            )}
            <QRCode
              size={256}
              style={{ height: "auto", maxWidth: "100%", width: "100%" }}
              value={requestUrl}
              viewBox={`0 0 256 256`}
            />
          </div>
          <button
            onClick={handleCopyToClipboard}
            className="mb-4 flex items-center bg-gray-700 text-white px-4 py-1 border border-white/90 border-dashed text-sm rounded-lg hover:bg-gray-600 transition-all duration-300"
          >
            <Clipboard className="mr-2" size={16} />
            {isCopied ? "Copied!" : "Copy URL"}
          </button>
        </>
      )}
      <button
        type="submit"
        onClick={handleReqProof}
        className={`bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-all duration-300 ${
          isLoading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={isLoading}
      >
        {isLoading ? "Loading..." : "Generate QR Code"}
      </button>
    </div>
  );
}
