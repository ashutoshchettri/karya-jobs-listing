import Hero from "@/components/shared/Hero"
import Jobs from "@/components/shared/Jobs";
import { prisma } from "@/lib/prisma";
import Footer from "@/components/shared/Footer";

const Home = async () => {
  const jobs = await prisma.jobPosting.findMany({});
  return (
    <div>
      <Hero jobs={jobs} />
      <Jobs />
      <Footer />
    </div>
  )
}

export default Home