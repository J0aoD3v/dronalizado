import { NextRequest, NextResponse } from "next/server";
import { database } from "@/lib/mongodb";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const url = searchParams.get("url");

    if (!url) {
      return NextResponse.json({ error: "URL é obrigatória" }, { status: 400 });
    }

    const qrCode = await database.getQRCodesCollection().findOne({
      url: url,
    });

    if (!qrCode) {
      return NextResponse.json(
        { error: "QR Code não encontrado para esta URL" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      qrCode,
    });
  } catch (error) {
    console.error("Erro ao buscar QR code:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
