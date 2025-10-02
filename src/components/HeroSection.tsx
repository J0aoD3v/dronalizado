"use client";

import React from "react";
import Image from "next/image";

const HeroSection = ({ onClickForm }: { onClickForm?: () => void }) => {
  return (
    <>
      <section className="hero-logo-section relative min-h-screen flex items-center justify-center">
        <div className="relative z-10 flex w-full h-full items-center justify-center px-8">
          <Image
            src="/images/logo.png"
            alt="Logo Dronalizado"
            width={800}
            height={320}
            priority
            className="object-contain max-w-[70vw]"
            style={{ height: "auto" }}
          />
        </div>
      </section>

      <section className="relative min-h-screen flex items-center justify-center text-center bg-cover bg-center bg-[url('/images/11.jpg')]">
        {/* Overlay escuro */}
        <div className="absolute inset-0 bg-black opacity-40"></div>

        {/* Conteúdo */}
        <div className="relative z-10 p-8 max-w-3xl flex flex-col items-center">
          <h1 className="hero-title font-bold text-white mb-4">
            Mapeamento Agrícola de Precisão. <br />
            <span className="text-green-400">O Seu Jeito, No Seu Drone!</span>
          </h1>
          <p className="hero-desc text-white mb-8">
            Serviços inteligentes de mapeamento para otimizar seu tempo.
            Descubra o SEU potencial.
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
    </>
  );
};

export default HeroSection;
