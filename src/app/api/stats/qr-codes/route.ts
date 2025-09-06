import { NextResponse } from "next/server";
import { database } from "@/lib/mongodb";

export async function GET() {
  try {
    // Garantir conexão com o database
    await database.connect();
    
    console.log("Buscando QR codes...");
    const qrCodes = await database.getAllQRCodes();
    console.log(`Encontrados ${qrCodes.length} QR codes`);

    // Para cada QR code, buscar estatísticas de scan
    const qrCodesWithStats = await Promise.all(
      qrCodes.map(async (qr) => {
        try {
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
        } catch (scanError) {
          console.warn(`Erro ao buscar scans para QR ${qr.id}:`, scanError);
          return {
            ...qr,
            scan_count: qr.scan_count || 0,
            unique_visitors: 0,
          };
        }
      })
    );

    console.log("QR codes com estatísticas processados:", qrCodesWithStats.length);

    return NextResponse.json({
      success: true,
      data: qrCodesWithStats,
    });
  } catch (error) {
    console.error("Erro ao buscar QR codes:", error);
    return NextResponse.json(
      { 
        success: false,
        error: "Erro interno do servidor",
        data: []
      },
      { status: 500 }
    );
  }
}
