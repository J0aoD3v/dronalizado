"use client";

import { useEffect } from "react";

interface DashboardStats {
  totalScans: number;
  todayScans: number;
  uniqueVisitors: number;
  activeQRCodes: number;
}

interface RealTimeUpdatesProps {
  onStatsUpdate: (stats: DashboardStats) => void;
}

export default function RealTimeUpdates({
  onStatsUpdate,
}: RealTimeUpdatesProps) {
  useEffect(() => {
    // Atualizar estatísticas a cada 30 segundos
    const interval = setInterval(async () => {
      try {
        const response = await fetch("/api/stats/realtime");
        const stats = await response.json();
        onStatsUpdate(stats);
      } catch (error) {
        console.error("Erro ao atualizar estatísticas:", error);
      }
    }, 30000);

    // Cleanup
    return () => clearInterval(interval);
  }, [onStatsUpdate]);

  return null; // Componente invisível para lógica
}
