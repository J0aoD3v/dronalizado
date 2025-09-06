# Script para testar rate limiting
$qrId = "dfaac71b-2dd7-4a10-9e8d-ff964696e91d"
$url = "http://localhost:3000/api/qr/track/$qrId"

Write-Host "Testando Rate Limiting - Fazendo 5 requisições..."

for ($i = 1; $i -le 5; $i++) {
    try {
        $response = Invoke-WebRequest -Uri $url -Method GET -MaximumRedirection 0 -ErrorAction Stop
        
        $limit = $response.Headers["x-ratelimit-limit"]
        $remaining = $response.Headers["x-ratelimit-remaining"] 
        $used = $response.Headers["x-ratelimit-used"]
        
        Write-Host "Requisição $i - Status: $($response.StatusCode) - Restantes: $remaining - Usadas: $used"
    }
    catch {
        $errorResponse = $_.Exception.Response
        if ($errorResponse.StatusCode -eq 429) {
            Write-Host "Requisição $i - RATE LIMIT EXCEDIDO (429)" -ForegroundColor Red
            
            # Tentar obter detalhes do erro
            $reader = [System.IO.StreamReader]::new($errorResponse.GetResponseStream())
            $errorContent = $reader.ReadToEnd()
            Write-Host "Erro: $errorContent" -ForegroundColor Yellow
        } else {
            Write-Host "Requisição $i - Erro: $($_.Exception.Message)" -ForegroundColor Red
        }
    }
    
    Start-Sleep -Milliseconds 100
}
