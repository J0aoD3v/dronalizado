import { NextRequest, NextResponse } from "next/server";
import { database } from "@/lib/mongodb";

export async function DELETE(request: NextRequest) {
  try {
    // Garantir conexão com o database
    await database.connect();

    const { qrId } = await request.json();

    if (!qrId) {
      return NextResponse.json(
        { error: "ID do QR code é obrigatório" },
        { status: 400 }
      );
    }

    console.log("Deletando QR code:", qrId);

    // Verificar se o QR code existe
    const existingQr = await database.getQRCodeById(qrId);

    if (!existingQr) {
      return NextResponse.json(
        { error: "QR Code não encontrado" },
        { status: 404 }
      );
    }

    // Deletar o QR code
    await database.getQRCodesCollection().deleteOne({ id: qrId });

    // Deletar todos os scans relacionados
    await database.getQRScansCollection().deleteMany({ qr_id: qrId });

    console.log("QR code deletado com sucesso:", qrId);

    return NextResponse.json({
      success: true,
      message: "QR Code deletado com sucesso",
    });
  } catch (error) {
    console.error("Erro ao deletar QR code:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Erro interno do servidor",
      },
      { status: 500 }
    );
  }
}
