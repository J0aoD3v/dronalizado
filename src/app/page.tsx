import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import SolutionSection from "@/components/SolutionSection";
import ValuePropositionSection from "@/components/ValuePropositionSection";
import MainForm from "@/components/MainForm";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="font-sans">
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <ValuePropositionSection />
      <MainForm /> {/* Formulário para coletar dados */}
      <CTASection />
      <Footer />
    </main>
  );
}
