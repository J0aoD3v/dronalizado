// src/components/MainForm.tsx
import React from "react";

const MainForm = () => {
  // Certifique-se de que GOOGLE_FORMS_URL está configurado no .env.local
  const googleFormUrl = process.env.NEXT_PUBLIC_GOOGLE_FORMS_URL;

  if (!googleFormUrl) {
    // Renderizar uma mensagem de erro ou um formulário simples de fallback se a URL não estiver configurada
    return (
      <section id="form-section" className="py-20 bg-green-50 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="mainform-title font-bold text-green-700 mb-6">
            Interessado em testar nosso produto?
          </h2>
          <p className="mainform-paragraph text-gray-700 mb-8">
            Em breve, você poderá se cadastrar aqui. Por enquanto, entre em
            contato pelo email ou telefone para mais informações.
          </p>
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <p>Configuração de formulário pendente.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="form-section" className="py-20 bg-green-50 text-center">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="mainform-title font-bold text-green-700 mb-6">
          Transforme Seu Negócio: Cadastre-se!
        </h2>
        <p className="mainform-paragraph text-gray-700 mb-8">
          Seja um dos primeiros a experimentar o mapeamento Otimizado. Deixe
          seus dados e entraremos em contato para um projeto piloto com desconto
          especial.
        </p>
        <div className="bg-white p-8 rounded-xl shadow-lg">
          {/* Embed do Google Form */}
          <iframe
            src={googleFormUrl}
            width="100%"
            height="800" // Ajuste a altura conforme o seu formulário
            frameBorder="0"
            marginHeight={0}
            marginWidth={0}
            title="Formulário PersonalizAgro"
          >
            Carregando formulário...
          </iframe>
        </div>
      </div>
    </section>
  );
};

export default MainForm;
