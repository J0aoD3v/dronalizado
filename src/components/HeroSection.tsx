"use client";

import React from "react";

const HeroSection = () => {
  return (
    <section
      className="relative h-screen flex items-center justify-center text-center bg-cover bg-center"
      style={{ backgroundImage: "url('/images/11.jpg')" }}
    >
      {/* Overlay escuro */}
      <div className="absolute inset-0 bg-black opacity-40"></div>

      {/* Conteúdo */}
      <div className="relative z-10 p-8 max-w-3xl">
        <div className="mb-6">
          {/* 
          <Image
              src="/images/1.jpg" // Logo
              alt="Logo PersonalizAgro"
              width={200}
              height={200}
            /> 
          */}
        </div>
        <h1 className="hero-title font-bold text-white mb-4">
          Mapeamento Agrícola de Precisão. <br />
          <span className="text-green-400">O Seu Jeito, No Seu Drone!</span>
        </h1>
        <p className="hero-desc text-white mb-8">
          Serviços inteligentes de mapeamento para otimizar seu tempo. Descubra
          o SEU potencial.
        </p>
        <a href="#form-section" className="button">
          Quer Saber Mais?? Clique AQUI!
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
