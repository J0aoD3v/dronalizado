// src/app/page.tsx
"use client";
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
      {showForm && (
        <div className="mx-auto my-12 max-w-xl bg-white rounded-lg shadow-lg p-6">
          <MainForm />
        </div>
      )}
      <CTASection />
      <Footer />
    </main>
  );
}
