// src/components/MainForm.tsx
import React from "react";

const MainForm = () => {
  const googleFormUrl = process.env.NEXT_PUBLIC_GOOGLE_FORMS_URL;

  const title = googleFormUrl
    ? "Transforme Seu Negócio: Cadastre-se!"
    : "Interessado em testar nosso produto?";

  const description = googleFormUrl
    ? "Seja um dos primeiros a experimentar o mapeamento Otimizado. Deixe seus dados e entraremos em contato para um projeto piloto com desconto especial."
    : "Em breve, você poderá se cadastrar aqui. Por enquanto, entre em contato pelo email ou telefone para mais informações.";

  return (
    <section id="form-section" className="py-20 bg-green-50 text-center">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="mainform-title font-bold text-green-700 mb-6">
          {title}
        </h2>
        <p className="mainform-paragraph text-gray-700 mb-8">{description}</p>
        <div className="bg-white p-8 rounded-xl shadow-lg">
          {googleFormUrl ? (
            <iframe
              src={googleFormUrl}
              width="100%"
              height="800"
              frameBorder="0"
              marginHeight={0}
              marginWidth={0}
              title="Formulário Dronalizado"
            >
              Carregando formulário...
            </iframe>
          ) : (
            <p>Configuração de formulário pendente.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default MainForm;
