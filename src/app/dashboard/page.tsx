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
      // Carregar estatísticas
      const statsResponse = await fetch("/api/stats/realtime");
      const statsData = await statsResponse.json();
      setStats(statsData);

      // Carregar QR codes
      const qrResponse = await fetch("/api/stats/qr-codes");
      const qrData = await qrResponse.json();
      setQrCodes(qrData.data || []);

      setIsLoading(false);
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
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
        <QRGallery qrCodes={qrCodes} />
      </main>
    </div>
  );
}
