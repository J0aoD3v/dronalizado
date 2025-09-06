## 📋 **Instruções para Integração do QR Code Dashboard no Next.js**

### **🎯 Objetivo**
Integrar o sistema completo de QR Code Dashboard na rota `https://dronalizado.vercel.app/dashboard` mantendo todas as funcionalidades existentes.

### **📁 Estrutura de Arquivos Necessária**

```
src/
├── app/
│   ├── dashboard/
│   │   ├── page.tsx                 # Página principal do dashboard
│   │   ├── components/
│   │   │   ├── StatsCards.tsx       # Cards de estatísticas
│   │   │   ├── QRGenerator.tsx      # Gerador de QR codes
│   │   │   ├── QRGallery.tsx        # Galeria de QR codes
│   │   │   ├── ChartsSection.tsx    # Gráficos analytics
│   │   │   └── RealTimeUpdates.tsx  # WebSocket client
│   │   └── styles/
│   │       └── dashboard.module.css # Estilos específicos
│   └── api/
│       ├── qr/
│       │   ├── generate/route.ts    # POST /api/qr/generate
│       │   ├── track/[qrId]/route.ts # GET /api/qr/track/[qrId]
│       │   └── by-url/route.ts      # GET /api/qr/by-url
│       └── stats/
│           ├── realtime/route.ts    # GET /api/stats/realtime
│           ├── daily/route.ts       # GET /api/stats/daily
│           ├── hourly/route.ts      # GET /api/stats/hourly
│           └── qr-codes/route.ts    # GET /api/stats/qr-codes
├── lib/
│   ├── database.ts                  # Configuração SQLite
│   ├── qr-utils.ts                  # Utilitários QR code
│   └── websocket.ts                 # Configuração Socket.io
└── types/
    └── dashboard.ts                 # TypeScript types
```

### **🔧 Dependências a Instalar**

```bash
npm install qrcode sqlite3 socket.io socket.io-client moment chart.js
npm install @types/qrcode @types/sqlite3 --save-dev
```

### **💾 Configuração do Banco de Dados**

**Arquivo: `src/lib/database.ts`**
```typescript
import sqlite3 from 'sqlite3';
import { promisify } from 'util';

class Database {
  private db: sqlite3.Database;

  constructor() {
    this.db = new sqlite3.Database('dronalizado.db');
    this.initTables();
  }

  private initTables() {
    this.db.serialize(() => {
      // Tabela QR Codes
      this.db.run(`CREATE TABLE IF NOT EXISTS qr_codes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        url TEXT NOT NULL,
        qr_id TEXT UNIQUE NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        is_active BOOLEAN DEFAULT 1
      )`);

      // Tabela QR Scans
      this.db.run(`CREATE TABLE IF NOT EXISTS qr_scans (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        qr_id TEXT NOT NULL,
        ip_address TEXT,
        user_agent TEXT,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
        location TEXT,
        referrer TEXT
      )`);

      // QR code padrão do site principal
      this.db.run(`INSERT OR IGNORE INTO qr_codes (name, url, qr_id) 
        VALUES ('Site Principal', 'https://dronalizado.vercel.app/', 'main-site')`);
    });
  }

  // Métodos para queries (get, all, run)
  get = promisify(this.db.get.bind(this.db));
  all = promisify(this.db.all.bind(this.db));
  run = promisify(this.db.run.bind(this.db));
}

export const db = new Database();
```

### **🎨 Página Principal do Dashboard**

**Arquivo: page.tsx**
```typescript
'use client';

import { useEffect, useState } from 'react';
import StatsCards from './components/StatsCards';
import QRGenerator from './components/QRGenerator';
import QRGallery from './components/QRGallery';
import ChartsSection from './components/ChartsSection';
import RealTimeUpdates from './components/RealTimeUpdates';
import styles from './styles/dashboard.module.css';

interface DashboardStats {
  totalScans: number;
  todayScans: number;
  uniqueVisitors: number;
  activeQRCodes: number;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [qrCodes, setQrCodes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      // Carregar estatísticas
      const statsResponse = await fetch('/api/stats/realtime');
      const statsData = await statsResponse.json();
      setStats(statsData);

      // Carregar QR codes
      const qrResponse = await fetch('/api/stats/qr-codes');
      const qrData = await qrResponse.json();
      setQrCodes(qrData);

      setIsLoading(false);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div className={styles.loading}>Carregando dashboard...</div>;
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Dashboard Dronalizado</h1>
        <p>Analytics e Gerenciamento de QR Codes</p>
      </header>

      <RealTimeUpdates onStatsUpdate={setStats} />
      
      <main className={styles.main}>
        <StatsCards stats={stats} />
        <QRGenerator onQRGenerated={loadDashboardData} />
        <ChartsSection />
        <QRGallery qrCodes={qrCodes} />
      </main>
    </div>
  );
}
```

### **🔌 API Routes Principais**

**Arquivo: route.ts**
```typescript
import { NextRequest, NextResponse } from 'next/server';
import QRCode from 'qrcode';
import { db } from '@/lib/database';

export async function POST(request: NextRequest) {
  try {
    const { name, url } = await request.json();

    if (!name || !url) {
      return NextResponse.json(
        { error: 'Nome e URL são obrigatórios' },
        { status: 400 }
      );
    }

    // Verificar se já existe QR para esta URL
    const existingQr = await db.get(
      'SELECT * FROM qr_codes WHERE url = ? AND is_active = 1 ORDER BY created_at DESC LIMIT 1',
      [url]
    );

    if (existingQr) {
      const qrCodeDataURL = await QRCode.toDataURL(url, {
        width: 300,
        margin: 2,
        color: { dark: '#000000', light: '#FFFFFF' }
      });

      return NextResponse.json({
        success: true,
        qrId: existingQr.qr_id,
        qrCodeDataURL,
        url: existingQr.url,
        name: existingQr.name,
        existing: true
      });
    }

    // Criar novo QR code
    const qrId = `qr_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const qrCodeDataURL = await QRCode.toDataURL(url, {
      width: 300,
      margin: 2,
      color: { dark: '#000000', light: '#FFFFFF' }
    });

    await db.run(
      'INSERT INTO qr_codes (name, url, qr_id) VALUES (?, ?, ?)',
      [name, url, qrId]
    );

    return NextResponse.json({
      success: true,
      qrId,
      qrCodeDataURL,
      url,
      name,
      existing: false
    });

  } catch (error) {
    console.error('Erro ao gerar QR code:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
```

**Arquivo: route.ts**
```typescript
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/database';

export async function GET(
  request: NextRequest,
  { params }: { params: { qrId: string } }
) {
  try {
    const { qrId } = params;
    
    // Extrair informações da requisição
    const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown';
    const userAgent = request.headers.get('user-agent') || '';
    const referrer = request.headers.get('referer') || '';

    // Registrar o scan
    await db.run(
      'INSERT INTO qr_scans (qr_id, ip_address, user_agent, referrer) VALUES (?, ?, ?, ?)',
      [qrId, ip, userAgent, referrer]
    );

    // Buscar URL do QR code
    const qrCode = await db.get(
      'SELECT url FROM qr_codes WHERE qr_id = ? AND is_active = 1',
      [qrId]
    );

    if (!qrCode) {
      return NextResponse.json(
        { error: 'QR Code não encontrado' },
        { status: 404 }
      );
    }

    // Redirecionar para a URL
    return NextResponse.redirect(qrCode.url);

  } catch (error) {
    console.error('Erro ao processar scan:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
```

**Arquivo: route.ts**
```typescript
import { NextResponse } from 'next/server';
import { db } from '@/lib/database';

export async function GET() {
  try {
    const [totalScans, todayScans, uniqueVisitors, activeQRCodes] = await Promise.all([
      db.get('SELECT COUNT(*) as count FROM qr_scans'),
      db.get('SELECT COUNT(*) as count FROM qr_scans WHERE DATE(timestamp) = DATE("now")'),
      db.get('SELECT COUNT(DISTINCT ip_address) as count FROM qr_scans'),
      db.get('SELECT COUNT(*) as count FROM qr_codes WHERE is_active = 1')
    ]);

    return NextResponse.json({
      totalScans: totalScans?.count || 0,
      todayScans: todayScans?.count || 0,
      uniqueVisitors: uniqueVisitors?.count || 0,
      activeQRCodes: activeQRCodes?.count || 0
    });

  } catch (error) {
    console.error('Erro ao buscar estatísticas:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
```

### **🎯 Componente de Stats Cards**

**Arquivo: `src/app/dashboard/components/StatsCards.tsx`**
```typescript
'use client';

import styles from '../styles/dashboard.module.css';

interface StatsCardsProps {
  stats: {
    totalScans: number;
    todayScans: number;
    uniqueVisitors: number;
    activeQRCodes: number;
  } | null;
}

export default function StatsCards({ stats }: StatsCardsProps) {
  if (!stats) return <div>Carregando estatísticas...</div>;

  const cards = [
    {
      title: 'Total de Scans',
      value: stats.totalScans,
      icon: '📊',
      color: '#667eea'
    },
    {
      title: 'Scans Hoje',
      value: stats.todayScans,
      icon: '📅',
      color: '#764ba2'
    },
    {
      title: 'Visitantes Únicos',
      value: stats.uniqueVisitors,
      icon: '👥',
      color: '#f093fb'
    },
    {
      title: 'QR Codes Ativos',
      value: stats.activeQRCodes,
      icon: '🔗',
      color: '#4facfe'
    }
  ];

  return (
    <div className={styles.statsGrid}>
      {cards.map((card, index) => (
        <div key={index} className={styles.statCard} style={{ borderColor: card.color }}>
          <div className={styles.statIcon}>{card.icon}</div>
          <div className={styles.statContent}>
            <h3>{card.title}</h3>
            <p className={styles.statValue}>{card.value.toLocaleString()}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
```

### **🔄 WebSocket para Tempo Real**

**Arquivo: `src/app/dashboard/components/RealTimeUpdates.tsx`**
```typescript
'use client';

import { useEffect } from 'react';
import io from 'socket.io-client';

interface RealTimeUpdatesProps {
  onStatsUpdate: (stats: any) => void;
}

export default function RealTimeUpdates({ onStatsUpdate }: RealTimeUpdatesProps) {
  useEffect(() => {
    // Conectar ao WebSocket (se disponível)
    const socket = io();

    socket.on('qr_scan', () => {
      // Atualizar estatísticas quando houver novo scan
      fetch('/api/stats/realtime')
        .then(res => res.json())
        .then(onStatsUpdate);
    });

    return () => {
      socket.disconnect();
    };
  }, [onStatsUpdate]);

  return null; // Componente invisible para lógica
}
```

### **🎨 Estilos CSS Module**

**Arquivo: `src/app/dashboard/styles/dashboard.module.css`**
```css
.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.header {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 30px;
  margin-bottom: 30px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.header h1 {
  color: #2d3748;
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 10px;
}

.statsGrid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
}

.statCard {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 25px;
  border-left: 4px solid;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.statCard:hover {
  transform: translateY(-5px);
}

.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
  font-size: 1.2rem;
  color: white;
}

/* Responsividade */
@media (max-width: 768px) {
  .container {
    padding: 10px;
  }
  
  .statsGrid {
    grid-template-columns: 1fr;
  }
}
```

### **📋 TypeScript Types**

**Arquivo: `src/types/dashboard.ts`**
```typescript
export interface QRCode {
  id: number;
  name: string;
  url: string;
  qr_id: string;
  created_at: string;
  is_active: boolean;
  scan_count: number;
  unique_visitors: number;
}

export interface QRScan {
  id: number;
  qr_id: string;
  ip_address: string;
  user_agent: string;
  timestamp: string;
  location?: string;
  referrer?: string;
}

export interface DashboardStats {
  totalScans: number;
  todayScans: number;
  uniqueVisitors: number;
  activeQRCodes: number;
}

export interface DailyStats {
  date: string;
  total_scans: number;
  unique_visitors: number;
}
```

### **⚙️ Configurações Vercel**

**Arquivo: vercel.json**
```json
{
  "functions": {
    "src/app/api/**/*.ts": {
      "maxDuration": 30
    }
  },
  "env": {
    "NODE_ENV": "production"
  }
}
```

### **🚀 Passos de Implementação**

1. **Criar estrutura de pastas** conforme especificado
2. **Instalar dependências** necessárias
3. **Implementar database.ts** para configuração SQLite
4. **Criar todas as API routes** em `/api`
5. **Implementar página principal** page.tsx
6. **Criar componentes** StatsCards, QRGenerator, etc.
7. **Adicionar estilos CSS** responsivos
8. **Configurar WebSocket** para tempo real
9. **Testar todas as funcionalidades**
10. **Deploy no Vercel**

### **✅ Resultado Final**

Após a implementação, você terá:
- ✅ Dashboard completo em `https://dronalizado.vercel.app/dashboard`
- ✅ API RESTful funcional
- ✅ Interface responsiva e moderna
- ✅ Analytics em tempo real
- ✅ Geração e gestão de QR codes
- ✅ Banco de dados SQLite integrado
- ✅ Compatibilidade total com Vercel

Esta estrutura mantém todas as funcionalidades do projeto original mas adaptadas para Next.js 13+ com App Router.