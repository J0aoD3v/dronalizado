// src/components/ProblemSection.tsx
import React from "react";

const ProblemSection = () => {
  const paragraphs = [
    "Drones agrícolas atuais oferecem autonomia limitada e pouca flexibilidade, isso significa mais tempo de recarga, menos área sobrevoada por dia e um custo operacional que pode pesar no SEU bolso.",
    "Especialmente para VOCÊ que está começando ou quer aprimorar o trabalho já realizado.",
    "A necessidade de UMA tecnologia acessível, customizável e com alto desempenho é cada vez maior.",
  ];

  return (
    <section id="problem-section" className="py-20 bg-gray-100 text-center">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="problem-title font-bold text-green-600 mb-6">
          O Principal Desafio do Produtor Moderno
        </h2>
        {paragraphs.map((text, index) => (
          <p
            key={index}
            className={`problem-paragraph mb-4 ${
              index === paragraphs.length - 1
                ? "text-gray-600 mb-0"
                : "text-gray-700"
            }`}
          >
            {text}
          </p>
        ))}
      </div>
    </section>
  );
};

export default ProblemSection;
