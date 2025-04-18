import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
   const id = (await params).id; 
   try {
    const post = await prisma.jobPosting.findUnique({
      where: { id },
    });

    return new NextResponse(JSON.stringify(post, null, 2), { status: 200 });
  } catch (err) {
    console.error(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, null, 2),
      { status: 500 }
    );
  }
}