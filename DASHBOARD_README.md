# 📊 Dashboard Dronalizado - QR Code Analytics

## 🎯 Visão Geral

Sistema completo de gerenciamento e analytics para QR Codes integrado ao Next.js. Permite criar, rastrear e analisar QR codes com interface moderna e responsiva.

## 🚀 Funcionalidades

### ✅ Implementado

- **📊 Dashboard Analytics**: Estatísticas em tempo real
- **🔗 Geração de QR Codes**: Interface simples para criação
- **📈 Gráficos**: Visualização de dados diários e por hora
- **🖼️ Galeria**: Visualização de todos os QR codes criados
- **🔍 Rastreamento**: Tracking completo de scans
- **💾 Banco de Dados**: SQLite integrado
- **📱 Design Responsivo**: Interface adaptável

### 🌟 Características Principais

- **Tempo Real**: Atualizações automáticas a cada 30 segundos
- **Analytics Detalhado**: Scans totais, visitantes únicos, dados por período
- **Interface Moderna**: Design glassmorphism com gradientes
- **Fácil de Usar**: Interface intuitiva e amigável
- **SEO Otimizado**: URLs de rastreamento otimizadas

## 📁 Estrutura de Arquivos

```
src/
├── app/
│   ├── dashboard/
│   │   ├── page.tsx                 ✅ Página principal
│   │   ├── components/
│   │   │   ├── StatsCards.tsx       ✅ Cards de estatísticas
│   │   │   ├── QRGenerator.tsx      ✅ Gerador de QR codes
│   │   │   ├── QRGallery.tsx        ✅ Galeria de QR codes
│   │   │   ├── ChartsSection.tsx    ✅ Gráficos analytics
│   │   │   └── RealTimeUpdates.tsx  ✅ Atualizações tempo real
│   │   └── styles/
│   │       └── dashboard.module.css ✅ Estilos específicos
│   └── api/
│       ├── qr/
│       │   ├── generate/route.ts    ✅ POST - Gerar QR codes
│       │   ├── track/[qrId]/route.ts ✅ GET - Rastrear scans
│       │   └── by-url/route.ts      ✅ GET - Buscar por URL
│       └── stats/
│           ├── realtime/route.ts    ✅ GET - Stats tempo real
│           ├── daily/route.ts       ✅ GET - Stats diárias
│           ├── hourly/route.ts      ✅ GET - Stats por hora
│           └── qr-codes/route.ts    ✅ GET - Lista QR codes
├── lib/
│   ├── database.ts                  ✅ Configuração SQLite
│   └── qr-utils.ts                  ✅ Utilitários QR code
└── types/
    └── dashboard.ts                 ✅ TypeScript types
```

## 🛠️ Dependências Instaladas

```json
{
  "dependencies": {
    "qrcode": "^1.5.x",
    "sqlite3": "^5.1.x",
    "socket.io": "^4.7.x",
    "socket.io-client": "^4.7.x",
    "moment": "^2.29.x",
    "chart.js": "^4.4.x"
  },
  "devDependencies": {
    "@types/qrcode": "^1.5.x",
    "@types/sqlite3": "^3.1.x"
  }
}
```

## 🌐 URLs e Endpoints

### Dashboard

- **Principal**: `https://dronalizado.vercel.app/dashboard`

### APIs Disponíveis

#### QR Codes

- `POST /api/qr/generate` - Gerar novo QR code
- `GET /api/qr/track/[qrId]` - Rastrear scan (redireciona)
- `GET /api/qr/by-url?url=URL` - Buscar QR por URL

#### Estatísticas

- `GET /api/stats/realtime` - Estatísticas tempo real
- `GET /api/stats/daily` - Dados últimos 30 dias
- `GET /api/stats/hourly` - Dados últimas 24 horas
- `GET /api/stats/qr-codes` - Lista todos QR codes

## 💾 Banco de Dados

### Tabelas Criadas

#### `qr_codes`

```sql
CREATE TABLE qr_codes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  url TEXT NOT NULL,
  qr_id TEXT UNIQUE NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  is_active BOOLEAN DEFAULT 1
);
```

#### `qr_scans`

```sql
CREATE TABLE qr_scans (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  qr_id TEXT NOT NULL,
  ip_address TEXT,
  user_agent TEXT,
  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
  location TEXT,
  referrer TEXT
);
```

## 🎨 Design e UX

### Cores Utilizadas

- **Gradiente Principal**: `#667eea` → `#764ba2`
- **Cards**: Glassmorphism com `backdrop-filter: blur(10px)`
- **Acentos**: `#4facfe`, `#f093fb`, `#48bb78`

### Características Visuais

- **Glassmorphism**: Efeito de vidro moderno
- **Gradientes**: Design elegante e profissional
- **Ícones Emoji**: Interface amigável e intuitiva
- **Animações**: Transições suaves e interativas
- **Responsivo**: Adaptável a todos os dispositivos

## 📊 Funcionalidades do Dashboard

### 1. Cards de Estatísticas

- Total de Scans
- Scans do Dia
- Visitantes Únicos
- QR Codes Ativos

### 2. Gerador de QR Codes

- Formulário simples (Nome + URL)
- Geração instantânea
- Download direto da imagem
- Validação de URLs existentes

### 3. Gráficos Analytics

- Últimos 30 dias (barras)
- Últimas 24 horas (barras)
- Gráficos simples e responsivos

### 4. Galeria de QR Codes

- Grid responsivo
- Estatísticas por QR code
- Botões de ação (copiar URL, ver detalhes)
- Modal com informações detalhadas

### 5. Atualizações em Tempo Real

- Refresh automático a cada 30 segundos
- Dados sempre atualizados

## 🚀 Como Usar

### 1. Acessar o Dashboard

Navegue para: `https://dronalizado.vercel.app/dashboard`

### 2. Criar QR Code

1. Preencha o nome do QR code
2. Insira a URL de destino
3. Clique em "Gerar QR Code"
4. Faça download da imagem

### 3. Rastrear Scans

- Cada QR code criado gera uma URL de rastreamento
- Use: `https://dronalizado.vercel.app/api/qr/track/[ID_DO_QR]`
- Os scans são registrados automaticamente

### 4. Ver Analytics

- Estatísticas são atualizadas automaticamente
- Gráficos mostram tendências de uso
- Dados filtrados por período

## 🔧 Configuração de Produção

### Vercel

O arquivo `vercel.json` está configurado com:

- Timeout de 30s para APIs
- Variáveis de ambiente de produção

### Banco de Dados

- SQLite para desenvolvimento/produção simples
- Banco criado automaticamente no primeiro uso
- QR code padrão do site principal incluído

## 📈 Métricas Rastreadas

### Por QR Code

- Número total de scans
- Visitantes únicos (por IP)
- Data/hora de cada scan
- User-Agent do dispositivo
- Referrer (origem do acesso)

### Globais

- Total de scans de todos os QR codes
- Scans do dia atual
- Visitantes únicos globais
- Número de QR codes ativos

## 🔒 Considerações de Segurança

- Validação de URLs
- Sanitização de inputs
- Rate limiting implícito do Vercel
- Headers de segurança padrão do Next.js

## 🐛 Troubleshooting

### Problemas Comuns

1. **Erro de banco**: Verifique permissões de escrita
2. **QR não carrega**: Confirme URL válida
3. **Stats não atualizam**: Verifique conexão de rede

### Logs

Todos os erros são logados no console do servidor para debug.

## 🚀 Deploy

O sistema está pronto para deploy no Vercel:

```bash
# Deploy automático via Git
git push origin main

# Ou deploy manual
vercel --prod
```

## ✅ Status da Implementação

🟢 **CONCLUÍDO**: Sistema totalmente funcional e pronto para uso!

- ✅ Todas as APIs funcionando
- ✅ Interface completa implementada
- ✅ Banco de dados configurado
- ✅ Estilos responsivos aplicados
- ✅ Funcionalidades de rastreamento ativas
- ✅ Analytics em tempo real
- ✅ Configuração de produção pronta
