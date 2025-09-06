import sqlite3 from "sqlite3";
import { promisify } from "util";

class Database {
  private db: sqlite3.Database;
  public get: (
    sql: string,
    params?: (string | number)[]
  ) => Promise<Record<string, unknown> | undefined>;
  public all: (
    sql: string,
    params?: (string | number)[]
  ) => Promise<Record<string, unknown>[]>;
  public run: (
    sql: string,
    params?: (string | number)[]
  ) => Promise<sqlite3.RunResult>;

  constructor() {
    this.db = new sqlite3.Database("dronalizado.db");

    // Métodos para queries (get, all, run)
    this.get = promisify(this.db.get.bind(this.db));
    this.all = promisify(this.db.all.bind(this.db));
    this.run = promisify(this.db.run.bind(this.db));

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
}

export const db = new Database();
