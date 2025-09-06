import { NextResponse } from "next/server";
import { database } from "@/lib/mongodb";

export async function GET() {
  try {
    console.log("🔍 Verificando saúde do sistema...");
    
    // Tentar conectar
    await database.connect();
    
    // Verificar se está conectado
    const isConnected = await database.isConnected();
    
    if (!isConnected) {
      throw new Error("Falha na conexão com MongoDB");
    }
    
    // Testar operações básicas
    const dbInfo = {
      connected: isConnected,
      database: process.env.DATABASE_NAME || "dronalizado",
      collections: {
        qr_codes: process.env.COLLECTION_QR_CODES || "qr_codes",
        qr_scans: process.env.COLLECTION_QR_SCANS || "qr_scans",
        qr_stats: process.env.COLLECTION_QR_STATS || "qr_stats",
        dashboard: process.env.COLLECTION_DASHBOARD || "qr_dashboard"
      }
    };
    
    console.log("✅ Sistema saudável:", dbInfo);
    
    return NextResponse.json({
      status: "healthy",
      timestamp: new Date().toISOString(),
      mongodb: dbInfo
    });
    
  } catch (error) {
    console.error("❌ Erro no health check:", error);
    
    return NextResponse.json(
      {
        status: "unhealthy",
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : "Erro desconhecido"
      },
      { status: 500 }
    );
  }
}
