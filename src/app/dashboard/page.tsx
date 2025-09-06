// src/app/dashboard/page.tsx
import React from "react";

export const metadata = {
  title: "Dashboard | Dronalizado",
};

export default function DashboardPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#f9fafb",
        color: "#111827",
        padding: 24,
      }}
    >
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 12 }}>
        Dashboard
      </h1>
      <p style={{ opacity: 0.7 }}>Blank page — content coming soon.</p>
    </main>
  );
}
