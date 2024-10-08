import prisma from "@/lib/prismaDb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const userId = req.nextUrl.searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { score: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error fetching user score:", error);
    return NextResponse.json(
      { error: "Failed to fetch user score" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function POST(req: Request) {
  try {
    const { score, name, sig, userId } = await req.json();
    const score1 = parseInt(score);
    if (!score1 || score1 != Number(score1)) {
      return NextResponse.json(
        { error: `Invalid score value: ${score1}` },
        { status: 400 }
      );
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        score: { increment: score1 },
        providers: {
          create: {
            name: name,
            signatures: [sig],
            score: score1,
          },
        },
      },
      include: {
        providers: true,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 }
    );
  }
}
