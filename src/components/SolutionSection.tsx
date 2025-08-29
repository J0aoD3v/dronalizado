// src/components/SolutionSection.tsx
import React from "react";

const SolutionSection = () => {
  const focusPoints = [
    "Maior Autonomia de Voo",
    "Personalização para o cliente",
    "Custo Operacional Reduzido",
  ];

  return (
    <section id="solution-section" className="py-20 bg-white text-center">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="solution-title font-bold text-green-600 mb-6">
          Nossa Proposta: Mapeamento Otimizado
        </h2>

        <div className="card justify-center items-center">
          <div className="card-icon">
            <span className="material-symbols-outlined">drone</span>
          </div>
          <div className="card-content">
            <h3 className="card-title">Foco em:</h3>
            <ul className="text-lg text-green-700 mt-2 text-left inline-block list-none">
              {focusPoints.map((point, index) => (
                <li key={index} className="flex items-center mb-1">
                  <span className="material-symbols-outlined mr-2 text-2xl text-green-600">
                    keyboard_double_arrow_right
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
