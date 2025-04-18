import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();

    const {
      name,
      description,
      location,
      author,
      salary,
      img,
      employmentType,
    } = body;

    const job = await prisma.jobPosting.create({
      data: {
        name,
        description,
        location,
        author,
        salary: parseFloat(salary),
        img,
        employmentType,
      },
    });

    return NextResponse.json(job, { status: 201 });
  } catch (error) {
    console.error("Failed to create job:", error);
    return NextResponse.json(
      { message: "Something went wrong!" },
      { status: 500 }
    );
  }
};
