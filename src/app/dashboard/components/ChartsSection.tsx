"use client";

import { useEffect, useState } from "react";
import styles from "../styles/dashboard.module.css";

interface ChartData {
  date?: string;
  hour?: string;
  total_scans: number;
  unique_visitors: number;
}

export default function ChartsSection() {
  const [dailyData, setDailyData] = useState<ChartData[]>([]);
  const [hourlyData, setHourlyData] = useState<ChartData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadChartsData();
  }, []);

  const loadChartsData = async () => {
    try {
      const [dailyResponse, hourlyResponse] = await Promise.all([
        fetch("/api/stats/daily"),
        fetch("/api/stats/hourly"),
      ]);

      const dailyResult = await dailyResponse.json();
      const hourlyResult = await hourlyResponse.json();

      setDailyData(dailyResult.data || []);
      setHourlyData(hourlyResult.data || []);
      setIsLoading(false);
    } catch (error) {
      console.error("Erro ao carregar dados dos gráficos:", error);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div className={styles.chartsLoading}>Carregando gráficos...</div>;
  }

  return (
    <div className={styles.chartsSection}>
      <h2>Analytics</h2>

      <div className={styles.chartsGrid}>
        <div className={styles.chartCard}>
          <h3>📈 Últimos 30 Dias</h3>
          <div className={styles.simpleChart}>
            {dailyData.slice(0, 10).map((item, index) => (
              <div key={index} className={styles.chartBar}>
                <div className={styles.barLabel}>
                  {item.date
                    ? new Date(item.date).toLocaleDateString("pt-BR", {
                        day: "2-digit",
                        month: "2-digit",
                      })
                    : "N/A"}
                </div>
                <div className={styles.barContainer}>
                  <div
                    className={styles.bar}
                    style={{
                      height: `${Math.max(
                        20,
                        (item.total_scans /
                          Math.max(...dailyData.map((d) => d.total_scans))) *
                          100
                      )}px`,
                      backgroundColor: "#667eea",
                    }}
                  ></div>
                </div>
                <div className={styles.barValue}>{item.total_scans}</div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.chartCard}>
          <h3>⏰ Últimas 24 Horas</h3>
          <div className={styles.simpleChart}>
            {hourlyData.slice(0, 12).map((item, index) => (
              <div key={index} className={styles.chartBar}>
                <div className={styles.barLabel}>
                  {item.date || item.hour
                    ? new Date(item.date || item.hour || "").toLocaleTimeString(
                        "pt-BR",
                        {
                          hour: "2-digit",
                        }
                      )
                    : "N/A"}
                  h
                </div>
                <div className={styles.barContainer}>
                  <div
                    className={styles.bar}
                    style={{
                      height: `${Math.max(
                        20,
                        (item.total_scans /
                          Math.max(...hourlyData.map((d) => d.total_scans))) *
                          100
                      )}px`,
                      backgroundColor: "#f093fb",
                    }}
                  ></div>
                </div>
                <div className={styles.barValue}>{item.total_scans}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {dailyData.length === 0 && hourlyData.length === 0 && (
        <div className={styles.noData}>
          <p>📊 Ainda não há dados suficientes para exibir gráficos.</p>
          <p>Os gráficos aparecerão quando houver escaneamentos de QR codes.</p>
        </div>
      )}
    </div>
  );
}
