import { NextRequest, NextResponse } from "next/server";
import QRCode from "qrcode";
import { v4 as uuidv4 } from "uuid";
import { database } from "@/lib/mongodb";

export async function POST(request: NextRequest) {
  try {
    // Garantir conexão com o database
    await database.connect();
    
    const { name, url } = await request.json();

    if (!name || !url) {
      return NextResponse.json(
        { error: "Nome e URL são obrigatórios" },
        { status: 400 }
      );
    }

    console.log("Gerando QR code para:", { name, url });

    // Verificar se já existe QR para esta URL
    const existingQr = await database.getQRCodesCollection().findOne({
      url: url,
    });

    if (existingQr) {
      console.log("QR code já existe:", existingQr.id);
      
      const qrCodeDataURL = await QRCode.toDataURL(url, {
        width: 300,
        margin: 2,
        color: { dark: "#000000", light: "#FFFFFF" },
      });

      return NextResponse.json({
        success: true,
        qrId: existingQr.id,
        qrCodeDataURL,
        url: existingQr.url,
        name: existingQr.data,
        existing: true,
      });
    }

    // Criar novo QR code
    const qrId = uuidv4();
    console.log("Criando novo QR code:", qrId);

    const qrCodeDataURL = await QRCode.toDataURL(url, {
      width: 300,
      margin: 2,
      color: { dark: "#000000", light: "#FFFFFF" },
    });

    const qrCode = {
      id: qrId,
      url,
      data: name,
      image: qrCodeDataURL,
      created_at: new Date(),
      scan_count: 0,
    };

    await database.createQRCode(qrCode);
    console.log("QR code criado com sucesso:", qrId);

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
      { 
        success: false,
        error: "Erro interno do servidor" 
      },
      { status: 500 }
    );
  }
}
