import { NextResponse } from "next/server";

import prisma from "@/lib/prismaDb";

export async function GET() {
  try {
    const proofCounts = await prisma.$queryRaw`
      SELECT 
        DATE_TRUNC('month', "createdAt")::TEXT as month,
        COUNT(*)::INTEGER as proof_count
      FROM "Providers"
      GROUP BY DATE_TRUNC('month', "createdAt")
      ORDER BY month ASC
    `;

    // Convert BigInt to Number for JSON serialization
    const serializedCounts = proofCounts.map((item: any) => ({
      month: item.month,
      proof_count: Number(item.proof_count),
    }));

    return NextResponse.json(serializedCounts);
  } catch (error) {
    console.error("Error fetching proof counts:", error);
    return NextResponse.json(
      { error: "Error fetching proof counts" },
      { status: 500 }
    );
  }
}
