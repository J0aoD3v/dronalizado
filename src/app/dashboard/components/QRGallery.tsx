"use client";

import { useState, useEffect } from "react";
import QRCode from "qrcode";
import styles from "../styles/dashboard.module.css";

interface QRCodeItem {
  id: number;
  name: string;
  url: string;
  qr_id: string;
  created_at: string;
  scan_count: number;
  unique_visitors: number;
  qrImage?: string;
}

interface QRGalleryProps {
  qrCodes: QRCodeItem[];
}

export default function QRGallery({ qrCodes }: QRGalleryProps) {
  const [selectedQR, setSelectedQR] = useState<QRCodeItem | null>(null);
  const [qrImages, setQrImages] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    // Gerar imagens dos QR codes
    const generateQRImages = async () => {
      const images: { [key: string]: string } = {};

      for (const qr of qrCodes) {
        try {
          const qrImageUrl = await QRCode.toDataURL(getTrackingUrl(qr.qr_id), {
            width: 120,
            margin: 1,
            color: { dark: "#000000", light: "#FFFFFF" },
          });
          images[qr.qr_id] = qrImageUrl;
        } catch (error) {
          console.error("Erro ao gerar QR code:", error);
        }
      }

      setQrImages(images);
    };

    if (qrCodes.length > 0) {
      generateQRImages();
    }
  }, [qrCodes]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getTrackingUrl = (qrId: string) => {
    if (typeof window !== "undefined") {
      return `${window.location.origin}/api/qr/track/${qrId}`;
    }
    return `https://dronalizado.vercel.app/api/qr/track/${qrId}`;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("URL copiada para a área de transferência!");
  };

  return (
    <div className={styles.qrGallery}>
      <h2>Galeria de QR Codes</h2>

      {qrCodes.length === 0 ? (
        <div className={styles.emptyState}>
          <p>Nenhum QR Code encontrado. Crie o primeiro!</p>
        </div>
      ) : (
        <div className={styles.qrGrid}>
          {qrCodes.map((qr) => (
            <div key={qr.id} className={styles.qrCard}>
              {qrImages[qr.qr_id] && (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={qrImages[qr.qr_id]}
                    alt={`QR Code ${qr.name}`}
                    className={styles.qrCardImage}
                  />
                </>
              )}

              <h3>{qr.name}</h3>
              <p className={styles.qrUrl}>{qr.url}</p>

              <div className={styles.qrStats}>
                <span>📊 {qr.scan_count} scans</span>
                <span>👥 {qr.unique_visitors} visitantes únicos</span>
              </div>

              <p className={styles.qrDate}>
                Criado: {formatDate(qr.created_at)}
              </p>

              <div className={styles.qrActions}>
                <button
                  onClick={() => copyToClipboard(getTrackingUrl(qr.qr_id))}
                  className={styles.copyBtn}
                >
                  📋 Copiar URL
                </button>
                <button
                  onClick={() => setSelectedQR(qr)}
                  className={styles.viewBtn}
                >
                  👁️ Ver Detalhes
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedQR && (
        <div className={styles.modal} onClick={() => setSelectedQR(null)}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            {qrImages[selectedQR.qr_id] && (
              <div style={{ textAlign: "center", marginBottom: "20px" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={qrImages[selectedQR.qr_id]}
                  alt={`QR Code ${selectedQR.name}`}
                  style={{
                    width: "200px",
                    height: "200px",
                    borderRadius: "10px",
                  }}
                />
              </div>
            )}

            <h3>{selectedQR.name}</h3>

            <div className={styles.modalInfo}>
              <p>
                <strong>URL:</strong>
                <span>{selectedQR.url}</span>
              </p>
              <p>
                <strong>ID:</strong>
                <span>{selectedQR.qr_id}</span>
              </p>
              <p>
                <strong>Total de Scans:</strong>
                <span>{selectedQR.scan_count}</span>
              </p>
              <p>
                <strong>Visitantes Únicos:</strong>
                <span>{selectedQR.unique_visitors}</span>
              </p>
              <p>
                <strong>Criado em:</strong>
                <span>{formatDate(selectedQR.created_at)}</span>
              </p>
            </div>

            <div className={styles.modalActions}>
              <button
                onClick={() =>
                  copyToClipboard(getTrackingUrl(selectedQR.qr_id))
                }
                className={styles.copyBtn}
              >
                📋 Copiar URL de Rastreamento
              </button>
              <button
                onClick={() => setSelectedQR(null)}
                className={styles.closeBtn}
              >
                ❌ Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
