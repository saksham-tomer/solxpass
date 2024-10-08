import prisma from "@/lib/prismaDb";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json(
      { message: "User ID is required" },
      { status: 400 }
    );
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        providers: true,
      },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const providerNames =
      user.providers?.map((provider) => ({
        name: provider.name,
      })) || [];

    return NextResponse.json({ providerNames }, { status: 200 });
  } catch (error) {
    console.error("Error fetching providers:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
