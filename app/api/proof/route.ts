import prisma from "@/lib/prismaDb";
import { Reclaim } from "@reclaimprotocol/js-sdk";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const appId = process.env.RECLAIM_APP_ID;
    if (!appId) {
      throw new Error("RECLAIM_APP_ID is not defined");
    }
    const reclaimClient = new Reclaim.ProofRequest(appId);

    // Parse the request URL to get the query parameters
    const url = new URL(req.url);
    //const providerId = url.searchParams.get("id")
    const choice = url.searchParams.get("id");
    const userId = url.searchParams.get("userId");

    console.log(choice);

    // We will select the provider by passing in the array index in the query parameter ie. the array index such as 0 or 1
    // Ensure the choice is a valid index
    if (choice === null) {
      throw new Error("Invalid provider choice");
    }

    // const APP_SECRET = process.env.RECLAIM_APP_SECRET;
    const APP_SECRET = process.env.RECLAIM_APP_SECRET;
    if (!APP_SECRET) {
      throw new Error("RECLAIM_APP_SECRET is not defined");
    }

    // Add context to proof for preventing proof reuse and duplication
    await reclaimClient.addContext(
      `user's address` /* User's blockchain address*/,
      `for userID: ${userId} on ${Date(Date.now())}`
    );

    //you specify the provider ids while creating the app
    //in the frontend we want to choose from the list of given providers
    const sessionData = await reclaimClient.buildProofRequest(
      choice,
      true,
      "V2Linking"
    );
    //add signature before proof gen to prevent phishing
    reclaimClient.setSignature(
      await reclaimClient.generateSignature(APP_SECRET)
    );

    const { requestUrl, statusUrl } =
      await reclaimClient.createVerificationRequest();
    return NextResponse.json({ requestUrl, statusUrl }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({
      status: 500,
      error: "Failed to generate signature",
    });
  }
}

export async function POST(req: Request) {
  const {
    epoch,
    identifier,
    context,
    witnessID,
    witnessUrl,
    parameters,
    provider,
    timestamp,
    userId,
    owner,
    signature,
  } = await req.json();
  console.log(epoch, identifier, context, witnessID, witnessUrl);
  try {
    const res = await prisma.proof.create({
      data: {
        signature,
        epoch,
        identifier,
        context,
        owner,
        parameters,
        provider,
        timestamp,
        witnessID,
        witnessUrl,
        signatures: signature,
        userId,
      },
    });
    return NextResponse.json({ status: 200, data: res });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: 500, error: "Failed to create proof" });
  }
}
