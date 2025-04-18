'use client'

import { useState } from "react"
import useJobStore from "@/store/useJobStore"
import JobCard from "./JobCard"
import Button from "../ui/Button"

const Jobs = () => {
    const {filteredJobs} = useJobStore()
    const [visibleJobs, setvisibleJobs] = useState(4)
    const jobsIncrement = 4
    const showMore = () => {
        setvisibleJobs((prev) => prev + jobsIncrement)
    }
    const showLess = () => {
        setvisibleJobs((prev) => prev - jobsIncrement)
    }
  return (
    <div id="jobs" className="py-10 w-full">
        <div className="w-full text-center mb-10 text-2xl font-bold uppercase text-black">
            <h2>Job Listings</h2>
        </div>
        {filteredJobs.length < 1 ? (
            <div className="w-full text-center">
                <h1 className="text-2xl font-bold">Currently there are no openings</h1>
                <span className="text-sm">Please check back later</span>
            </div>
        ):(
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 w-[90%] mx-auto max-w-[1400px]">
                {filteredJobs.slice(0, visibleJobs).map((job) => (
                    <JobCard key={job.id as React.Key} job={job} />
                ))}
            </div>
        )}
       {(filteredJobs.length > visibleJobs || visibleJobs > jobsIncrement) && (
            <div className="flex justify-center mt-10 text-sm space-x-4">
                {visibleJobs > jobsIncrement && (
                <Button onClick={showLess}>Show Less</Button>
                )}
                {filteredJobs.length > visibleJobs && (
                <Button onClick={showMore}>Show More</Button>
                )}
            </div>
        )}
    </div>
  )
}

export default Jobs