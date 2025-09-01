// src/app/page.tsx
import React, { useState } from "react";
import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import SolutionSection from "@/components/SolutionSection";
import ValuePropositionSection from "@/components/ValuePropositionSection";
import MainForm from "@/components/MainForm";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function Home() {
  const [showForm, setShowForm] = useState(false);

  return (
    <main className="font-sans">
      <HeroSection onClickForm={() => setShowForm(true)} />
      <ProblemSection />
      <SolutionSection />
      <ValuePropositionSection />
      {showForm && <MainForm />}
      <CTASection />
      <Footer />
    </main>
  );
}
