import { MongoClient, Db, Collection } from "mongodb";

let client: MongoClient;
let db: Db;

export interface QRCode {
  _id?: string;
  id: string;
  url: string;
  data: string;
  image: string;
  created_at: Date;
  scan_count: number;
}

export interface QRScan {
  _id?: string;
  id: string;
  qr_id: string;
  scanned_at: Date;
  user_agent?: string;
  ip_address?: string;
  location?: string;
}

export interface QRStats {
  _id?: string;
  total_qr_codes: number;
  total_scans: number;
  today_scans: number;
  this_week_scans: number;
  updated_at: Date;
}

export interface DashboardData {
  _id?: string;
  user_id?: string;
  settings?: Record<string, unknown>;
  created_at: Date;
  updated_at: Date;
}

class MongoDatabase {
  private static instance: MongoDatabase;
  private connected: boolean = false;

  private constructor() {}

  public static getInstance(): MongoDatabase {
    if (!MongoDatabase.instance) {
      MongoDatabase.instance = new MongoDatabase();
    }
    return MongoDatabase.instance;
  }

  async connect(): Promise<void> {
    if (this.connected) return;

    try {
      const uri = process.env.MONGODB_URI;
      const dbName = process.env.DATABASE_NAME || "dronalizado";

      if (!uri) {
        throw new Error("MONGODB_URI não encontrada nas variáveis de ambiente");
      }

      console.log("🔗 Tentando conectar ao MongoDB...");
      client = new MongoClient(uri);
      await client.connect();
      
      // Testar a conexão
      await client.db("admin").command({ ping: 1 });
      
      db = client.db(dbName);

      // Criar índices para melhor performance
      await this.createIndexes();

      this.connected = true;
      console.log("✅ Conectado ao MongoDB - Database:", dbName);
    } catch (error) {
      console.error("❌ Erro ao conectar no MongoDB:", error);
      this.connected = false;
      throw error;
    }
  }

  async isConnected(): Promise<boolean> {
    if (!this.connected || !client) return false;
    
    try {
      await client.db("admin").command({ ping: 1 });
      return true;
    } catch {
      console.warn("⚠️ Conexão perdida com MongoDB");
      this.connected = false;
      return false;
    }
  }

  private async createIndexes(): Promise<void> {
    try {
      // Índices para a coleção qr_codes
      await this.getQRCodesCollection().createIndex(
        { id: 1 },
        { unique: true }
      );
      await this.getQRCodesCollection().createIndex({ created_at: -1 });

      // Índices para a coleção qr_scans
      await this.getQRScansCollection().createIndex({ qr_id: 1 });
      await this.getQRScansCollection().createIndex({ scanned_at: -1 });
      await this.getQRScansCollection().createIndex(
        { id: 1 },
        { unique: true }
      );

      console.log("✅ Índices criados com sucesso");
    } catch (error) {
      console.error("❌ Erro ao criar índices:", error);
    }
  }

  getQRCodesCollection(): Collection<QRCode> {
    const collectionName = process.env.COLLECTION_QR_CODES || "qr_codes";
    return db.collection<QRCode>(collectionName);
  }

  getQRScansCollection(): Collection<QRScan> {
    const collectionName = process.env.COLLECTION_QR_SCANS || "qr_scans";
    return db.collection<QRScan>(collectionName);
  }

  getQRStatsCollection(): Collection<QRStats> {
    const collectionName = process.env.COLLECTION_QR_STATS || "qr_stats";
    return db.collection<QRStats>(collectionName);
  }

  getDashboardCollection(): Collection<DashboardData> {
    const collectionName = process.env.COLLECTION_DASHBOARD || "qr_dashboard";
    return db.collection<DashboardData>(collectionName);
  }

  // Métodos para QR Codes
  async createQRCode(qrCode: QRCode): Promise<void> {
    await this.connect();
    try {
      await this.getQRCodesCollection().insertOne(qrCode);
    } catch (error: unknown) {
      if (
        error &&
        typeof error === "object" &&
        "code" in error &&
        error.code === 11000
      ) {
        throw new Error("QR Code com este ID já existe");
      }
      throw error;
    }
  }

  async getAllQRCodes(): Promise<QRCode[]> {
    await this.connect();
    return await this.getQRCodesCollection()
      .find({})
      .sort({ created_at: -1 })
      .toArray();
  }

  async getQRCodeById(id: string): Promise<QRCode | null> {
    await this.connect();
    return await this.getQRCodesCollection().findOne({ id });
  }

  async updateQRCodeScanCount(id: string): Promise<void> {
    await this.connect();
    await this.getQRCodesCollection().updateOne(
      { id },
      { $inc: { scan_count: 1 } }
    );
  }

  // Métodos para QR Scans
  async createQRScan(scan: QRScan): Promise<void> {
    await this.connect();
    await this.getQRScansCollection().insertOne(scan);
  }

  async getQRScansByQRId(qrId: string): Promise<QRScan[]> {
    await this.connect();
    return await this.getQRScansCollection()
      .find({ qr_id: qrId })
      .sort({ scanned_at: -1 })
      .toArray();
  }

  async getAllScansCount(): Promise<number> {
    await this.connect();
    return await this.getQRScansCollection().countDocuments();
  }

  async getTodayScansCount(): Promise<number> {
    await this.connect();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return await this.getQRScansCollection().countDocuments({
      scanned_at: { $gte: today },
    });
  }

  async getWeekScansCount(): Promise<number> {
    await this.connect();
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);

    return await this.getQRScansCollection().countDocuments({
      scanned_at: { $gte: weekAgo },
    });
  }

  async getScansGroupedByDay(
    days: number = 7
  ): Promise<Array<{ date: string; scans: number }>> {
    await this.connect();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const pipeline = [
      {
        $match: {
          scanned_at: { $gte: startDate },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$scanned_at",
            },
          },
          scans: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ];

    const result = await this.getQRScansCollection()
      .aggregate(pipeline)
      .toArray();

    return result.map((item) => ({
      date: item._id,
      scans: item.scans,
    }));
  }

  // Métodos para Estatísticas
  async updateStats(): Promise<void> {
    await this.connect();

    const totalQRCodes = await this.getQRCodesCollection().countDocuments();
    const totalScans = await this.getAllScansCount();
    const todayScans = await this.getTodayScansCount();
    const weekScans = await this.getWeekScansCount();

    const stats: QRStats = {
      total_qr_codes: totalQRCodes,
      total_scans: totalScans,
      today_scans: todayScans,
      this_week_scans: weekScans,
      updated_at: new Date(),
    };

    await this.getQRStatsCollection().replaceOne({}, stats, { upsert: true });
  }

  async getStats(): Promise<QRStats | null> {
    await this.connect();
    return await this.getQRStatsCollection().findOne({});
  }

  async disconnect(): Promise<void> {
    if (client && this.connected) {
      await client.close();
      this.connected = false;
      console.log("🔌 Desconectado do MongoDB");
    }
  }
}

// Instância singleton
export const database = MongoDatabase.getInstance();

// Cleanup ao encerrar processo
process.on("SIGINT", async () => {
  await database.disconnect();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  await database.disconnect();
  process.exit(0);
});
