import Header from "@/components/layout/Header";
import Hero from "@/components/home/Hero";
import TransformationSection from "@/components/home/TransformationSection";
import Services from "@/components/home/Services";
import WorkPreview from "@/components/home/WorkPreview";
import Process from "@/components/home/Process";
import FounderNote from "@/components/home/FounderNote";
import CTA from "@/components/home/CTA";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <TransformationSection />
        <Services />
        <WorkPreview />
        <Process />
        <FounderNote />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
