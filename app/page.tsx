import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TransformationSection from "@/components/TransformationSection";
import Services from "@/components/Services";
import WorkPreview from "@/components/WorkPreview";
import Process from "@/components/Process";
import FounderNote from "@/components/FounderNote";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

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
