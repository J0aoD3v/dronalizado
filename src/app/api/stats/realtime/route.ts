import { NextResponse } from "next/server";
import { database } from "@/lib/mongodb";

export async function GET() {
  try {
    // Tentar conectar ao database
    await database.connect();

    // Atualizar estatísticas
    await database.updateStats();
    const stats = await database.getStats();

    // Buscar visitantes únicos
    let uniqueCount = 0;
    try {
      const uniqueVisitors = await database
        .getQRScansCollection()
        .aggregate([
          {
            $group: {
              _id: "$ip_address",
            },
          },
          {
            $count: "count",
          },
        ])
        .toArray();

      uniqueCount = uniqueVisitors.length > 0 ? uniqueVisitors[0].count : 0;
    } catch (uniqueError) {
      console.warn("Erro ao buscar visitantes únicos:", uniqueError);
    }

    const response = {
      totalScans: stats?.total_scans || 0,
      todayScans: stats?.today_scans || 0,
      uniqueVisitors: uniqueCount,
      activeQRCodes: stats?.total_qr_codes || 0,
    };

    console.log("Estatísticas retornadas:", response);

    return NextResponse.json(response);
  } catch (error) {
    console.error("Erro ao buscar estatísticas:", error);

    // Retornar dados padrão em caso de erro
    return NextResponse.json({
      totalScans: 0,
      todayScans: 0,
      uniqueVisitors: 0,
      activeQRCodes: 0,
    });
  }
}
