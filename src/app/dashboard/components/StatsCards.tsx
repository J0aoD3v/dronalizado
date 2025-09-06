"use client";

import styles from "../styles/dashboard.module.css";

interface StatsCardsProps {
  stats: {
    totalScans: number;
    todayScans: number;
    uniqueVisitors: number;
    activeQRCodes: number;
  } | null;
}

export default function StatsCards({ stats }: StatsCardsProps) {
  if (!stats)
    return (
      <div style={{ color: "#000000", textAlign: "center", padding: "20px" }}>
        Carregando estatísticas...
      </div>
    );

  const cards = [
    {
      title: "Total de Scans",
      value: stats.totalScans,
      icon: "📊",
      color: "#667eea",
    },
    {
      title: "Scans Hoje",
      value: stats.todayScans,
      icon: "📅",
      color: "#764ba2",
    },
    {
      title: "Visitantes Únicos",
      value: stats.uniqueVisitors,
      icon: "👥",
      color: "#f093fb",
    },
    {
      title: "QR Codes Ativos",
      value: stats.activeQRCodes,
      icon: "🔗",
      color: "#4facfe",
    },
  ];

  return (
    <div className={styles.statsGrid}>
      {cards.map((card, index) => (
        <div
          key={index}
          className={styles.statCard}
          style={{ borderColor: card.color }}
        >
          <div className={styles.statIcon}>{card.icon}</div>
          <div className={styles.statContent}>
            <h3>{card.title}</h3>
            <p className={styles.statValue}>{card.value.toLocaleString()}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
