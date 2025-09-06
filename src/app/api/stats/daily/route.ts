import { NextResponse } from "next/server";
import { db } from "@/lib/database";

export async function GET() {
  try {
    const dailyStats = await db.all(`
      SELECT 
        DATE(timestamp) as date,
        COUNT(*) as total_scans,
        COUNT(DISTINCT ip_address) as unique_visitors
      FROM qr_scans 
      WHERE timestamp >= DATE('now', '-30 days')
      GROUP BY DATE(timestamp)
      ORDER BY DATE(timestamp) DESC
    `);

    return NextResponse.json({
      success: true,
      data: dailyStats,
    });
  } catch (error) {
    console.error("Erro ao buscar estatísticas diárias:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
