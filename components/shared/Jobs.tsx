"use client";

import { useState } from "react";
import useJobStore from "@/store/useJobStore";
import JobCard from "./JobCard";
import Button from "../ui/Button";

const Jobs = () => {
  const { filteredJobs } = useJobStore();
  const [visibleJobs, setVisibleJobs] = useState(4);
  const jobsIncrement = 4;

  const showMore = () => setVisibleJobs((prev) => prev + jobsIncrement);
  const showLess = () => setVisibleJobs((prev) => prev - jobsIncrement);

  return (
    <section id="jobs" className="bg-white py-20">
      <div className="max-w-[1450px] mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 uppercase tracking-wide">
            Job Listings
          </h2>
          <p className="text-gray-600 mt-3 text-base sm:text-lg">
            Browse open positions and find your next opportunity
          </p>
        </div>

        {filteredJobs.length < 1 ? (
          <div className="text-center">
            <h3 className="text-2xl font-semibold text-gray-700">
              Currently there are no openings
            </h3>
            <p className="text-gray-500 mt-1">Please check back later</p>
          </div>
        ) : (
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredJobs.slice(0, visibleJobs).map((job) => (
                <JobCard key={job.id as React.Key} job={job} />
              ))}
            </div>

            {(filteredJobs.length > visibleJobs || visibleJobs > jobsIncrement) && (
              <div className="flex justify-center mt-12 space-x-4">
                {visibleJobs > jobsIncrement && (
                  <Button onClick={showLess}>Show Less</Button>
                )}
                {filteredJobs.length > visibleJobs && (
                  <Button onClick={showMore}>Show More</Button>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default Jobs;
