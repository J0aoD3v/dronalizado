"use client";

import { useEffect, useState } from "react";
import {
  StatsCards,
  QRGenerator,
  QRGallery,
  ChartsSection,
  RealTimeUpdates,
} from "./components";
import styles from "./styles/dashboard.module.css";

interface DashboardStats {
  totalScans: number;
  todayScans: number;
  uniqueVisitors: number;
  activeQRCodes: number;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [qrCodes, setQrCodes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setIsLoading(true);

      // Carregar estatísticas
      console.log("Carregando estatísticas...");
      const statsResponse = await fetch("/api/stats/realtime");

      if (statsResponse.ok) {
        const statsData = await statsResponse.json();
        console.log("Estatísticas carregadas:", statsData);
        setStats(statsData);
      } else {
        console.error("Erro ao carregar estatísticas:", statsResponse.status);
        // Definir valores padrão
        setStats({
          totalScans: 0,
          todayScans: 0,
          uniqueVisitors: 0,
          activeQRCodes: 0,
        });
      }

      // Carregar QR codes
      console.log("Carregando QR codes...");
      const qrResponse = await fetch("/api/stats/qr-codes");

      if (qrResponse.ok) {
        const qrData = await qrResponse.json();
        console.log("QR codes carregados:", qrData);
        setQrCodes(qrData.data || []);
      } else {
        console.error("Erro ao carregar QR codes:", qrResponse.status);
        setQrCodes([]);
      }
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
      // Definir valores padrão em caso de erro
      setStats({
        totalScans: 0,
        todayScans: 0,
        uniqueVisitors: 0,
        activeQRCodes: 0,
      });
      setQrCodes([]);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div className={styles.loading}>Carregando dashboard...</div>;
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Dashboard Dronalizado</h1>
        <p>Analytics e Gerenciamento de QR Codes</p>
      </header>

      <RealTimeUpdates onStatsUpdate={setStats} />

      <main className={styles.main}>
        <StatsCards stats={stats} />
        <QRGenerator onQRGenerated={loadDashboardData} />
        <ChartsSection />
        <QRGallery qrCodes={qrCodes} onQRDeleted={loadDashboardData} />
      </main>
    </div>
  );
}
