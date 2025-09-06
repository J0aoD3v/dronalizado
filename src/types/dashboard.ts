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
