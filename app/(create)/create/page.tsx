import CreateForm from "@/app/(create)/components/CreateForm"

const page = () => {
  return (
    <div className="max-w-[1450px] w-[90%] mx-auto pt-24">
      <div className="w-full mt-5 text-center">
        <h1 className="md:text-6xl text-4xl font-bold mb-1">
          Post a <span className="text-[#FF4D00]">Job</span>
        </h1>
      </div>
      <CreateForm />
    </div>
  );
};

export default page