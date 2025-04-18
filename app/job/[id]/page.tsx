import Button from "@/components/ui/Button";
import { formatPostedDate } from "@/utils/formatDate";
import { getJob, getAllJobIds } from "@/lib/getJob";

export const generateStaticParams = async () => {
  const jobs = await getAllJobIds();
  return jobs.map((job) => ({
    id: job.id,
  }));
};

export const revalidate = 60;

const JobPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;  // Await the Promise to resolve the params

  // Fetch the job based on the id
  const job = await getJob(id);

  if (!job) return <div>Job not found</div>;

  const formattedPostedDate = formatPostedDate(job.createdAt);

  return (
    <>
      <div className="bg-white h-fit relative w-full mt-[-70px] py-28">
        <div className="flex flex-col h-full items-center justify-center pt-[82px] gap-20 w-[90%] mx-auto max-w-[1450px]">
          <h1 className="text-black font-bold text-4xl">{job.name}</h1>
        </div>
      </div>

      <div className="w-[90%] mx-auto max-w-[1450px] py-20">
        <div className="grid md:grid-cols-12 grid-cols-1 gap-[30px]">
          <div className="lg:col-span-4 md:col-span-6">
            <div className="shadow rounded-md bg-white sticky top-20">
              <div className="p-6">
                <h5 className="text-lg font-semibold">Job Information</h5>
                <div className="p-6 border-t border-slate-100">
                  <ul>
                    <li>
                      <div>
                        <p>Employment Type:</p>
                        <span className="font-medium">{job.employmentType}</span>
                      </div>
                    </li>
                    <li className="mt-4">
                      <div>
                        <p>Company:</p>
                        <span className="font-medium">{job.author}</span>
                      </div>
                    </li>
                    <li className="mt-4">
                      <div>
                        <p>Location:</p>
                        <span className="font-medium">{job.location}</span>
                      </div>
                    </li>
                    <li className="mt-4">
                      <div>
                        <p>Salary:</p>
                        <span className="font-medium">{job.salary}k/year</span>
                      </div>
                    </li>
                    <li className="mt-4">
                      <div>
                        <p>Posted</p>
                        <span className="font-medium">{formattedPostedDate}</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 md:col-span-6">
            <h5 className="text-lg font-semibold">Job Description:</h5>
            <p className="mt-4 text-black">{job.description}</p>

            <div className="mt-4">
              <Button>Apply Now</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobPage;
