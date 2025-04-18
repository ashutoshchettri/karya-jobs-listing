"use client";

import Link from "next/link";
import { jobType } from "@/types/jobTypes";
import Image from "next/image";

interface JobsCardProps {
  job: jobType;
}

const JobCard = ({ job }: JobsCardProps) => {
  return (
    <Link href={`/job/${job.id}`}>
      <div className="shadow bg-gray-50 p-3 rounded-md flex flex-col transform hover:scale-103 transition duration-700">
        <div className="flex justify-between">
          <div>
            <Image
              src={job.img ? job.img.toString() : "/fallbackimage.png"}
              height={40}
              width={40}
              alt={`${job.author} logo`}
            />
            <h2 className="text-sm">{job.author}</h2>
          </div>
          <h2>{job.salary}</h2>
        </div>

        <div className="mt-3 text-xl">
          <h3>{job.name}</h3>
          <p>{job.location}</p>
          <span className="text-sm px-3 rounded-md bg-black text-white">
            {job.employmentType}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default JobCard;