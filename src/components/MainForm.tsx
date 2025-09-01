// src/components/MainForm.tsx
import React, { useState } from "react";

const MainForm = () => {
  // URL do Google Forms fornecido diretamente
  const googleFormUrl =
    "https://docs.google.com/forms/d/e/1FAIpQLSeZm_d27v4u3Heuex_jNhPoQ6FE8c1wxcmBjbVBe27c-banpg/viewform?usp=header";

  const title = googleFormUrl
    ? "Transforme Seu Negócio: Cadastre-se!"
    : "Interessado em testar nosso produto?";

  const description = googleFormUrl
    ? "Seja um dos primeiros a experimentar o mapeamento Otimizado. Deixe seus dados e entraremos em contato para um projeto piloto com desconto especial."
    : "Em breve, você poderá se cadastrar aqui. Por enquanto, entre em contato pelo email ou telefone para mais informações.";

  const [showForm, setShowForm] = useState(false);

  return (
    <section id="form-section" className="mainform-section">
      <div className="mainform-container">
        <h2 className="mainform-title">{title}</h2>
        <p className="mainform-paragraph">{description}</p>
        {!showForm && (
          <button
            className="mainform-open-btn"
            onClick={() => setShowForm(true)}
          >
            Abrir Formulário
          </button>
        )}
        {showForm && (
          <div className="mainform-box" style={{ position: "relative" }}>
            <button
              className="mainform-close-btn"
              onClick={() => setShowForm(false)}
              aria-label="Fechar formulário"
              style={{
                position: "absolute",
                top: 12,
                right: 12,
                background: "#dc2626",
                color: "#fff",
                border: "none",
                borderRadius: 6,
                width: 36,
                height: 36,
                fontSize: 24,
                fontWeight: "bold",
                cursor: "pointer",
                zIndex: 10,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
              }}
            >
              ×
            </button>
            {googleFormUrl ? (
              <div className="mainform-iframe-wrapper">
                <iframe
                  src={googleFormUrl}
                  title="Formulário Dronalizado"
                  className="mainform-iframe"
                  allowFullScreen
                >
                  Carregando formulário...
                </iframe>
              </div>
            ) : (
              <p>Configuração de formulário pendente.</p>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default MainForm;
