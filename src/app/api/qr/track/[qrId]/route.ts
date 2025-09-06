import { NextRequest, NextResponse } from "next/server";
import { database } from "@/lib/mongodb";
import { v4 as uuidv4 } from "uuid";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ qrId: string }> }
) {
  try {
    // Garantir conexão com o database
    await database.connect();

    const { qrId } = await params;
    console.log("Rastreando QR code:", qrId);

    // Extrair informações da requisição
    const ip =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      "unknown";
    const userAgent = request.headers.get("user-agent") || "";

    // Buscar QR code
    const qrCode = await database.getQRCodeById(qrId);

    if (!qrCode) {
      console.log("QR Code não encontrado:", qrId);
      return NextResponse.json(
        { error: "QR Code não encontrado" },
        { status: 404 }
      );
    }

    console.log("QR Code encontrado, registrando scan...");

    // Registrar o scan
    const scan = {
      id: uuidv4(),
      qr_id: qrId,
      scanned_at: new Date(),
      user_agent: userAgent,
      ip_address: ip,
    };

    await database.createQRScan(scan);

    // Atualizar contador de scans
    await database.updateQRCodeScanCount(qrId);

    console.log("Scan registrado, redirecionando para:", qrCode.url);

    // Redirecionar para a URL
    return NextResponse.redirect(qrCode.url);
  } catch (error) {
    console.error("Erro ao rastrear QR code:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
