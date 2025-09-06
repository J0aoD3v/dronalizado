import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/database";

export async function GET(
  request: NextRequest,
  { params }: { params: { qrId: string } }
) {
  try {
    const { qrId } = params;

    // Extrair informações da requisição
    const ip =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      "unknown";
    const userAgent = request.headers.get("user-agent") || "";
    const referrer = request.headers.get("referer") || "";

    // Registrar o scan
    await db.run(
      "INSERT INTO qr_scans (qr_id, ip_address, user_agent, referrer) VALUES (?, ?, ?, ?)",
      [qrId, ip, userAgent, referrer]
    );

    // Buscar URL do QR code
    const qrCode = await db.get(
      "SELECT url FROM qr_codes WHERE qr_id = ? AND is_active = 1",
      [qrId]
    );

    if (!qrCode) {
      return NextResponse.json(
        { error: "QR Code não encontrado" },
        { status: 404 }
      );
    }

    // Redirecionar para a URL
    return NextResponse.redirect(qrCode.url);
  } catch (error) {
    console.error("Erro ao processar scan:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
