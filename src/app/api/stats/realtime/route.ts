import { NextResponse } from "next/server";
import { db } from "@/lib/database";

export async function GET() {
  try {
    const [totalScans, todayScans, uniqueVisitors, activeQRCodes] =
      await Promise.all([
        db.get("SELECT COUNT(*) as count FROM qr_scans"),
        db.get(
          'SELECT COUNT(*) as count FROM qr_scans WHERE DATE(timestamp) = DATE("now")'
        ),
        db.get("SELECT COUNT(DISTINCT ip_address) as count FROM qr_scans"),
        db.get("SELECT COUNT(*) as count FROM qr_codes WHERE is_active = 1"),
      ]);

    return NextResponse.json({
      totalScans: totalScans?.count || 0,
      todayScans: todayScans?.count || 0,
      uniqueVisitors: uniqueVisitors?.count || 0,
      activeQRCodes: activeQRCodes?.count || 0,
    });
  } catch (error) {
    console.error("Erro ao buscar estatísticas:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
