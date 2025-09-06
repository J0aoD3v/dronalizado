import { NextResponse } from "next/server";
import { database } from "@/lib/mongodb";

export async function GET() {
  try {
    await database.updateStats();
    const stats = await database.getStats();

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

    const uniqueCount = uniqueVisitors.length > 0 ? uniqueVisitors[0].count : 0;

    return NextResponse.json({
      totalScans: stats?.total_scans || 0,
      todayScans: stats?.today_scans || 0,
      uniqueVisitors: uniqueCount,
      activeQRCodes: stats?.total_qr_codes || 0,
    });
  } catch (error) {
    console.error("Erro ao buscar estatísticas:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
