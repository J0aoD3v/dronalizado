// src/components/CTASection.tsx
import React from "react";

const CTASection = () => {
  return (
    <section className="bg-green-600 text-white py-20 text-center">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="cta-title font-bold mb-6">
          Pronto para fazer parte da Melhoria na Agricultura?
        </h2>
        <p className="cta-desc mb-8">
          Não fique para trás, Descubra como a tecnologia pode otimizar seu
          desejo e reduzir seus custos.
        </p>
        {/* Link para o formulário */}
        <a
          href="#form-section"
          className="cta-btn bg-white hover:bg-gray-200 text-green-600 font-bold py-4 rounded-lg text-lg transition duration-300 ease-in-out"
        >
          <span className="cta-btn-text">Quero meu DRONALIZADO!</span>
        </a>
      </div>
    </section>
  );
};

export default CTASection;
