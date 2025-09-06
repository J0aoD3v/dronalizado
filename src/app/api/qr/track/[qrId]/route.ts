import { NextRequest, NextResponse } from "next/server";
import { database } from "@/lib/mongodb";
import { v4 as uuidv4 } from "uuid";
import { checkRateLimit, getRateLimitHeaders } from "@/lib/rate-limit";

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

    // Rate Limiting: Verificar se o IP excedeu o limite
    const rateLimitResult = await checkRateLimit(ip);

    console.log(
      `IP ${ip} - Requisições: ${rateLimitResult.total}/100, Restantes: ${rateLimitResult.remaining}`
    );

    if (!rateLimitResult.allowed) {
      console.log(`Rate limit excedido para IP: ${ip}`);
      return NextResponse.json(
        {
          error:
            "Rate limit excedido. Máximo de 100 acessos por IP a cada 24 horas.",
          retryAfter: "24 hours",
          remaining: rateLimitResult.remaining,
          resetTime: new Date(rateLimitResult.resetTime).toISOString(),
        },
        {
          status: 429,
          headers: {
            "Retry-After": "86400", // 24 horas em segundos
            ...getRateLimitHeaders(rateLimitResult, 100),
          },
        }
      );
    }

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

    // Adicionar headers de rate limit na resposta de sucesso
    const response = NextResponse.redirect(qrCode.url);

    // Recalcular rate limit após registrar o scan
    const updatedRateLimit = await checkRateLimit(ip);
    const headers = getRateLimitHeaders(updatedRateLimit, 100);

    Object.entries(headers).forEach(([key, value]) => {
      response.headers.set(key, value);
    });

    return response;
  } catch (error) {
    console.error("Erro ao rastrear QR code:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
