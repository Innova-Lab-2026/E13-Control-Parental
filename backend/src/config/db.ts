/**
 * Perfil del usuario devuelto por la API.
 * - `responsable`: adulto a cargo (gestiona dispositivos y recibe alertas).
 * - `tutor`: usuario encargado del accompagnement sobre el dispositivo protegido.
 */
export type UserRole = 'responsable' | 'tutor';

/**
 * Modo de uso de la aplicación, elegido en la pantalla "Selección de Modo".
 * - `adulto`: el usuario opera como responsable y accede a su dashboard.
 * - `dispositivo_protegido`: el usuario opera desde el dispositivo que se protege.
 */
export type UserMode = 'adulto' | 'dispositivo_protegido';

export const USER_ROLES: UserRole[] = ['responsable', 'tutor'];
export const USER_MODES: UserMode[] = ['adulto', 'dispositivo_protegido'];

export interface Responsible {
  id: string;
  email: string;
  passwordHash: string;
  name: string;
  telefono?: string;
  /** Perfil asociado al usuario. Se deriva de `esResponsable` al registrarse. */
  rol: UserRole;
  /** Modo de uso persistido. Se actualiza mediante PATCH /api/auth/me/mode. */
  mode: UserMode;
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
