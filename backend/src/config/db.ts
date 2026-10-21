export interface Responsible {
  id: string;
  email: string;
  passwordHash: string;
  name: string;
  createdAt: string;
}

export interface Device {
  id: string;
  responsibleId: string;
  deviceName: string;
  deviceToken: string;
  status: 'active' | 'inactive';
  lastSeen: string;
  createdAt: string;
}

export interface BlocklistItem {
  id: string;
  domain: string;
  type: 'LOTBA_OFFICIAL' | 'CUSTOM';
  addedBy?: string; // responsibleId if CUSTOM, null/undefined if LOTBA_OFFICIAL
  createdAt: string;
}

export interface EventItem {
  id: string;
  deviceId: string;
  eventType: 'ACCESS_ATTEMPT' | 'APP_INSTALL_ATTEMPT' | 'PROTECTION_MODIFIED' | 'BYPASS_ATTEMPT';
  domain?: string;
  details: string;
  timestamp: string;
}

export interface AlertItem {
  id: string;
  responsibleId: string;
  deviceId: string;
  alertType: string;
  message: string;
  read: boolean;
  createdAt: string;
}

class Database {
  public responsables: Responsible[] = [];
  public devices: Device[] = [];
  public blocklist: BlocklistItem[] = [
    // Seed official LOTBA domains (mock examples of illegal betting sites)
    { id: 'lotba-1', domain: 'apuestasilegalesba.com', type: 'LOTBA_OFFICIAL', createdAt: new Date().toISOString() },
    { id: 'lotba-2', domain: 'casinoilegalar.net', type: 'LOTBA_OFFICIAL', createdAt: new Date().toISOString() },
    { id: 'lotba-3', domain: 'ruletasin18.com', type: 'LOTBA_OFFICIAL', createdAt: new Date().toISOString() },
    { id: 'lotba-4', domain: 'betnoregulated.org', type: 'LOTBA_OFFICIAL', createdAt: new Date().toISOString() },
  ];
  public events: EventItem[] = [];
  public alerts: AlertItem[] = [];

  constructor() {
    // Reset or initialize if needed
  }
}

export const db = new Database();
