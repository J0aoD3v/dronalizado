import { NextResponse } from "next/server";
import { db } from "@/lib/database";

export async function GET() {
  try {
    const qrCodes = await db.all(`
      SELECT 
        qc.*,
        COUNT(qs.id) as scan_count,
        COUNT(DISTINCT qs.ip_address) as unique_visitors
      FROM qr_codes qc
      LEFT JOIN qr_scans qs ON qc.qr_id = qs.qr_id
      WHERE qc.is_active = 1
      GROUP BY qc.id
      ORDER BY qc.created_at DESC
    `);

    return NextResponse.json({
      success: true,
      data: qrCodes,
    });
  } catch (error) {
    console.error("Erro ao buscar QR codes:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
