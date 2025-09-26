"use client";

import React from "react";
import Image from "next/image";

const HeroSection = ({ onClickForm }: { onClickForm?: () => void }) => {
  return (
    <section className="w-full">
      {/* Área da logo com fundo branco */}
      <div className="w-full h-screen">
        <div className="relative w-full h-full">
          <Image
            src="/images/logo_branco.jpg"
            alt="Logo Dronalizado"
            fill
            priority
            className="object-cover"
          />
        </div>
      </div>

      {/* Texto aparece somente ao rolar para baixo */}
      <div className="relative z-10 p-8 max-w-3xl mx-auto text-center mt-16">
        <h1 className="hero-title font-bold text-gray-900 mb-4">
          Mapeamento Agrícola de Precisão. <br />
          <span className="text-green-600">O Seu Jeito, No Seu Drone!</span>
        </h1>
        <p className="hero-desc text-gray-700 mb-8">
          Serviços inteligentes de mapeamento para otimizar seu tempo. Descubra
          o SEU potencial.
        </p>
        <a
          href="#form-section"
          className="button"
          onClick={(e) => {
            e.preventDefault();
            const formSection = document.getElementById("form-section");
            if (formSection) {
              formSection.scrollIntoView({ behavior: "smooth" });
            }
            if (onClickForm) {
              onClickForm();
            }
          }}
        >
          Quer Saber Mais? Clique Aqui!
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
