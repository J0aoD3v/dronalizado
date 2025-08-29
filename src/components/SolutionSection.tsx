// src/components/SolutionSection.tsx
import React from "react";

const SolutionSection = () => {
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
              <li className="flex items-center ml-0 mb-1">
                <span className="material-symbols-outlined mr-2 text-2xl text-green-600">
                  keyboard_double_arrow_right
                </span>
                Maior Autonomia de Voo
              </li>
              <li className="flex items-center ml-0 mb-1">
                <span className="material-symbols-outlined mr-2 text-2xl text-green-600">
                  keyboard_double_arrow_right
                </span>
                Personalização para o cliente
              </li>
              <li className="flex items-center ml-0">
                <span className="material-symbols-outlined mr-2 text-2xl text-green-600">
                  keyboard_double_arrow_right
                </span>
                Custo Operacional Reduzido
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
