import SearchForm from "./SearchForm";
import { jobType } from "@/types/jobTypes";

interface HeroProps {
  jobs: jobType[];
}

const Hero = ({ jobs }: HeroProps) => {
  return (
    <section
      id="home"
      className="relative bg-white w-full pt-40 pb-20"
    >
      <div className="max-w-[1450px] mx-auto px-4 flex flex-col items-center gap-16 text-center">
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 leading-tight">
            Find Your Dream{" "}
            <span className="text-[#FF4D00]">Job</span>
          </h1>
          <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto">
            Explore thousands of jobs from top companies. Apply quickly and kickstart your career.
          </p>
        </div>

        <div className="w-full max-w-5xl">
          <SearchForm jobs={jobs} />
        </div>
      </div>
    </section>
  );
};

export default Hero;
