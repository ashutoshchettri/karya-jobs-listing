import SearchForm from "./SearchForm";
import { jobType } from "@/types/jobTypes";

interface HeroProps {
  jobs: jobType[]
}

const Hero = ({jobs}: HeroProps) => {
  return (
    <div
      id="home"
      className="bg-white h-screen relative w-full mt-[-70px]"
    >
      <div className="flex flex-col h-full items-center justify-center pt-[82px] gap-20 w-[90%] mx-auto max-w-[1450px]">
        <div className="text-center flex flex-col gap-3">
            <h1 className="text-6xl font-extrabold text-black">
                Find Your Dream{" "}
                <span className="text-[#FF4D00]">
                Job
                </span>
            </h1>
        </div>
        <SearchForm jobs={jobs} />
      </div>
    </div>
  );
};

export default Hero;