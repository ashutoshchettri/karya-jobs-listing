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

export const deleteJob = async (id: string) => {
  try {
    const deletedJob = await prisma.jobPosting.delete({
      where: { id: id },
    });
    
    return { success: true, job: deletedJob };
  } catch (error) {
    console.error("Error deleting job:", error);
    return { success: false, message: "Failed to delete the job" };
  }
};

export const updateJob = async (id: string, data: { name: string, description: string, salary: number, location: string }) => {
  try {
    const updatedJob = await prisma.jobPosting.update({
      where: { id },
      data,
    });
    return { success: true, job: updatedJob };
  } catch (error) {
    return { success: false, message: "Failed to update the job" };
  }
};