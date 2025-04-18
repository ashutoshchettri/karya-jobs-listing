import { prisma } from "@/lib/prisma";

export const getJob = async (id: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/jobs/${id}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) return null;
  return res.json();
};

export const getAllJobIds = async () => {
  const jobs = await prisma.jobPosting.findMany({
    select: { id: true }
  });
  return jobs;
};
