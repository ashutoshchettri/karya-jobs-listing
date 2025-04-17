import SearchForm from "./SearchForm";

const Hero = () => {
  return (
    <div
      id="home"
      className="bg-black h-screen relative w-full mt-[-70px]"
    >
      <div className="flex flex-col h-full items-center justify-center pt-[82px] gap-20 w-[90%] mx-auto max-w-[1450px]">
        <div className="text-center flex flex-col gap-3">
            <h1 className="text-6xl font-extrabold text-white">
                Find Your Dream{" "}
                <span className="text-[#FF4D00]">
                Job
                </span>
            </h1>
        </div>
        <SearchForm />
      </div>
    </div>
  );
};

export default Hero;