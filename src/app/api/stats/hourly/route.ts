import { NextResponse } from "next/server";
import { db } from "@/lib/database";

export async function GET() {
  try {
    const hourlyStats = await db.all(`
      SELECT 
        strftime('%Y-%m-%d %H:00:00', timestamp) as hour,
        COUNT(*) as total_scans,
        COUNT(DISTINCT ip_address) as unique_visitors
      FROM qr_scans 
      WHERE timestamp >= DATETIME('now', '-24 hours')
      GROUP BY strftime('%Y-%m-%d %H', timestamp)
      ORDER BY hour DESC
    `);

    return NextResponse.json({
      success: true,
      data: hourlyStats,
    });
  } catch (error) {
    console.error("Erro ao buscar estatísticas por hora:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
