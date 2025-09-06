# Script para simular rate limit sendo excedido
# Vamos simular criando muitos scans diretamente no banco
$headers = @{
    "Content-Type" = "application/json"
}

$qrId = "dfaac71b-2dd7-4a10-9e8d-ff964696e91d"
$trackUrl = "http://localhost:3000/api/qr/track/$qrId"

Write-Host "Fazendo 10 requisições para testar o contador..." -ForegroundColor Green

for ($i = 1; $i -le 10; $i++) {
    try {
        $response = Invoke-WebRequest -Uri $trackUrl -Method GET -MaximumRedirection 0 -ErrorAction Stop
        
        $remaining = $response.Headers["x-ratelimit-remaining"]
        $used = $response.Headers["x-ratelimit-used"]
        
        Write-Host "[$i] Status: $($response.StatusCode) | Restantes: $remaining | Usadas: $used"
        
        # Se restarem poucas requisições, alertar
        if ([int]$remaining -lt 5) {
            Write-Host "  ⚠️  ATENÇÃO: Poucas requisições restantes!" -ForegroundColor Yellow
        }
    }
    catch {
        $errorResponse = $_.Exception.Response
        if ($errorResponse.StatusCode -eq 429) {
            Write-Host "[$i] 🚫 RATE LIMIT EXCEDIDO!" -ForegroundColor Red
            break
        } else {
            Write-Host "[$i] Erro: $($_.Exception.Message)" -ForegroundColor Red
        }
    }
    
    Start-Sleep -Milliseconds 200
}

Write-Host "`nTeste de Rate Limiting concluído!" -ForegroundColor Cyan
