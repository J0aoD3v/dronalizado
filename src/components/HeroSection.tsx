"use client";

import React from "react";

const HeroSection = ({ onClickForm }: { onClickForm?: () => void }) => {
  return (
    <section className="relative h-screen flex items-center justify-center text-center bg-cover bg-center bg-[url('/images/11.jpg')]">
      {/* Overlay escuro */}
      <div className="absolute inset-0 bg-black opacity-40"></div>

      {/* Conteúdo */}
      <div className="relative z-10 p-8 max-w-3xl flex flex-col items-center">
        {/* Logo principal */}
        <img
          src="/images/logo.png"
          alt="Logo Dronalizado"
          width={120}
          height={120}
          style={{ marginBottom: 24 }}
        />

        <h1 className="hero-title font-bold text-white mb-4">
          Mapeamento Agrícola de Precisão. <br />
          <span className="text-green-400">O Seu Jeito, No Seu Drone!</span>
        </h1>
        <p className="hero-desc text-white mb-8">
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
