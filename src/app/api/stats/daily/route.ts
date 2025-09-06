import { NextResponse } from "next/server";
import { database } from "@/lib/mongodb";

export async function GET() {
  try {
    // Garantir conexão com o database
    await database.connect();
    
    console.log("Buscando estatísticas diárias...");
    
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const dailyStats = await database
      .getQRScansCollection()
      .aggregate([
        {
          $match: {
            scanned_at: { $gte: thirtyDaysAgo },
          },
        },
        {
          $group: {
            _id: {
              $dateToString: {
                format: "%Y-%m-%d",
                date: "$scanned_at",
              },
            },
            total_scans: { $sum: 1 },
            unique_visitors: { $addToSet: "$ip_address" },
          },
        },
        {
          $project: {
            date: "$_id",
            total_scans: 1,
            unique_visitors: { $size: "$unique_visitors" },
          },
        },
        {
          $sort: { date: -1 },
        },
      ])
      .toArray();

    console.log(`Encontradas ${dailyStats.length} estatísticas diárias`);

    return NextResponse.json({
      success: true,
      data: dailyStats.map((stat) => ({
        date: stat.date,
        total_scans: stat.total_scans || 0,
        unique_visitors: stat.unique_visitors || 0,
      })),
    });
  } catch (error) {
    console.error("Erro ao buscar estatísticas diárias:", error);
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
