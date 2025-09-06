import { NextResponse } from "next/server";
import { database } from "@/lib/mongodb";

export async function GET() {
  try {
    const qrCodes = await database.getAllQRCodes();

    // Para cada QR code, buscar estatísticas de scan
    const qrCodesWithStats = await Promise.all(
      qrCodes.map(async (qr) => {
        const scans = await database
          .getQRScansCollection()
          .find({
            qr_id: qr.id,
          })
          .toArray();

        const uniqueVisitors = new Set(scans.map((scan) => scan.ip_address))
          .size;

        return {
          ...qr,
          scan_count: qr.scan_count || scans.length,
          unique_visitors: uniqueVisitors,
        };
      })
    );

    return NextResponse.json({
      success: true,
      data: qrCodesWithStats,
    });
  } catch (error) {
    console.error("Erro ao buscar QR codes:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
