import { NextResponse } from "next/server";
import { database } from "@/lib/mongodb";

export async function GET() {
  try {
    const twentyFourHoursAgo = new Date();
    twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24);

    const hourlyStats = await database
      .getQRScansCollection()
      .aggregate([
        {
          $match: {
            scanned_at: { $gte: twentyFourHoursAgo },
          },
        },
        {
          $group: {
            _id: {
              $dateToString: {
                format: "%Y-%m-%d %H:00:00",
                date: "$scanned_at",
              },
            },
            total_scans: { $sum: 1 },
            unique_visitors: { $addToSet: "$ip_address" },
          },
        },
        {
          $project: {
            hour: "$_id",
            total_scans: 1,
            unique_visitors: { $size: "$unique_visitors" },
          },
        },
        {
          $sort: { hour: -1 },
        },
      ])
      .toArray();

    return NextResponse.json({
      success: true,
      data: hourlyStats.map((stat) => ({
        hour: stat.hour,
        total_scans: stat.total_scans,
        unique_visitors: stat.unique_visitors,
      })),
    });
  } catch (error) {
    console.error("Erro ao buscar estatísticas por hora:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
