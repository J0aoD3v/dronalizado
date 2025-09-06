import { database } from "@/lib/mongodb";

export interface RateLimitConfig {
  maxRequests: number;
  windowHours: number;
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetTime: number;
  total: number;
}

export async function checkRateLimit(
  ip: string,
  config: RateLimitConfig = { maxRequests: 100, windowHours: 24 }
): Promise<RateLimitResult> {
  try {
    await database.connect();

    // Calcular janela de tempo
    const windowStart = new Date();
    windowStart.setHours(windowStart.getHours() - config.windowHours);

    // Contar requisições do IP na janela de tempo
    const requestCount = await database.getQRScansCollection().countDocuments({
      ip_address: ip,
      scanned_at: { $gte: windowStart },
    });

    // Calcular tempo de reset (próxima janela)
    const resetTime = Date.now() + config.windowHours * 60 * 60 * 1000;

    // Calcular requisições restantes
    const remaining = Math.max(0, config.maxRequests - requestCount);

    return {
      allowed: requestCount < config.maxRequests,
      remaining,
      resetTime,
      total: requestCount,
    };
  } catch (error) {
    console.error("Erro ao verificar rate limit:", error);
    // Em caso de erro, permitir a requisição
    return {
      allowed: true,
      remaining: config.maxRequests,
      resetTime: Date.now() + config.windowHours * 60 * 60 * 1000,
      total: 0,
    };
  }
}

export function getRateLimitHeaders(
  result: RateLimitResult,
  maxRequests: number
) {
  return {
    "X-RateLimit-Limit": maxRequests.toString(),
    "X-RateLimit-Remaining": result.remaining.toString(),
    "X-RateLimit-Reset": result.resetTime.toString(),
    "X-RateLimit-Used": result.total.toString(),
  };
}
