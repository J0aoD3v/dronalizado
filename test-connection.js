// Teste rápido de conexão MongoDB
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { MongoClient } from "mongodb";

async function testConnection() {
  try {
    const uri = process.env.MONGODB_URI;
    const dbName = process.env.DATABASE_NAME || "dronalizado";

    console.log("🔗 Testando conexão com MongoDB...");
    console.log("📍 Cluster:", uri?.split("@")[1]?.split("/")[0]);
    console.log("🗄️  Database:", dbName);

    const client = new MongoClient(uri);
    await client.connect();

    const db = client.db(dbName);

    // Listar collections existentes
    const collections = await db.listCollections().toArray();
    console.log("📁 Collections encontradas:");
    collections.forEach((col) => console.log(`   - ${col.name}`));

    // Testar collections configuradas
    const configuredCollections = {
      "QR Codes": process.env.COLLECTION_QR_CODES || "qr_codes",
      "QR Scans": process.env.COLLECTION_QR_SCANS || "qr_scans",
      "QR Stats": process.env.COLLECTION_QR_STATS || "qr_stats",
      Dashboard: process.env.COLLECTION_DASHBOARD || "qr_dashboard",
    };

    console.log("\n⚙️  Collections configuradas:");
    for (const [name, collection] of Object.entries(configuredCollections)) {
      console.log(`   - ${name}: ${collection}`);
    }

    await client.close();
    console.log("\n✅ Conexão testada com sucesso!");
  } catch (error) {
    console.error("❌ Erro na conexão:", error.message);
  }
}

testConnection();
