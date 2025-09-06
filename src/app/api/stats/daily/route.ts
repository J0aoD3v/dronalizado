import { NextResponse } from "next/server";
import { database } from "@/lib/mongodb";

export async function GET() {
  try {
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

    return NextResponse.json({
      success: true,
      data: dailyStats.map((stat) => ({
        date: stat.date,
        total_scans: stat.total_scans,
        unique_visitors: stat.unique_visitors,
      })),
    });
  } catch (error) {
    console.error("Erro ao buscar estatísticas diárias:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
