// src/components/ValuePropositionSection.tsx
import React from "react";

const cards = [
  {
    icon: "schedule",
    title: "Tempo de Voo Superior",
    description:
      "Menos paradas para recarga, mais eficiência em cada missão de mapeamento.",
  },
  {
    icon: "attach_money",
    title: "Custo Inteligente",
    description:
      "Tecnologia de ponta com um modelo de serviço que cabe no seu orçamento.",
  },
  {
    icon: "settings",
    title: "Facilidade de Customização",
    description: "Configurações acessíveis para TODOS os nossos clientes.",
  },
  {
    icon: "menu_book",
    title: "Não sabe como voar?",
    description: "O manual do drone estará em suas mãos.",
  },
];

const ValuePropositionSection = () => {
  return (
    <section
      id="value-proposition-section"
      className="py-20 bg-gray-50 text-center"
    >
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-6xl font-extrabold text-green-600 mb-16">
          Por Que DRONALIZADO?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {cards.map((card, index) => (
            <div className="card" key={index}>
              <div className="card-icon">
                <span className="material-symbols-outlined">{card.icon}</span>
              </div>
              <div className="card-content">
                <h3 className="card-title">{card.title}</h3>
                <p className="card-description">{card.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValuePropositionSection;
