"use client";

import { useState } from "react";
import styles from "../styles/dashboard.module.css";

interface QRGeneratorProps {
  onQRGenerated: () => void;
}

export default function QRGenerator({ onQRGenerated }: QRGeneratorProps) {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !url) {
      setMessage("Por favor, preencha todos os campos.");
      return;
    }

    setIsLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/qr/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, url }),
      });

      const data = await response.json();

      if (data.success) {
        setQrCode(data.qrCodeDataURL);
        setMessage(
          data.existing
            ? "QR Code existente encontrado para esta URL!"
            : "QR Code criado com sucesso!"
        );
        onQRGenerated();
      } else {
        setMessage("Erro ao gerar QR Code: " + data.error);
      }
    } catch (error) {
      setMessage("Erro ao conectar com o servidor.");
      console.error("Erro:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if (qrCode) {
      const link = document.createElement("a");
      link.download = `qr-${name.replace(/\s+/g, "-").toLowerCase()}.png`;
      link.href = qrCode;
      link.click();
    }
  };

  return (
    <div className={styles.qrGenerator}>
      <h2>Gerar Novo QR Code</h2>

      <form onSubmit={handleSubmit} className={styles.qrForm}>
        <div className={styles.formGroup}>
          <label htmlFor="name">Nome do QR Code:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ex: Link do Instagram"
            disabled={isLoading}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="url">URL de Destino:</label>
          <input
            type="url"
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://exemplo.com"
            disabled={isLoading}
          />
        </div>

        <button
          type="submit"
          className={styles.generateBtn}
          disabled={isLoading}
        >
          {isLoading ? "Gerando..." : "Gerar QR Code"}
        </button>
      </form>

      {message && (
        <div
          className={`${styles.message} ${
            message.includes("Erro") ? styles.error : styles.success
          }`}
        >
          {message}
        </div>
      )}

      {qrCode && (
        <div className={styles.qrResult}>
          <h3>QR Code Gerado:</h3>
          <img src={qrCode} alt="QR Code" className={styles.qrImage} />
          <button onClick={handleDownload} className={styles.downloadBtn}>
            📥 Download
          </button>
        </div>
      )}
    </div>
  );
}
