import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import Button from "@/components/ui/Button";
import { formatPostedDate } from "@/utils/formatDate";
import { getJob, getAllJobIds } from "@/lib/getJob";
import Link from "next/link";

interface Job {
  id: string;
}

export const generateStaticParams = async () => {
  const jobs: Job[] = await getAllJobIds();
  return jobs.map((job) => ({
    id: job.id,
  }));
};

export const revalidate = 60;

const JobPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const job = await getJob(id);

  const session = await getServerSession(authOptions);

  if (!job) return <div className="text-center py-20 text-red-500 text-lg">Job not found</div>;

  const formattedPostedDate = formatPostedDate(job.createdAt);
  const isCompany = session?.user?.role === "COMPANY";

  return (
    <>
      <div className="bg-gradient-to-r from-blue-100 to-white pt-36 pb-20 text-center relative">
        <div className="max-w-[900px] mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">{job.name}</h1>
          <p className="text-lg text-gray-600">at <span className="font-semibold">{job.author}</span></p>
        </div>
      </div>

      <div className="max-w-[1450px] w-[90%] mx-auto py-16 grid grid-cols-1 md:grid-cols-12 gap-10">
        {/* Sidebar */}
        <aside className="md:col-span-5 lg:col-span-4">
          <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24 border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Job Details</h2>
            <ul className="space-y-5 text-sm text-gray-700">
              <li>
                <p className="text-gray-500">Employment Type:</p>
                <span className="font-medium text-gray-800">{job.employmentType}</span>
              </li>
              <li>
                <p className="text-gray-500">Company:</p>
                <span className="font-medium text-gray-800">{job.author}</span>
              </li>
              <li>
                <p className="text-gray-500">Location:</p>
                <span className="font-medium text-gray-800">{job.location}</span>
              </li>
              <li>
                <p className="text-gray-500">Salary:</p>
                <span className="font-medium text-gray-800">${job.salary}k / year</span>
              </li>
              <li>
                <p className="text-gray-500">Posted:</p>
                <span className="font-medium text-gray-800">{formattedPostedDate}</span>
              </li>
            </ul>
          </div>
        </aside>

        <main className="md:col-span-7 lg:col-span-8">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Job Description</h2>
            <p className="text-gray-800 leading-relaxed whitespace-pre-line">
              {job.description}
            </p>

            <div className="mt-10">
            {!isCompany && (
              <>
                {session ? (
                  <Link href={`/job/${job.id}/apply`}>
                    <Button>Apply Now</Button>
                  </Link>
                ) : (
                  <div className="mt-4">
                    <p className="text-sm text-red-500 mb-2">You need to login to apply for this job.</p>
                    <Link href="/signin">
                      <Button>Login to Apply</Button>
                    </Link>
                  </div>
                )}
              </>
            )}
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default JobPage;
