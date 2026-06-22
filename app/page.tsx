import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import About from "@/components/About";
import WhyChoose from "@/components/WhyChoose";
import Integrations from "@/components/Integrations";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-navy-950">
      <Header />
      <Hero />
      <Features />
      <About />
      <WhyChoose />
      <Integrations />
      <FAQ />
      <Contact />
      <Footer />
    </main>
  );
}
