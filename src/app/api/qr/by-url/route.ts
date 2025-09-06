import { NextRequest, NextResponse } from "next/server";
import { database } from "@/lib/mongodb";

export async function GET(request: NextRequest) {
  try {
    // Garantir conexão com o database
    await database.connect();

    const searchParams = request.nextUrl.searchParams;
    const url = searchParams.get("url");

    if (!url) {
      return NextResponse.json({ error: "URL é obrigatória" }, { status: 400 });
    }

    console.log("Buscando QR code por URL:", url);

    const qrCode = await database.getQRCodesCollection().findOne({
      url: url,
    });

    if (!qrCode) {
      console.log("QR Code não encontrado para URL:", url);
      return NextResponse.json(
        { error: "QR Code não encontrado para esta URL" },
        { status: 404 }
      );
    }

    console.log("QR Code encontrado:", qrCode.id);

    return NextResponse.json({
      success: true,
      qrCode,
    });
  } catch (error) {
    console.error("Erro ao buscar QR code:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Erro interno do servidor",
      },
      { status: 500 }
    );
  }
}
