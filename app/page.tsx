import Hero from "@/components/shared/Hero"
import Jobs from "@/components/shared/Jobs";
import { prisma } from "@/lib/prisma";
import Footer from "@/components/shared/Footer";
import AboutPage from "./about/page";
import ContactPage from "./contact/page";

const Home = async () => {
  const jobs = await prisma.jobPosting.findMany({});
  return (
    <div>
      <Hero jobs={jobs} />
      <Jobs />
      <section id="about">
        <AboutPage />
      </section>
      <section id="contact">
        <ContactPage />
      </section>
      <Footer />
    </div>
  )
}

export default Home