import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { Services } from "@/components/services";
import { MarqueeLine } from "@/components/marquee-line";
import { Cases } from "@/components/cases";
import { Gallery } from "@/components/gallery";
import { Process } from "@/components/process";
import { Advantages } from "@/components/advantages";
import { Testimonials } from "@/components/testimonials";
import { LeadForm } from "@/components/lead-form";
import { Faq } from "@/components/faq";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Services />
        <MarqueeLine />
        <Cases />
        <Gallery />
        <Process />
        <Advantages />
        <Testimonials />
        <LeadForm />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
