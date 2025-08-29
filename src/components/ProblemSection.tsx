// src/components/ProblemSection.tsx
import React from "react";

const ProblemSection = () => {
  return (
    <section id="problem-section" className="py-20 bg-gray-100 text-center">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="problem-title font-bold text-green-600 mb-6">
          O Principal Desafio do Produtor Moderno
        </h2>
        <p className="problem-paragraph text-gray-700 mb-4">
          Drones agrícolas atuais oferecem autonomia limitada e pouca
          flexibilidade, isso significa mais tempo de recarga, menos área
          sobrevoada por dia e um custo operacional que pode pesar no SEU bolso.
        </p>
        <p className="problem-paragraph">
          Especialmente para VOCÊ que está começando ou quer aprimorar o
          trabalho já realizado.
        </p>
        <p className="problem-paragraph text-gray-600">
          A necessidade de UMA tecnologia acessível, customizável e com alto
          desempenho é cada vez maior.
        </p>
      </div>
    </section>
  );
};

export default ProblemSection;
