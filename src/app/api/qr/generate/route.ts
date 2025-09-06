import { NextRequest, NextResponse } from "next/server";
import QRCode from "qrcode";
import { db } from "@/lib/database";

export async function POST(request: NextRequest) {
  try {
    const { name, url } = await request.json();

    if (!name || !url) {
      return NextResponse.json(
        { error: "Nome e URL são obrigatórios" },
        { status: 400 }
      );
    }

    // Verificar se já existe QR para esta URL
    const existingQr = await db.get(
      "SELECT * FROM qr_codes WHERE url = ? AND is_active = 1 ORDER BY created_at DESC LIMIT 1",
      [url]
    );

    if (existingQr) {
      const qrCodeDataURL = await QRCode.toDataURL(url, {
        width: 300,
        margin: 2,
        color: { dark: "#000000", light: "#FFFFFF" },
      });

      return NextResponse.json({
        success: true,
        qrId: existingQr.qr_id,
        qrCodeDataURL,
        url: existingQr.url,
        name: existingQr.name,
        existing: true,
      });
    }

    // Criar novo QR code
    const qrId = `qr_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    const qrCodeDataURL = await QRCode.toDataURL(url, {
      width: 300,
      margin: 2,
      color: { dark: "#000000", light: "#FFFFFF" },
    });

    await db.run("INSERT INTO qr_codes (name, url, qr_id) VALUES (?, ?, ?)", [
      name,
      url,
      qrId,
    ]);

    return NextResponse.json({
      success: true,
      qrId,
      qrCodeDataURL,
      url,
      name,
      existing: false,
    });
  } catch (error) {
    console.error("Erro ao gerar QR code:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
